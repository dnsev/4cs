#include "ImageReader.hpp"
#include "Image.hpp"
#include <cassert>
#include <vector>
#include <string>
#include <cstring>
#include <fstream>

#define BUFFER_SIZE 256



namespace ImgLib {

	ImageReader :: ImageReader(const Image* image) :
		ImageHashmasker(),
		image(image),
		x(0),
		y(0),
		c(0),
		bitmask(0),
		valueMask(0),
		pixelMask(0),
		bitValue(0),
		bitCount(0),
		channels(0),
		pixelPos(0),
		scatterPos(0),
		scatterRange(0),
		scatterFullRange(0),
		scatter(false)
	{
		assert(image != NULL);
	}
	ImageReader :: ~ImageReader() {
	}

	int ImageReader :: unpack(cstring prefix, cstring suffix) {
		// Vars
		char buffer[BUFFER_SIZE];

		// Init
		this->x = 0;
		this->y = 0;
		this->c = 0;
		this->bitValue = 0;
		this->bitCount = 0;
		this->pixelPos = 0;
		this->scatter = false;
		this->scatterPos = 0;
		this->scatterRange = 0;
		this->scatterFullRange = 0;
		this->channels = 3;
		this->resetHashmask();

		// Read bitmask
		this->bitmask = this->readPixel(0x07);
		if (this->bitmask < 0) return -1;
		++this->bitmask;
		this->valueMask = (1 << this->bitmask) - 1;
		this->pixelMask = 0xFF - this->valueMask;
		// Read flags
		int flags = this->readPixel(0x07);
		if (flags < 0) return -1;

		// Bit read depth
		this->channels = ((flags & 4) != 0 ? 4 : 3);

		// Ext-flags
		bool metadata = false;
		if ((flags & 1) != 0) {
			// Flags
			if (!this->extractData(buffer, 1)) return -1;
			unsigned int flags2 = ImageReader::dataToInt(buffer, 1);
			// Evaluate
			if ((flags2 & 2) != 0) metadata = true;
			if ((flags2 & 4) != 0) {
				this->completePixel();
				this->initHashmask(this->image, this->image->getWidth(), this->image->getHeight(), this->channels, this->bitmask);
			}
		}

		// Scatter
		if ((flags & 2) != 0) {
			if (!this->extractData(buffer, 4)) return -1;

			// Enable scattering
			this->scatterRange = ImageReader::dataToInt(buffer, 4);
			this->completePixel();

			// Enable scatter
			if (this->scatterRange > 0) {
				this->scatterPos = 0;
				this->scatterFullRange = ((this->image->getWidth() * this->image->getHeight() * this->channels) - this->pixelPos - 1); // Total amount of pixel components used
				this->scatter = true;
			}
		}

		// Metadata
		if (metadata) {
			if (!this->extractData(buffer, 2)) return -1;
			unsigned int metadataLength = ImageReader::dataToInt(buffer, 2);

			// Read and discard
			if (metadataLength > 0) {
				while (true) {
					if (!this->extractData(buffer, (metadataLength > BUFFER_SIZE ? BUFFER_SIZE : metadataLength))) return -1;
					if (metadataLength < BUFFER_SIZE) break;
					metadataLength -= BUFFER_SIZE;
				}
			}
		}

		// File count
		if (!this->extractData(buffer, 2)) return -1;
		unsigned int fileCount = ImageReader::dataToInt(buffer, 2);
		std::cout << "fileCount="<<fileCount<<"\n";

		// Filename lengths and file lengths
		std::vector<unsigned int> filenameLengths;
		std::vector<unsigned int> fileSizes;
		unsigned int value;
		unsigned long long totalValue = 0;
		unsigned long long limit;
		for (unsigned int i = 0; i < fileCount; ++i) {
			// Filename length
			if (!this->extractData(buffer, 2)) return -1;
			value = ImageReader::dataToInt(buffer, 2);
			filenameLengths.push_back(value);
			totalValue += value;
			// File size
			if (!this->extractData(buffer, 4)) return -1;
			value = ImageReader::dataToInt(buffer, 4);
			fileSizes.push_back(value);
			totalValue += value;

			// Error checking
			limit = ((((this->image->getWidth() * (this->image->getHeight() - this->y) - this->x) * this->channels) - this->c) * this->bitmask + 8 - 1) / 8;
			if (totalValue > limit) {
				// Data overflow
				return -1;
			}
		}

		// Filenames
		std::vector<std::string> filenames;
		std::vector<std::string> filenamesAlt;
		int length, smallLen;
		for (unsigned int i = 0; i < fileCount; ++i) {
			filenames.push_back("");
			filenamesAlt.push_back("");
			// Extract filename
			length = filenameLengths[i];
			while (length > 0) {
				smallLen = (length > BUFFER_SIZE ? BUFFER_SIZE : length);
				if (!this->extractData(buffer, smallLen)) return -1;
				for (int k = 0; k < smallLen; ++k) {
					filenames[i] += static_cast<char>(buffer[k]);
				}
				length -= BUFFER_SIZE;
			}
			// TODO : utf-8
			// Alt filename
			filenamesAlt[i] = filenames[i];
			length = filenamesAlt[i].length();
			while (--length >= 0 && filenamesAlt[i][length] != '.');
			if (length < 0) length = filenamesAlt[i].length();
			filenamesAlt[i].insert(length, suffix);
			// Adjust filenamesAlt
			length = filenamesAlt[i].length();
			while (--length >= 0 && filenamesAlt[i][length] != '/' && filenamesAlt[i][length] != '\\');
			if (length >= 0) filenamesAlt[i].erase(0, length + 1);
			// Add prefix
			filenamesAlt[i].insert(0, prefix);
		}

		// Sources
		int countWritten = 0;
		for (unsigned int i = 0; i < fileCount; ++i) {
			// Extract
			std::ofstream out(filenamesAlt[i].c_str(), (std::ofstream::out | std::ofstream::binary));
			if (!out.is_open()) {
				// TODO : Error?
				continue;
			}

			// Write
			length = fileSizes[i];
			while (length > 0) {
				smallLen = (length > BUFFER_SIZE ? BUFFER_SIZE : length);
				if (!this->extractData(buffer, smallLen)) return -1;

				out.write(buffer, smallLen);

				length -= BUFFER_SIZE;
			}

			// Close
			out.close();
		}

		// Done
		this->freeHashmask();
		return countWritten;
	}

	bool ImageReader :: toNext(int skipCount) {
		while (skipCount > 0) {
			skipCount -= 1;

			++this->c;
			if (this->c >= this->channels) {
				this->c = 0;
				++this->x;
				if (this->x >= this->image->getWidth()) {
					this->x = 0;
					++this->y;
					if (this->y >= this->image->getHeight()) {
						// Overflow
						this->y = 0;
						return false;
					}
				}
			}
		}

		return true;
	}

	bool ImageReader :: extractData(char* data, int length) {
		assert(data != NULL);

		length *= 8;

		int d = 0;
		int value;
		for (int i = this->bitCount; i < length; i += this->bitmask) {
			value = this->readPixel(this->valueMask);
			if (value < 0) return false;	
			//this->bitValue |= (this->image->getPixel(this->x, this->y, this->c) & this->valueMask) << this->bitCount;
			//if (!this->toNext(1)) return false;
			this->bitValue |= value << this->bitCount;
			this->bitCount += this->bitmask;

			while (this->bitCount >= 8) {
				data[d] = (this->bitValue & 0xFF);
				++d;
				this->bitValue >>= 8;
				this->bitCount -= 8;
			}
		}

		return true;
	}

	unsigned int ImageReader :: dataToInt(const char* data, int length) {
		assert(data != NULL);

		unsigned int value = 0;
		for (int i = 0; i < length; ++i) {
			value = (value << 8) + static_cast<unsigned char>(data[i]);
		}
		return value;
	}

	void ImageReader :: completePixel() {
		if (this->bitCount > 0) {
			this->bitValue = 0;
			this->bitCount = 0;
		}
	}

	int ImageReader :: readPixel(unsigned int valueMask) {
		int value = (this->image->getPixel(this->x, this->y, this->c) & valueMask);
		if (this->isHashmasking()) {
			// Decode
			value = this->decodeHashmask(value, this->bitmask);
		}

		if (this->scatter) {
			++this->scatterPos;
			if (this->scatterPos > this->scatterRange) {
				assert(this->scatterPos <= this->scatterRange);
				return -1;
			}

			int v = (((this->scatterPos * this->scatterFullRange / this->scatterRange) - ((this->scatterPos - 1) * this->scatterFullRange / this->scatterRange)));
			this->pixelPos += v;
			assert(v > 0);
			bool b = this->toNext(v);
			assert(b);
			return (b ? value : -1);
		}
		else {
			++this->pixelPos;
			if (!this->toNext(1)) return -1;
			return value;
		}
	}

};


