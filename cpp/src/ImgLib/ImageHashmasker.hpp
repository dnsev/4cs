#ifndef IMGLIB_IMAGEHASHMASKER_H
#define IMGLIB_IMAGEHASHMASKER_H 1

#include "../Include.hpp"



namespace ImgLib {
	class Image;

	class ImageHashmasker {
	private:
		bool hashmasking;
		unsigned int hashmaskLength;
		unsigned int hashmaskIndex;
		unsigned char* hashmaskValue;

	protected:
		ImageHashmasker();
		~ImageHashmasker();

		void resetHashmask();
		void initHashmask(const Image* image, unsigned int w, unsigned int h, unsigned int cc, unsigned int bitmask);
		void freeHashmask();

		bool isHashmasking() const;

		unsigned int encodeHashmask(unsigned int value, unsigned int bits);
		unsigned int decodeHashmask(unsigned int value, unsigned int bits);

	private:
		void calculateHashmask(const Image* image, unsigned int w, unsigned int h, unsigned int cc, unsigned int bitmask);
		void updateHashmask(unsigned int value, unsigned int bits);

	};
};



#endif

