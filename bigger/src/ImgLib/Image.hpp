#ifndef IMGLIB_IMAGE_H
#define IMGLIB_IMAGE_H 1

#include "../Include.hpp"
#include <vector>
#include <iostream>
#include "../JPEG/jpge.h"



namespace lodepng {
	class State;
};
namespace ImgLib {
	class Image {
	private:
		bool hasAlpha;
		bool hasAlphaDefault;
		unsigned int width;
		unsigned int height;
		std::vector<unsigned char> pixels;

	public:
		enum ImageType {
			PNG = 0,
			JPEG = 1,
			GIF = 2,
			//BMP = 3,
		};

		Image();
		Image(const Image& other);
		~Image();

		void copy(const Image* other);

		bool loadFromSource(const std::vector<unsigned char>* source, Image::ImageType imageType, int colorDepthOverride, std::ostream* errorStream);

		unsigned char getPixel(unsigned int x, unsigned int y, unsigned int component) const;
		void setPixel(unsigned int x, unsigned int y, unsigned int component, unsigned char value);

		bool saveToVector(std::vector<unsigned char>* source, lodepng::State* state, std::ostream* errorStream) const;
		bool saveToVectorJpeg(std::vector<unsigned char>* source, jpge::params* params, std::ostream* errorStream) const;

		unsigned int getChannelCount() const;
		unsigned int getDefaultChannelCount() const;
		unsigned int getWidth() const;
		unsigned int getHeight() const;

		const std::vector<unsigned char>* getPixels() const;

		void downscale(unsigned int width, unsigned int height);
		void upscale(unsigned int width, unsigned int height);

	};
};



#endif

