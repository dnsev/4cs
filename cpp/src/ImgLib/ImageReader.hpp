#ifndef IMGLIB_IMAGEREADER_H
#define IMGLIB_IMAGEREADER_H 1

#include "../Include.hpp"
#include "ImageHashmasker.hpp"



namespace ImgLib {
	class Image;

	class ImageReader : public ImageHashmasker {
	private:
		const Image* image;
		unsigned int x;
		unsigned int y;
		unsigned int c;
		unsigned int bitmask;
		unsigned int valueMask;
		unsigned int pixelMask;
		unsigned int bitValue;
		unsigned int bitCount;
		unsigned int channels;
		unsigned int pixelPos;
		unsigned long long scatterPos;
		unsigned long long scatterRange;
		unsigned long long scatterFullRange;
		bool scatter;

	public:
		explicit ImageReader(const Image* image);
		~ImageReader();

		int unpack(cstring prefix, cstring suffix);

	private:
		bool toNext(int skipCount);

		bool extractData(char* data, int length);

		static unsigned int dataToInt(const char* data, int length);
		void completePixel();

		int readPixel(unsigned int valueMask);

	};
};



#endif

