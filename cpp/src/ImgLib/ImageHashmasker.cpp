#include "ImageHashmasker.hpp"
#include "Image.hpp"
#include <cassert>
#include <iostream>


namespace ImgLib {

	ImageHashmasker :: ImageHashmasker() :
		hashmasking(false),
		hashmaskLength(0),
		hashmaskIndex(0),
		hashmaskValue(NULL)
	{
	}
	ImageHashmasker :: ~ImageHashmasker() {
		this->freeHashmask();
	}

	void ImageHashmasker :: resetHashmask() {
		this->freeHashmask();
	}
	void ImageHashmasker :: initHashmask(const Image* image, unsigned int w, unsigned int h, unsigned int cc, unsigned int bitmask) {
		this->hashmasking = true;
		this->hashmaskLength = 32 * 8;
		this->hashmaskIndex = 0;
		this->hashmaskValue = new unsigned char[this->hashmaskLength / 8];
		for (unsigned int i = 0; i < this->hashmaskLength / 8; ++i) {
			this->hashmaskValue[i] = (1 << ((i % 8) + 1)) - 1;
		}
		this->calculateHashmask(image, w, h, cc, bitmask);
		this->hashmaskIndex = 0; // Reset this because it's used by calculateHashmask()
	}
	void ImageHashmasker :: freeHashmask() {
		if (this->hashmasking) {
			assert(this->hashmaskValue != NULL);
			this->hashmasking = false;
			delete [] this->hashmaskValue;
			this->hashmaskValue = NULL;
		}
		assert(this->hashmaskValue == NULL);
	}
	bool ImageHashmasker :: isHashmasking() const {
		return this->hashmasking;
	}
	void ImageHashmasker :: calculateHashmask(const Image* image, unsigned int w, unsigned int h, unsigned int cc, unsigned int bitmask) {
		assert(image != NULL);

		// Vars
		unsigned int x = 0;
		unsigned int y = 0;
		unsigned int c = 0;

		// First 2 flag pixels
		this->updateHashmask(image->getPixel(x, y, c) >> 3, 5);
		if ((c = (c + 1) % cc) == 0 && (x = (x + 1) % w) == 0 && (y = (y + 1) % h) == 0) return;
		this->updateHashmask(image->getPixel(x, y, c) >> 3, 5);
		if ((c = (c + 1) % cc) == 0 && (x = (x + 1) % w) == 0 && (y = (y + 1) % h) == 0) return;

		// All other pixels
		if (bitmask != 8) {
			while (true) {
				// Update
				this->updateHashmask(image->getPixel(x, y, c) >> bitmask, 8 - bitmask);

				// Next
				if ((c = (c + 1) % cc) == 0 && (x = (x + 1) % w) == 0 && (y = (y + 1) % h) == 0) return;
			}
		}
	}
	void ImageHashmasker :: updateHashmask(unsigned int value, unsigned int bits) {
		// First 2 flag pixels
		unsigned int b;
		while (true) {
			assert(bits != 0);
			// Number of bits that can be used on this index
			b = 8 - (this->hashmaskIndex % 8);
			if (bits <= b) {
				// Apply
				this->hashmaskValue[this->hashmaskIndex / 8] ^= (value) << (this->hashmaskIndex % 8);
				// Done
				this->hashmaskIndex = (this->hashmaskIndex + bits) % (this->hashmaskLength);
				return;
			}
			else {
				// Partial apply
				this->hashmaskValue[this->hashmaskIndex / 8] ^= (value & ((1 << b) - 1)) << (this->hashmaskIndex % 8);
				// Done
				this->hashmaskIndex = (this->hashmaskIndex + b) % (this->hashmaskLength);
				bits -= b;
				value >>= b;
			}
		}
	}

	unsigned int ImageHashmasker :: encodeHashmask(unsigned int value, unsigned int bits) {
		unsigned int b;
		unsigned int off = 0;
		while (true) {
			b = 8 - (this->hashmaskIndex % 8);
			if (bits <= b) {
				// Apply
				value ^= (this->hashmaskValue[this->hashmaskIndex / 8] & ((1 << bits) - 1)) << off;
				// Done
				this->hashmaskIndex = (this->hashmaskIndex + bits) % (this->hashmaskLength);
				return value;
			}
			else {
				// Partial apply
				value ^= (this->hashmaskValue[this->hashmaskIndex / 8] & ((1 << b) - 1)) << off;
				// Done
				this->hashmaskIndex = (this->hashmaskIndex + b) % (this->hashmaskLength);
				bits -= b;
				off += b;
			}
		}
	}
	unsigned int ImageHashmasker :: decodeHashmask(unsigned int value, unsigned int bits) {
		unsigned int b;
		unsigned int off = 0;
		while (true) {
			b = 8 - (this->hashmaskIndex % 8);
			if (bits <= b) {
				// Apply
				value ^= (this->hashmaskValue[this->hashmaskIndex / 8] & ((1 << bits) - 1)) << off;
				// Done
				this->hashmaskIndex = (this->hashmaskIndex + bits) % (this->hashmaskLength);
				return value;
			}
			else {
				// Partial apply
				value ^= (this->hashmaskValue[this->hashmaskIndex / 8] & ((1 << b) - 1)) << off;
				// Done
				this->hashmaskIndex = (this->hashmaskIndex + b) % (this->hashmaskLength);
				bits -= b;
				off += b;
			}
		}
	}

};


