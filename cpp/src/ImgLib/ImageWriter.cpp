#include "ImageWriter.hpp"
#include "Image.hpp"
#include <cassert>
#include <fstream>
#include "../Random/Random.hpp"

#define BUFFER_SIZE 256



namespace ImgLib {

	ImageWriter :: ImageWriter(Image* image) :
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
		scatter(false),
		randomizeAll(false),
		deband(false)
	{
		assert(image != NULL);
	}
	ImageWriter :: ~ImageWriter() {
	}

	int ImageWriter :: pack(const std::vector<std::string>& sources, unsigned int bitmask, bool randomizeAll, bool scatter, bool hashmask, bool deband) {
		unsigned int metadataLength = 0;

		assert(bitmask >= 1);
		assert(bitmask <= 8);
		assert(ImageWriter::getBitRequirement(sources) <= ImageWriter::getBitAvailability(this->image->getWidth(), this->image->getHeight(), this->image->getChannelCount(), bitmask, metadataLength, scatter, hashmask));

		// Vars
		char buffer[BUFFER_SIZE];

		// Init
		this->x = 0;
		this->y = 0;
		this->c = 0;
		this->bitValue = 0;
		this->bitCount = 0;
		this->bitmask = bitmask;
		this->valueMask = (1 << this->bitmask) - 1;
		this->pixelMask = 0xFF - this->valueMask;
		this->randomizeAll = randomizeAll;
		this->channels = this->image->getChannelCount();
		this->pixelPos = 0;
		this->scatter = false;
		this->scatterPos = 0;
		this->scatterRange = 0;
		this->scatterFullRange = 0;
		this->deband = deband;
		this->resetHashmask();

		// Metadata settings
		bool hasExt = (metadataLength > 0) || hashmask;

		// Super-meta
		this->writePixel((this->bitmask - 1), 0xF8, 0x07);
		unsigned int flags = (hasExt ? 1 : 0) | (scatter ? 2 : 0) | (this->channels == 4 ? 4 : 0);
		this->writePixel(flags, 0xF8, 0x07);

		// Extflags
		if ((flags & 1) != 0) {
			// Ext flags 1
			unsigned int flags2 = 0;
			// bit 1 is reserved
			flags2 |= (metadataLength > 0 ? 2 : 0); // has metadata
			flags2 |= ((hashmask && !this->deband) ? 4 : 0); // hashmask data
			// bit 8 is reserved
			ImageWriter::intToData(flags2, buffer, 1);
			this->embedData(buffer, 1);

			// Hashmask enabled
			if ((flags2 & 4) != 0) {
				this->completePixel();
				this->initHashmask(this->image, this->image->getWidth(), this->image->getHeight(), this->channels, this->bitmask);
			}
		}

		// Scatter
		if (scatter) {
			// Calculate
			this->scatterRange = (
				(ImageWriter::getBitRequirement(sources) + // data length
				(2 + (metadataLength > 0 ? 2 + metadataLength : 0)) * 8 + // extra metadata length
				this->bitmask - 1 // make this perform ceil rather than floor
			) / this->bitmask);
			// Write
			ImageWriter::intToData(this->scatterRange, buffer, 4);
			this->embedData(buffer, 4);
			// Complete this pixel if necessary
			this->completePixel();
			// Enable scatter
			this->scatterPos = 0;
			this->scatter = true;
			this->scatterFullRange = ((this->image->getWidth() * this->image->getHeight() * this->channels) - this->pixelPos - 1); // Total amount of pixel components used
		}

		// Metadata (only happens if metadata flag is set)
		if (metadataLength > 0) {
			// Actual metadata
			ImageWriter::intToData(metadataLength, buffer, 2);
			this->embedData(buffer, 2);
			// Not implemented; dummy buffer
			buffer[0] = 0;
			while (--metadataLength >= 0) this->embedData(buffer, 1);
		}


		// File count
		ImageWriter::intToData(sources.size(), buffer, 2);
		this->embedData(buffer, 2);

		// Filename lengths and file lengths
		for (unsigned int i = 0; i < sources.size(); ++i) {
			// Filename length
			ImageWriter::intToData(ImageWriter::getFilename(sources[i]).length(), buffer, 2);
			this->embedData(buffer, 2);
			// File length
			ImageWriter::intToData(ImageWriter::getFileSize(sources[i].c_str()), buffer, 4);
			this->embedData(buffer, 4);
		}

		// Filenames
		std::string fname;
		for (unsigned int i = 0; i < sources.size(); ++i) {
			fname = ImageWriter::getFilename(sources[i]);
			this->embedData(fname.c_str(), fname.length());
		}

		// Sources
		int embedCount = 0;
		int length;
		for (unsigned int i = 0; i < sources.size(); ++i) {
			// Note: this is assuming that filesizes haven't been modified between
			//  here and the earlier filesize reads
			std::ifstream in(sources[i].c_str(), (std::ifstream::in | std::ifstream::binary));
			if (in.is_open()) {
				length = BUFFER_SIZE;
				while (length != 0) {
					length = in.readsome(buffer, BUFFER_SIZE);
					this->embedData(buffer, length);
				}
				in.close();
			}
		}

		// Done
		this->complete();
		this->freeHashmask();
		return embedCount;
	}

	unsigned int ImageWriter :: getBitRequirement(const std::vector<std::string>& sources) {
		unsigned int totalBits = 0;
		for (unsigned int i = 0; i < sources.size(); ++i) {
			// 16 bits for filename length
			// 32 bits for file length
			// 8 * length of file
			// 8 * length of filename
			totalBits += 16 + 32 + ImageWriter::getFileSize(sources[i].c_str()) * 8 + ImageWriter::getFilename(sources[i]).length() * 8;
		}

		return totalBits;
	}
	unsigned int ImageWriter :: getBitAvailability(unsigned int width, unsigned int height, unsigned int channelCount, unsigned int bitmask, unsigned int metadataLength, bool scatter, bool hashmask) {
		assert(bitmask >= 1);
		assert(bitmask <= 8);

		int extFlagCount = (metadataLength > 0 || hashmask) ;
		// 16 : file count
		// metadataLength * 8 + 16 (only if metadataLength > 0)
		// ((32 - 1) / bitmask * bitmask + bitmask) extra bits if scatter==true (ceil(32 / bitmask) * bitmask)
		unsigned int metadataBits = 16 + extFlagCount * 8 + (metadataLength > 0 ? 16 + metadataLength * 8 : 0) + (scatter ? (32 - 1) / bitmask * bitmask + bitmask : 0);
		// first "-1" : for the bitmask
		// second "-1" : for the flags
		// last "-1" : last byte is reserved
		return (width * height * channelCount - 1 - 1 - 1) * bitmask - metadataBits;
	}

	bool ImageWriter :: toNext(int skipCount) {
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

	void ImageWriter :: embedData(const char* data, int length) {
		for (int i = 0; i < length; ++i) {
			this->bitValue |= static_cast<unsigned char>(data[i]) << this->bitCount;
			this->bitCount += 8;
			for (; this->bitCount >= this->bitmask; this->bitCount -= this->bitmask) {
				// Embed
				this->writePixel(this->bitValue, this->pixelMask, this->valueMask);
				// Update
				this->bitValue >>= this->bitmask;
			}
		}
	}
	void ImageWriter :: completePixel() {
		if (this->bitCount > 0) {
			this->writePixel(this->bitValue, this->pixelMask, this->valueMask);
			this->bitValue = 0;
			this->bitCount = 0;
		}
	}
	void ImageWriter :: complete() {
		this->completePixel();

		if (this->randomizeAll && !this->scatter) {
			Random rng;
			while (this->writePixel(rng.nextInt(), this->pixelMask, this->valueMask));
		}
	}

	void ImageWriter :: intToData(unsigned int value, char* data, int length) {
		for (int i = 0; i < length; ++i) {
			data[length - 1 - i] = (value & (0xFF << (i * 8))) >> (i * 8);
		}
	}
	unsigned int ImageWriter :: getFileSize(cstring filename) {
		std::ifstream in(filename, (std::ifstream::in | std::ifstream::binary));
		if (!in.is_open()) return 0;
		// Seek
		in.seekg(0, std::ifstream::end);
		// Update
		unsigned int len = in.tellg();
		// Close
		in.close();
		return len;
	}
	std::string ImageWriter :: getFilename(const std::string& filename) {
		int pos = filename.length();
		while (--pos >= 0 && filename[pos] != '\\' && filename[pos] != '/');
		if (pos < 0) return filename;
		++pos;
		return filename.substr(pos, filename.length() - pos);
	}

	bool ImageWriter :: writePixel(unsigned int value, unsigned int pixelMask, unsigned int valueMask) {
		value = (value & valueMask);
		if (this->isHashmasking()) {
			// Modify value
			// Hashmasking should not occur while debanding
			value = this->encodeHashmask(value, this->bitmask);
		}
		if (this->deband) {
			int pixel = this->image->getPixel(this->x, this->y, this->c);
			pixel = static_cast<int>(pixel * (256 - valueMask) / 256.0);
			pixel = pixel + ((value - pixel) & valueMask);
			assert((pixel & valueMask) == value);
			value = pixel;
		}
		else {
			value = (this->image->getPixel(this->x, this->y, this->c) & pixelMask) | value;
		}
		this->image->setPixel(
			this->x, this->y, this->c,
			value
		);
		if (this->scatter) {
			++this->scatterPos;
			assert(this->scatterPos <= this->scatterRange);

			int v = (((this->scatterPos * this->scatterFullRange / this->scatterRange) - ((this->scatterPos - 1) * this->scatterFullRange / this->scatterRange)));
			this->pixelPos += v;
			assert(v > 0);
			bool b = this->toNext(v);
			assert(b);
			return b;
		}
		else {
			++this->pixelPos;
			return this->toNext(1);
		}
	}

};


