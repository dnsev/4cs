#include "Image.hpp"
#include "../LodePNG/lodepng.h"
#include "../JPEG/jpgd.h"
#define STBI_NO_STDIO
#define STBI_HEADER_FILE_ONLY
#include "../stb_image/stb_image.c"
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
	bool Image :: loadFromSource(const std::vector<unsigned char>* source, Image::ImageType imageType, int colorDepthOverride, std::ostream* errorStream) {
		assert(source != NULL);

		// Load
		this->pixels.clear();
		this->width = 0;
		this->height = 0;

		if (imageType == Image::PNG) {
			// Load the PNG
			lodepng::State state;
			state.info_raw.colortype = LCT_RGBA;

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
			this->hasAlphaDefault = (state.info_png.color.colortype == LCT_RGBA || state.info_png.color.colortype == LCT_GREY_ALPHA);
			if (state.info_png.color.colortype == LCT_PALETTE) {
				for (unsigned int i = 0; i < state.info_png.color.palettesize; ++i) {
					if (state.info_png.color.palette[i * 4 + 3] < 255) {
						this->hasAlphaDefault = true;
						break;
					}
				}
			}
		}
		else if (imageType == Image::JPEG) {
			int actual_comps = 0;
			int w, h;
			unsigned char* image = jpgd::decompress_jpeg_image_from_memory(
				&((*source)[0]),
				source->size(),
				&w,
				&h,
				&actual_comps,
				4
			);

			// Error
			if (image == NULL) {
				if (errorStream != NULL) {
					// TODO:  better error message
					*errorStream << "Jpeg load error";
				}

				return false;
			}

			// Transfer
			this->width = w;
			this->height = h;

			this->pixels.resize(this->width * this->height * 4);
			std::copy(image, image + (this->width * this->height * 4), this->pixels.begin());
			delete [] image;

			// Jpeg, so no alpha
			this->hasAlphaDefault = false;
		}
		else { // GIF
			int w, h, comp;
			unsigned char* image = stbi_load_from_memory(
				&(*source)[0],
				source->size(),
				&w,
				&h,
				&comp,
				4
			);

			if (image == NULL) {
				if (errorStream != NULL) {
					*errorStream << "Failed to load GIF";
				}

				return false;
			}

			// Transfer
			this->width = w;
			this->height = h;

			this->pixels.resize(this->width * this->height * 4);
			std::copy(image, image + (this->width * this->height * 4), this->pixels.begin());
			stbi_image_free(image);

			// Gif, so alpha
			this->hasAlphaDefault = true;
		}

		// Override
		if (colorDepthOverride == 3 || colorDepthOverride == 4) {
			this->hasAlpha = (colorDepthOverride == 4);
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

	void Image :: downscale(unsigned int width, unsigned int height) {
		// Create with space
		std::vector<unsigned char> newImage(width * height * 4, 0);

		// Downscale
		bool fx, fy;
		double xscale = static_cast<double>(this->width) / width;
		double yscale = static_cast<double>(this->height) / height;
		double value, vcol, v;
		double dxs, dys, s;
		double xrange[2];
		double yrange[2];
		for (unsigned int y = 0; y < height; ++y) {
			for (unsigned int x = 0; x < width; ++x) {
				for (unsigned int c = 0; c < 4; ++c) {
					value = 0.0;
					xrange[0] = x * xscale;
					xrange[1] = (x + 1) * xscale;
					yrange[0] = y * yscale;
					yrange[1] = (y + 1) * yscale;

					dxs = 0.0;
					dys = 0.0;
					fx = true;
					for (double dx = xrange[0], dxn; ; dx = dxn) {
						dxn = dx + 1.0;

						vcol = 0.0;
						fy = true;
						for (double dy = yrange[0], dyn; ; dy = dyn) {
							dyn = dy + 1.0;

							v = this->pixels[
								(static_cast<int>(dx) + static_cast<int>(dy) * this->width) * 4 + c
							];
							
							if (dyn >= yrange[1]) {
								// end pixel
								s = (1.0 - (static_cast<int>(dyn) - dy));
								if (fx) dys += s;
								vcol += v * s;
								break;
							}
							else if (fy) {
								// start pixel
								s = (static_cast<int>(dyn) - dy);
								if (fx) dys += s;
								vcol += v * s;
								fy = false;
							}
							else {
								if (fx) dys += 1.0;
								vcol += v;
							}
						}

						if (dxn >= xrange[1]) {
							// end col
							s = (1.0 - (static_cast<int>(dxn) - dx));
							dxs += s;
							value += vcol * s;
							break;
						}
						else if (fx) {
							// start col
							s = (static_cast<int>(dxn) - dx);
							dxs += s;
							value += vcol * s;
							fx = false;
						}
						else {
							dxs += 1.0;
							value += vcol;
						}
					}
					value /= dxs * dys;
					newImage[(x + y * width) * 4 + c] = static_cast<int>(value + 0.5);
				}
			}
		}

		// Replace
		this->width = width;
		this->height = height;
		newImage.swap(this->pixels);
	}
	void Image :: upscale(unsigned int width, unsigned int height) {
		// Create with space
		std::vector<unsigned char> newImage(width * height * 4, 0);

		// 1:n upscaling
		double xscale = static_cast<double>(this->width) / width;
		double yscale = static_cast<double>(this->height) / height;
		for (unsigned int y = 0; y < height; ++y) {
			for (unsigned int x = 0; x < width; ++x) {
				for (unsigned int c = 0; c < 4; ++c) {
					newImage[(x + y * width) * 4 + c] = this->pixels[
						((static_cast<unsigned int>(x * xscale) + static_cast<unsigned int>(y * yscale) * this->width)
						) * 4 + c
					];
				}
			}
		}

		// Replace
		this->width = width;
		this->height = height;
		newImage.swap(this->pixels);
	}

};


