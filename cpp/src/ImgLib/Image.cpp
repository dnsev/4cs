#include "Image.hpp"
#include "../LodePNG/lodepng.h"
#include <cassert>



namespace ImgLib {

	Image :: Image() :
		hasAlpha(false),
		hasAlphaDefault(false),
		width(0),
		height(0),
		pixels()
	{
	}
	Image :: Image(const Image& other) :
		hasAlpha(other.hasAlpha),
		hasAlphaDefault(other.hasAlphaDefault),
		width(other.width),
		height(other.height),
		pixels(other.pixels)
	{
	}
	Image :: ~Image() {
	}
	bool Image :: loadFromSource(const std::vector<unsigned char>* source, int color_depth_override, std::ostream* errorStream) {
		assert(source != NULL);

		// Load the PNG
		lodepng::State state;
		state.info_raw.colortype = LCT_RGBA;

		this->pixels.clear();
		unsigned int error = lodepng::decode(this->pixels, this->width, this->height, state, *source);

		// Error?
		if (error != 0) {
			this->width = 0;
			this->height = 0;
			this->pixels.clear();

			if (errorStream != NULL) {
				*errorStream << lodepng_error_text(error);
			}

			return false;
		}

		// Settings
		// TODO : make this work properly (sometimes detects 3 channels as 4; see LCT_PALETTE)
		this->hasAlphaDefault = (state.info_png.color.colortype == LCT_RGBA || state.info_png.color.colortype == LCT_GREY_ALPHA || state.info_png.color.colortype == LCT_PALETTE);

		// Override
		if (color_depth_override == 3 || color_depth_override == 4) {
			this->hasAlpha = (color_depth_override == 4);
		}
		else {
			this->hasAlpha = this->hasAlphaDefault;
		}

		// Okay
		return true;
	}
	bool Image :: saveToVector(std::vector<unsigned char>* source, lodepng::State* state, std::ostream* errorStream) const {
		assert(state != NULL);
		assert(source != NULL);

		// Setup
		source->clear();

		unsigned int error = lodepng::encode(*source, this->pixels, this->width, this->height, *state);
		// Error?
		if (error != 0) {
			if (errorStream != NULL) {
				*errorStream << lodepng_error_text(error);
			}

			return false;
		}

		// Okay
		return true;
	}

	void Image :: copy(const Image* other) {
		assert(other != NULL);

		this->hasAlpha = other->hasAlpha;
		this->hasAlphaDefault = other->hasAlphaDefault;
		this->width = other->width;
		this->height = other->height;
		this->pixels = other->pixels;
	}

	unsigned char Image :: getPixel(unsigned int x, unsigned int y, unsigned int component) const {
		return this->pixels[(x + y * this->width) * 4 + component];
	}
	void Image :: setPixel(unsigned int x, unsigned int y, unsigned int component, unsigned char value) {
		this->pixels[(x + y * this->width) * 4 + component] = value;
	}

	unsigned int Image :: getChannelCount() const {
		return 3 + this->hasAlpha;
	}
	unsigned int Image :: getDefaultChannelCount() const {
		return 3 + this->hasAlphaDefault;
	}
	unsigned int Image :: getWidth() const {
		return this->width;
	}
	unsigned int Image :: getHeight() const {
		return this->height;
	}

	const std::vector<unsigned char>* Image :: getPixels() const {
		return &this->pixels;
	}

};


