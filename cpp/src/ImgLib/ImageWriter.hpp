#ifndef IMGLIB_IMAGEWRITER_H
#define IMGLIB_IMAGEWRITER_H 1

#include "../Include.hpp"
#include "ImageHashmasker.hpp"
#include <vector>
#include <string>
#include <cstring>



namespace ImgLib {
	class Image;

	class ImageWriter : public ImageHashmasker {
	private:
		Image* image;
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
		bool randomizeAll;

	public:
		explicit ImageWriter(Image* image);
		~ImageWriter();

		int pack(const std::vector<std::string>& sources, unsigned int bitmask, bool randomizeAll, bool scatter, bool hashmask);

		static unsigned int getBitRequirement(const std::vector<std::string>& sources);
		static unsigned int getBitAvailability(unsigned int width, unsigned int height, unsigned int channelCount, unsigned int bitmask, unsigned int metadataLength, bool scatter, bool hashmask);

		static unsigned int getFileSize(cstring filename);

	private:
		bool toNext(int skipCount);

		void embedData(const char* data, int length);
		void completePixel();
		void complete();

		static void intToData(unsigned int value, char* data, int length);

		bool writePixel(unsigned int value, unsigned int pixelMask, unsigned int valueMask);

		void calculateHashmask();
		void updateHashmask(unsigned int value, unsigned int bits, unsigned int add);

	};
};



#endif

