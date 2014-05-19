#include "Include.hpp"
#include <iostream>
#include <iomanip>
#include <string>
#include <cstring>
#include <cstdlib>
#include <vector>
#include <sstream>
#include <fstream>
#include <cassert>
#include "ImgLib/Image.hpp"
#include "ImgLib/ImageWriter.hpp"
#include "LodePNG/lodepng.h"
#define EMBED_VERSION "1.0d"
using namespace std;
using namespace ImgLib;



bool fullOptimizeEncode(Image* image, lodepng::State* state, std::vector<unsigned char>* pngOutput, ostream* immediateStream, ostream* statusStream, ostream* errorStream);
void getImageOptimalSize(const Image* image, unsigned int bitRequirement, unsigned int bitmask, unsigned int channelCount, unsigned int metadataLength, bool scatter, bool hashmask, unsigned int* dimensionsBest);
bool loadSettings(bool force, cstring filename, int* filesizeLimit, bool* scatter, bool* randomizeAll, bool* hashmask, bool* upscale, bool* deband);



int main(int argc, char** argv) {
	// Settings
	int filesizeLimit = 0;
	unsigned int bitmask = 0;
	std::string outputFile = "";
	unsigned int channelCount = 0;
	bool randomizeAll = false;
	bool scatter = false;
	bool fullOptimize = false;
	bool downscale = false;
	bool upscale = false;
	bool info = false;
	bool embed = true;
	bool version = false;
	bool hashmask = true;
	bool infoFileRead = false;
	bool deband = false;
	std::string imageFile = "";
	std::vector<std::string> sources;

	// Flags
	bool canFlag = true;
	for (int i = 1; i < argc; ++i) {
		if (canFlag && argv[i][0] == '-') {
			if (strcmp(argv[i], "--") == 0) {
				canFlag = false;
			}
			else if (argv[i][1] == 'b') {
				bool next;
				if ((next = (argv[i][2] == '\0')) && ++i >= argc) break;
				bitmask = atoi(&argv[i][next ? 0 : 2]);
				if (bitmask <= 0 || bitmask > 8) {
					cout << "Warning: invalid bitmask value \"" << argv[i] << "\"" << endl;
					bitmask = 0;
				}
			}
			else if (argv[i][1] == 'B' && argv[i][2] == '\0') {
				bitmask = 0;
			}
			else if (argv[i][1] == 'l') {
				bool next;
				if ((next = (argv[i][2] == '\0')) && ++i >= argc) break;
				int pos = next ? 0 : 2;
				while (argv[i][pos] != '\0') ++pos;

				int scale = 1;
				if ((argv[i][pos] & 0xDF) == 'K') scale = 1024;
				else if ((argv[i][pos] & 0xDF) == 'M') scale = 1024 * 1024;

				int value;
				if (scale == 1) {
					value = atoi(&argv[i][next ? 0 : 2]);
				}
				else {
					char c = argv[i][pos];
					argv[i][pos] = '\0';
					value = atoi(&argv[i][next ? 0 : 2]) * scale;
					argv[i][pos] = c;
				}

				if (value < 0) {
					cout << "Warning: file size limit cannot be negative: \"" << (&argv[i][next ? 0 : 2]) << "\"" << endl;
				}
				else {
					filesizeLimit = value;
				}
			}
			else if (argv[i][1] == 'L' && argv[i][2] == '\0') {
				filesizeLimit = 0;
			}
			else if (argv[i][1] == 'x') {
				bool next;
				if ((next = (argv[i][2] == '\0')) && ++i >= argc) break;
				outputFile = &argv[i][next ? 0 : 2];
				// .png extension
				int pos = outputFile.length();
				if (pos < 4 || (outputFile[pos - 4] != '.' || (outputFile[pos - 3] & 0xDF) != 'P' || (outputFile[pos - 2] & 0xDF) != 'N' || (outputFile[pos - 1] & 0xDF) != 'G')) {
					outputFile += ".png";
				}
			}
			else if (argv[i][1] == 'X' && argv[i][2] == '\0') {
				outputFile = "";
			}
			else if (argv[i][1] == 'r' && argv[i][2] == '\0') {
				randomizeAll = true;
			}
			else if (argv[i][1] == 'R' && argv[i][2] == '\0') {
				randomizeAll = false;
			}
			else if (argv[i][1] == 'a' && (argv[i][2] == '\0' || ((argv[i][2] & 0xDF) == 'A' && argv[i][3] == '\0'))) {
				channelCount = (argv[i][2] == '\0' ? 4 : 0);
			}
			else if (argv[i][1] == 'A' && (argv[i][2] == '\0' || ((argv[i][2] & 0xDF) == 'A' && argv[i][3] == '\0'))) {
				channelCount = (argv[i][2] == '\0' ? 3 : 0);
			}
			else if (argv[i][1] == 'o' && argv[i][2] == '\0') {
				fullOptimize = true;
			}
			else if (argv[i][1] == 'O' && argv[i][2] == '\0') {
				fullOptimize = false;
			}
			else if (argv[i][1] == 's' && argv[i][2] == '\0') {
				scatter = true;
			}
			else if (argv[i][1] == 'S' && argv[i][2] == '\0') {
				scatter = false;
			}
			else if (argv[i][1] == 'd' && argv[i][2] == '\0') {
				downscale = true;
			}
			else if (argv[i][1] == 'D' && argv[i][2] == '\0') {
				downscale = false;
			}
			else if (argv[i][1] == 'u' && argv[i][2] == '\0') {
				upscale = true;
			}
			else if (argv[i][1] == 'U' && argv[i][2] == '\0') {
				upscale = false;
			}
			else if (argv[i][1] == 'i' && argv[i][2] == '\0') {
				info = true;
			}
			else if (argv[i][1] == 'e' && argv[i][2] == '\0') {
				embed = true;
			}
			else if (argv[i][1] == 'E' && argv[i][2] == '\0') {
				embed = false;
			}
			else if (argv[i][1] == 'n' && argv[i][2] == '\0') {
				deband = true;
			}
			else if (argv[i][1] == 'N' && argv[i][2] == '\0') {
				deband = false;
			}
			else if (argv[i][1] == 'v' && argv[i][2] == '\0') {
				version = true;
			}
			else if (argv[i][1] == 'V' && argv[i][2] == '\0') {
				version = false;
			}
			else if (argv[i][1] == 'h' && argv[i][2] == '\0') {
				hashmask = true;
			}
			else if (argv[i][1] == 'H' && argv[i][2] == '\0') {
				hashmask = false;
			}
			else {
				cout << "Warning: unknown flag \"" << argv[i] << "\"" << endl;
			}
		}
		else {
			int pos = 0;
			while (argv[i][pos] != '\0') ++pos;
			if (
				imageFile.length() == 0 && (
					(pos >= 4 && (argv[i][pos - 4] == '.' && (argv[i][pos - 3] & 0xDF) == 'P' && (argv[i][pos - 2] & 0xDF) == 'N' && (argv[i][pos - 1] & 0xDF) == 'G')) ||
					(pos >= 4 && (argv[i][pos - 4] == '.' && (argv[i][pos - 3] & 0xDF) == 'G' && (argv[i][pos - 2] & 0xDF) == 'I' && (argv[i][pos - 1] & 0xDF) == 'F')) ||
					(pos >= 4 && (argv[i][pos - 4] == '.' && (argv[i][pos - 3] & 0xDF) == 'J' && (argv[i][pos - 2] & 0xDF) == 'P' && (argv[i][pos - 1] & 0xDF) == 'G')) ||
					(pos >= 5 && (argv[i][pos - 5] == '.' && (argv[i][pos - 4] & 0xDF) == 'J' && (argv[i][pos - 3] & 0xDF) == 'P' && (argv[i][pos - 2] & 0xDF) == 'E' && (argv[i][pos - 1] & 0xDF) == 'G'))
				)
			) {
				imageFile = argv[i];
			}
			else {
				if (
					canFlag && loadSettings(false, argv[i], &filesizeLimit, &scatter, &randomizeAll, &hashmask, &upscale, &deband)
				) {
					infoFileRead = true;
				}
				else {
					sources.push_back(argv[i]);
				}
			}
		}
	}

	// Version
	if (version) {
		cout << EMBED_VERSION << endl;
		return 0;
	}

	// Usage
	if (sources.size() == 0 && imageFile.length() == 0) {
		cout << "Usage:" << endl;
		cout << "    " << argv[0] << " [-b ...] [-l ...] [-x ...] [-a/-A/-aa] [-r] [-o] [-s] [-d] [-i] image.png file1.txt file2.txt ..." << endl;
		cout << "" << endl;
		cout << "       -b bitmask : set the amount of bits per color component to be used to store data" << endl;
		cout << "                  : valid values are 1, 2, 3, 4, 5, 6, 7, and 8" << endl;
		cout << "                  : smaller values cause a smaller impact on the image, but need more space" << endl;
		cout << "               -B : make the bitmask be the minimum required mask as determined from the image" << endl;
		cout << "" << endl;
		cout << "    -l size_limit : set the output file size limit" << endl;
		cout << "                  : valid values are positive numbers, with a possible suffix of \"k\" or \"m\"" << endl;
		cout << "                  : value of 0 indicates no size limit" << endl;
		cout << "               -L : turn off the file size limit" << endl;
		cout << "" << endl;
		cout << "        -x output : set the filename to output to" << endl;
		cout << "                  : if the extension is not \".png\", a \".png\" will be appended" << endl;
		cout << "               -X : set the filename to output to the default file" << endl;
		cout << "" << endl;
		cout << "               -a : force an alpha channel to be used" << endl;
		cout << "                  : can allow for more space to store data without resizing the image" << endl;
		cout << "               -A : force an alpha channel NOT to be used" << endl;
		cout << "  -aa/-aA/-Aa/-AA : use the default alpha channel setting of the image" << endl;
		cout << "" << endl;
		cout << "               -r : enable randomized pixels after data is stored" << endl;
		cout << "                  : when enabled, it maintains the \"fuzzy\" look of the image" << endl;
		cout << "                  : (i.e. no band of clean pixels as the end)" << endl;
		cout << "               -R : disable pixel randomization" << endl;
		cout << "" << endl;
		cout << "               -o : enable output optimization" << endl;
		cout << "                  : enabling optimization runs an optimization loop which may take longer" << endl;
		cout << "               -O : disable output optimization" << endl;
		cout << "" << endl;
		cout << "               -s : enables scatter; disperses data through the image more evenly" << endl;
		cout << "                  : cancels out randomizer if enabled" << endl;
		cout << "               -S : disable scatter" << endl;
		cout << "" << endl;
		cout << "               -d : enables downscaling; the image can be resized to the best fit" << endl;
		cout << "                  : can help with reducing image size" << endl;
		cout << "               -D : disable downscaling" << endl;
		cout << "" << endl;
		cout << "               -u : enables upscaling; the image can be resized to be larger if the data doesn't fit" << endl;
		cout << "                  : enabling downscaling at the same time will allow the image to be scaled down after" << endl;
		cout << "               -U : disable upscaling" << endl;
		cout << "" << endl;
		cout << "               -i : display image info and exit" << endl;
		cout << "" << endl;
		cout << "               -e : embed files in image (default)" << endl;
		cout << "               -E : don't embed files in image (works as a re-encoder)" << endl;
		cout << "" << endl;
		cout << "               -v : display version and exit" << endl;
		cout << "               -V : don't display version" << endl;
		cout << "" << endl;
		cout << "               -h : enable image hash-masking" << endl;
		cout << "               -H : disable image hash-masking" << endl;
		cout << "" << endl;
		cout << "               -n : enable image de-banding" << endl;
		cout << "               -N : disable image de-banding" << endl;
		cout << "" << endl;
		cout << "    image.png : the file to embed data in" << endl;
		cout << "" << endl;
		cout << "    embed_file?.png : a list of files to store" << endl;
		cout << "" << endl;
		cout << "" << endl;
		cout << "    Also note, placing a \"--\" parameter causes any remaining parameters to be treated as files" << endl;

		return -1;
	}

	// PNG/JPG
	int pos = imageFile.length();
	ImgLib::Image::ImageType imageType = ImgLib::Image::JPEG;
	if (imageFile.length() >= 4 && imageFile[pos - 4] == '.') {
		if ((imageFile[pos - 3] & 0xDF) == 'P' && (imageFile[pos - 2] & 0xDF) == 'N' && (imageFile[pos - 1] & 0xDF) == 'G') {
			imageType = ImgLib::Image::PNG;
		}
		else if ((imageFile[pos - 3] & 0xDF) == 'G' && (imageFile[pos - 2] & 0xDF) == 'I' && (imageFile[pos - 1] & 0xDF) == 'F') {
			imageType = ImgLib::Image::GIF;
		}
	}

	// Load image
	if (!info) cout << "Loading image \"" << imageFile << "\"..." << endl;
	std::vector<unsigned char> imageSrc;
	lodepng::load_file(imageSrc, imageFile.c_str());

	// Decode
	if (!info) cout << "Decoding image..." << endl;
	Image image;
	stringstream errorStream;
	if (!image.loadFromSource(&imageSrc, imageType, channelCount, &errorStream)) {
		cout << "Error decoding image file \"" << imageFile << "\":" << endl;
		cout << "  " << errorStream.str() << endl;
		return -1;
	}
	channelCount = image.getChannelCount();

	// Image info
	if (!info && sources.size() == 0) {
		// Image stats
		cstring pad = "    ";
		cout << "Image stats for \"" << imageFile << "\":" << endl;
		for (unsigned int cc = 3; cc <= 4; ++cc) {
			cout << pad << "Width=" << image.getWidth() << "; Height=" << image.getHeight() <<
					"; Channels=" << cc;
			if (cc == image.getDefaultChannelCount()) cout << " (default)";
			cout << endl;

			cstring units;
			for (int i = 1; i <= 8; ++i) {
				double byteSpace = (ImageWriter::getBitAvailability(image.getWidth(), image.getHeight(), cc, i, 0, scatter, hashmask) / 8);
				if (byteSpace >= 1024 * 1024) {
					byteSpace /= 1024 * 1024;
					units = "MB";
				}
				else if (byteSpace >= 1024) {
					byteSpace /= 1024;
					units = "KB";
				}
				else {
					units = "B";
				}
				cout << pad << "About " << std::fixed << std::setprecision(2) << byteSpace << units << " storable @ bitmask=" << i << endl;
			}
			cout << endl;
		}

		// Done
		return 0;
	}

	// Output filename
	if (outputFile.length() == 0) {
		outputFile = imageFile;
		int pos = outputFile.length();
		while (--pos >= 0 && outputFile[pos] != '.');
		if (pos < 0) pos = outputFile.length();

		outputFile.insert(pos, "-embed");

		if (imageType != ImgLib::Image::PNG) {
			// PNG extension required
			pos = outputFile.length();
			while (--pos >= 0 && outputFile[pos] != '.');
			if (pos < 0) pos = 0;
			outputFile.replace(pos, outputFile.length() - pos, ".png");
		}
	}

	// Size requirement
	unsigned int bitRequirement = ImageWriter::getBitRequirement(sources);

	// Compressed info, for easy parsing
	if (info) {
		cstring sep = ",";
		cstring sepl = "\n";
		cout << image.getWidth() << sep << image.getHeight() << sep << image.getDefaultChannelCount() << sepl;

		unsigned int dimensionsBest[2];
		for (int cc = 3; cc <= 4; ++cc) {
			for (int b = 1; b <= 8; ++b) {
				for (int s = 0; s <= 1; ++s) {
					for (int hm = 0; hm <= 1; ++hm) {
						if (bitRequirement > ImageWriter::getBitAvailability(image.getWidth(), image.getHeight(), cc, b, 0, s, hm)) continue;

						getImageOptimalSize(&image, bitRequirement, b, cc, 0, s, hm, dimensionsBest);
						cout << cc << sep << b << sep << s << sep << hm << sep << dimensionsBest[0] << sep << dimensionsBest[1] << sepl;
					}
				}
			}
		}

		// Done
		return 0;
	}

	// Image writer
	ImageWriter iw(&image);

	// Filesize loop
	std::vector<unsigned char> pngOutput;
	unsigned int dimensionsUpscale[2] = { 0 , 0 };
	int outputSize;
	int outputSizeMin = -1;
	bool filesizeLoop = true;
	int filesizeLoopIndex = -1;
	stringstream statusStream;
	while (filesizeLoop) {
		++filesizeLoopIndex;
		filesizeLoop = false;

		// Pass
		cout << endl << "Pass " << (filesizeLoopIndex + 1) << ":" << endl;

		// Reload
		if (filesizeLoopIndex > 0) {
			cout << "  Re-decoding image..." << endl;
			image.loadFromSource(&imageSrc, imageType, channelCount, NULL);
			if (dimensionsUpscale[0] != 0 && dimensionsUpscale[1] != 0) {
				cout << "  Upscaling to { " << dimensionsUpscale[0] << " x " << dimensionsUpscale[1] << " }..." << endl;
				image.upscale(dimensionsUpscale[0], dimensionsUpscale[1]);
				cout << "  Image upscaled" << endl;
			}
		}

		bool upscaleLoop = true;
		int upscaleLoopIndex = 0;
		while (upscaleLoop) {
			upscaleLoop = false;

			// Bitmask
			bool started = (bitmask == 0);
			if (started) bitmask = 1;
			for (; bitmask <= 8 && (bitRequirement > ImageWriter::getBitAvailability(image.getWidth(), image.getHeight(), channelCount, bitmask, 0, scatter, hashmask)); ++bitmask);

			// Optimal size checking
			if (upscale && started && bitmask >= 5 && upscaleLoopIndex < 10) {
				// Reset
				bitmask = 0;
				upscaleLoop = true;
				//downscale = true;
				++upscaleLoopIndex;

				// Upscale
				if (upscaleLoopIndex > 1) {
					// Reload image
					image.loadFromSource(&imageSrc, imageType, channelCount, NULL);
				}
				dimensionsUpscale[0] = (image.getWidth() * (upscaleLoopIndex + 1));
				dimensionsUpscale[1] = (image.getHeight() * (upscaleLoopIndex + 1));
				cout << "  Upscaling to { " << dimensionsUpscale[0] << " x " << dimensionsUpscale[1] << " }..." << endl;
				image.upscale(dimensionsUpscale[0], dimensionsUpscale[1]);
				cout << "  Image upscaled" << endl;

				// Next
				continue;
			}

			// Error
			if (bitmask > 8) {
				cout << "  Error: cannot embed files in the image given." << endl;
				cout << "    Max Available: " << ImageWriter::getBitAvailability(image.getWidth(), image.getHeight(), channelCount, 8, 0, scatter, hashmask) << " bytes" << endl;
				cout << "    Requires     : " << bitRequirement << " bytes" << endl;
				return -1;
			}
		}

		// Downscale
		unsigned int dimensionsBest[2];
		getImageOptimalSize(&image, bitRequirement, bitmask, channelCount, 0, scatter, hashmask, dimensionsBest);
		if (dimensionsBest[0] != image.getWidth() && dimensionsBest[1] != image.getHeight()) {
			if (downscale) {
				cout << "  Downscaling to { " << dimensionsBest[0] << " x " << dimensionsBest[1] << " }..." << endl;
				image.downscale(dimensionsBest[0], dimensionsBest[1]);
				cout << "  Image downscaled" << endl;
			}
			else {
				cout << "  Optimal image dimensions for storage are { " << dimensionsBest[0] << " x " << dimensionsBest[1] << " }" << endl;
			}
		}

		// Packing
		if (embed) {
			cout << "  Embedded using bitmask of " << bitmask << " with " << channelCount << " channels" << endl;
			int packCount = iw.pack(sources, bitmask, randomizeAll, scatter, hashmask, deband);
			if (packCount < 0) {
				cout << "  Error packing data into image" << endl;
			}
		}

		// Writing
		cout << "  Encoding..." << endl;
		lodepng::State state;
		state.encoder.filter_palette_zero = 0;
		state.encoder.add_id = false;
		state.encoder.text_compression = 1;
		state.encoder.zlibsettings.nicematch = 258;
		state.encoder.zlibsettings.lazymatching = 1;
		state.encoder.zlibsettings.windowsize = 32768;
		state.encoder.zlibsettings.btype = 2;
		state.encoder.auto_convert = LAC_AUTO;
		if (fullOptimize) {
			statusStream.str("");
			errorStream.str("");
			if (!fullOptimizeEncode(&image, &state, &pngOutput, &std::cout, &statusStream, &errorStream)) {
				cout << "  Error: failed to encode" << endl;
				cout << "    " << errorStream.str();
				return -1;
			}
			cout << statusStream.str();
		}
		else {
			errorStream.str("");
			if (!image.saveToVector(&pngOutput, &state, &errorStream)) {
				cout << "  Error: failed to encode" << endl;
				cout << "    " << errorStream.str() << endl;
				return -1;
			}
		}

		// Filesize check
		outputSize = pngOutput.size();
		if (outputSize < outputSizeMin || outputSizeMin < 0) outputSizeMin = outputSize;
		if (filesizeLimit > 0) {
			if (outputSize > filesizeLimit) {
				// Re-loop
				cout << "  Warning: output file size limit exceeded" << endl;
				cout << "    Limit    : " << filesizeLimit << " bytes" << endl;
				cout << "    Generated: " << outputSize << " bytes" << endl;

				// Turn off randomization
				if (!downscale) {
					downscale = true;
					cout << "  Warning: enabling downscaling" << endl;
				}
				else {
					/*if (randomizeAll || scatter) {
						if (randomizeAll) {
							cout << "  Warning: changing randomization from \"on\" to \"off\"" << endl;
							randomizeAll = false;
						}
						if (scatter) {
							cout << "  Warning: changing scatter from \"on\" to \"off\"" << endl;
							scatter = false;
						}
					}
					else {*/
					// Enable alpha channel
					if (bitmask >= 3 && channelCount != 4 && image.getDefaultChannelCount() != 4) {
						channelCount = 4;
						cout << "  Warning: enabling alpha channel" << endl;
					}
					else {
						// Heuristic check if optimization should be enabled
						if (!fullOptimize && (outputSize - filesizeLimit) <= 512 * 1024) {
							cout << "  Warning: enabling optimization" << endl;
							fullOptimize = true;
						}
						else {
							// Increase bitmask
							if (bitmask < 8) {
								cout << "  Warning: increasing bitmask from \"" << (bitmask) << "\" to \"" << (bitmask + 1) << "\"" << endl;
								bitmask += 1;
								if (bitmask == 4 && channelCount == 4 && image.getDefaultChannelCount() != channelCount) {
									channelCount = image.getDefaultChannelCount();
									cout << "  Warning: disabling alpha" << endl;
								}
								if (fullOptimize) {
									fullOptimize = false;
									cout << "  Warning: disabling optimization" << endl;
								}
							}
							else {
								// Error
								cout << endl;
								cout << "  Error: output file size could not be resolved" << endl;
								cout << "    Limit  : " << filesizeLimit << " bytes" << endl;
								cout << "    Minimum: " << outputSizeMin << " bytes" << endl;
								cout << "  (note: to bypass the file size check, use \"-s 0\")" << endl;
								return -1;
							}
						}
					}
					// }
				}

				// Next
				filesizeLoop = true;
				continue;
			}
		}

		// Save
		cout << "  Saving..." << endl;
		lodepng::save_file(pngOutput, outputFile.c_str());
	}

	cout << endl << "Done" << endl;
	return 0;
}



LodePNGFilterStrategy fullOptimizeEncodeStrategies[4] = { LFS_ZERO, LFS_MINSUM, LFS_ENTROPY, LFS_BRUTE_FORCE };
std::string fullOptimizeEncodeStrategynames[4] = { "LFS_ZERO", "LFS_MINSUM", "LFS_ENTROPY", "LFS_BRUTE_FORCE" };
int fullOptimizeEncodeMinmatches[2] = { 3, 6 };

bool fullOptimizeEncode(Image* image, lodepng::State* state, std::vector<unsigned char>* pngOutput, ostream* immediateStream, ostream* statusStream, ostream* errorStream) {
	// Threading this might be cool, but it isn't used very often so...
	assert(image != NULL);
	assert(state != NULL);
	assert(pngOutput != NULL);

	pngOutput->clear();

	size_t minSize = 0;
	bool first = true;

	int best[2] = { 0 , 0 };

	state->encoder.zlibsettings.btype = 2;
	state->encoder.auto_convert = LAC_AUTO;

	if (immediateStream != NULL) {
		*immediateStream << "  Detecting best encoding type..." << endl;
	}

	for (int i = 0; i < 4; i++) { // filter strategy
		for (int j = 0; j < 2; j++) { // min match
			if (immediateStream != NULL) *immediateStream << "    " << (i * 2 + j + 1) << " / 8" << endl;
			std::vector<unsigned char> temp;
			state->encoder.filter_strategy = fullOptimizeEncodeStrategies[i];
			state->encoder.zlibsettings.minmatch = fullOptimizeEncodeMinmatches[j];
			int error = lodepng::encode(temp, *image->getPixels(), image->getWidth(), image->getHeight(), *state);

			if (error) {
				if (errorStream != NULL) {
					*errorStream << lodepng_error_text(error) << std::endl;
				}
				return false;
			}

			if (first || temp.size() < minSize) {
				minSize = temp.size();
				first = false;

				best[0] = i;
				best[1] = j;

				temp.swap(*pngOutput);
			}
		}
	}

	if (statusStream != NULL) {
		*statusStream << "    Filter strategy: " << fullOptimizeEncodeStrategynames[best[0]] << std::endl;
		*statusStream << "    Min match: " << fullOptimizeEncodeMinmatches[best[1]] << std::endl;
	}

	// Done
	return true;
}



void getImageOptimalSize(const Image* image, unsigned int bitRequirement, unsigned int bitmask, unsigned int channelCount, unsigned int metadataLength, bool scatter, bool hashmask, unsigned int* dimensionsBest) {
	assert(dimensionsBest != NULL);

	dimensionsBest[0] = image->getWidth();
	dimensionsBest[1] = image->getHeight();

	// Crappy brute force method
	int dimensions[2];
	int dimensionsTemp[2];
	dimensions[0] = image->getWidth();
	dimensions[1] = image->getHeight();
	bool i = (dimensions[1] > dimensions[0]);
	double scale = static_cast<double>(dimensions[!i]) / dimensions[i];

	for (int offset = 0; dimensions[i] - offset > 0; ++offset) {
		dimensionsTemp[i] = dimensions[i] - offset;
		dimensionsTemp[!i] = static_cast<int>(dimensions[!i] - offset * scale + 0.5); // 0.5 used for rounding

		if (bitRequirement > ImageWriter::getBitAvailability(dimensionsTemp[0], dimensionsTemp[1], channelCount, bitmask, metadataLength, scatter, hashmask)) {
			break;
		}

		dimensionsBest[0] = dimensionsTemp[0];
		dimensionsBest[1] = dimensionsTemp[1];
	}
}



bool loadSettings(bool force, cstring filename, int* filesizeLimit, bool* scatter, bool* randomizeAll, bool* hashmask, bool* upscale, bool* deband) {
	assert(filesizeLimit != NULL);
	assert(scatter != NULL);
	assert(randomizeAll != NULL);
	assert(hashmask != NULL);
	assert(upscale != NULL);
	assert(deband != NULL);

	if (!force) {
		// filename check
		unsigned int pos = 0;
		unsigned int i = 0;
		while (filename[i] != '\0') {
			if (filename[i] == '\\' || filename[i] == '/') pos = i + 1;
			++i;
		}
		cstring fname = &filename[pos];

		if (!(stricmp(fname, "_") == 0 || stricmp(fname, "_.txt") == 0 || stricmp(fname, "_.file") == 0)) return false;
	}

	std::ifstream f(filename, (std::ifstream::in | std::ifstream::binary));
	if (!f.is_open()) {
		return false;
	}
	f.close();

	*filesizeLimit = 4 * 1024 * 1024;
	*scatter = false;
	*randomizeAll = true;
	*upscale = true;
	*hashmask = true;
	*deband = true;

	return true;
}


