#include "Include.hpp"
#include <iostream>
#include <cstdlib>
#include <string>
#include <vector>
#include <cmath>
#include "ImgLib/Image.hpp"
#include "LodePNG/lodepng.h"
#include "Sound/Sound.hpp"

using namespace std;
using namespace ImgLib;



vector<unsigned char>* encode(const vector<unsigned char>* source, const vector<unsigned char>* soundSource, const vector<Sound>* sounds, bool reEncode);

int main(int argc, char** argv) {
	// Usage
	if (argc <= 1) {
		cout << "Usage: " << endl;
		cout << argv[0] << " image1 image2 image3 ..." << endl;
		return -1;
	}

	// Find size
	int i = 0;
	int w = 800, h = 800;
	string s = "";
	for (; argv[0][i] != '\0'; ++i) {
		if (argv[0][i] <= 32) {
			if (s.length() <= 0) continue;
			break;
		}

		if (argv[0][i] >= '0' && argv[0][i] <= '9') {
			s += argv[0][i];
		}
		else {
			break;
		}
	}
	if (s.length() > 0) {
		w = atoi(s.c_str());
		h = w;
		if (argv[0][i] != '\0') ++i;
	}
	s = "";
	for (; argv[0][i] != '\0'; ++i) {
		if (argv[0][i] <= 32) {
			if (s.length() <= 0) continue;
			break;
		}

		if (argv[0][i] >= '0' && argv[0][i] <= '9') {
			s += argv[0][i];
		}
		else {
			break;
		}
	}
	if (s.length() > 0) {
		h = atoi(s.c_str());
	}
	unsigned int targetSize = w * h;

	// File size limit
	int fileSizeLimit = 1024 * 1024 * 3; // 3MB

	// Iterate
	for (i = 1; i < argc; ++i) {
		// Name
		string imageFile = argv[i];
		string outputFile = imageFile;
		string outputFileFixed = imageFile;

		int pos = outputFile.length();
		while (--pos >= 0 && outputFile[pos] != '.');
		if (pos < 0) pos = outputFile.length();
		outputFile.insert(pos, "-bigger");

/*		pos = outputFileFixed.length();
		while (--pos >= 0 && outputFileFixed[pos] != '.');
		if (pos < 0) pos = outputFileFixed.length();
		outputFileFixed.insert(pos, "-fixed");*/

		// Load image
		pos = imageFile.length();
		ImgLib::Image::ImageType imageType = ImgLib::Image::JPEG;
		if (imageFile.length() >= 4 && imageFile[pos - 4] == '.') {
			if ((imageFile[pos - 3] & 0xDF) == 'P' && (imageFile[pos - 2] & 0xDF) == 'N' && (imageFile[pos - 1] & 0xDF) == 'G') {
				imageType = ImgLib::Image::PNG;
			}
			else if ((imageFile[pos - 3] & 0xDF) == 'G' && (imageFile[pos - 2] & 0xDF) == 'I' && (imageFile[pos - 1] & 0xDF) == 'F') {
				imageType = ImgLib::Image::GIF;
			}
		}

		// Load
		cout << "Loading image \"" << argv[i] << "\"..." << endl;
		std::vector<unsigned char> imageSrc;
		lodepng::load_file(imageSrc, argv[i]);

		// Extract
		bool upToDate = false;
		vector<Sound>* sounds = Sound::extractSounds(imageSrc, upToDate);
		if (sounds->size() == 0) {
			cout << "  No sound detected" << endl;
		}
		else {
			cout << "  " << sounds->size() << " sound" << (sounds->size() == 1 ? "" : "s") << " detected" << endl;
			if (imageType == ImgLib::Image::GIF) {
				cout << "  Skipping .gif image \"" << argv[i] << "\"..." << endl;
			}
			else {
				// Convert
				Image img;
				bool loaded = img.loadFromSource(&imageSrc, imageType, 0, NULL);
				if (loaded) {
					if (img.getWidth() * img.getHeight() < targetSize) {
						double targetScale = sqrt(static_cast<double>(targetSize) / (img.getWidth() * img.getHeight()));
						int targetWidth = static_cast<int>(ceil(img.getWidth() * targetScale));
						int targetHeight = static_cast<int>(ceil(img.getHeight() * targetScale));
						unsigned int requiredSpace = fileSizeLimit - (imageSrc.size() - (*sounds)[0].first);

						cout << "  Upscaling..." << endl;
						cout << "  Factor: " << targetScale << endl;
						cout << "  Target: " << targetWidth << "x" << targetHeight << endl;

						img.upscale(targetWidth, targetHeight);

						// Encode
						bool lossy = (imageType == ImgLib::Image::JPEG);
						std::vector<unsigned char>* imageTargetGood = NULL;
						int quality = 85;
						int qualityDecrease = 5;
						int qualityIncrease = 1;
						bool qualityIncreaseAllowed = false; // disabled
						while (true) {
							std::vector<unsigned char>* imageTarget = new std::vector<unsigned char>();

							if (lossy) {
								jpge::params p;
								p.m_quality = quality;

								img.saveToVectorJpeg(imageTarget, &p, NULL);
							}
							else {
								lodepng::State state;
								state.encoder.filter_palette_zero = 0;
								state.encoder.add_id = false;
								state.encoder.text_compression = 1;
								state.encoder.zlibsettings.nicematch = 258;
								state.encoder.zlibsettings.lazymatching = 1;
								state.encoder.zlibsettings.windowsize = 32768;
								state.encoder.zlibsettings.btype = 2;
								state.encoder.auto_convert = LAC_AUTO;

								img.saveToVector(imageTarget, &state, NULL);
							}

							bool exit = false;
							if (imageTarget->size() <= requiredSpace || (exit = (lossy && quality <= 1))) {
								// Delete old
								if (imageTargetGood != NULL) delete imageTargetGood;

								// New
								imageTargetGood = imageTarget;
								if (exit || !qualityIncreaseAllowed) break;

								// Increase quality
								cout << "  Increasing quality..." << endl;
								if (lossy) {
									if (quality < 100) {
										quality += qualityIncrease;
										if (quality > 100) quality = 100;
									}
									else {
										if (imageType == ImgLib::Image::JPEG) break; // Don't make jpegs lossless
										lossy = false;
									}
								}
								else {
									// Max quality
									break;
								}
								continue;
							}
							else if (imageTargetGood != NULL) {
								break;
							}

							// Decrease quality
							cout << "  Decreasing quality..." << endl;
							if (imageTarget != imageTargetGood) {
								delete imageTarget;
							}
							if (lossy) {
								quality -= qualityDecrease;
								if (quality < 1) quality = 1;
							}
							else {
								lossy = true;
							}
						}

						// Save
						cout << "  Saving..." << endl;
						if (lossy) {
							if (imageType != ImgLib::Image::JPEG) {
								pos = outputFile.length();
								while (--pos >= 0 && outputFile[pos] != '.');
								if (pos >= 0) outputFile.erase(pos, outputFile.length() - pos);
								outputFile += ".jpg";
							}
						}
						else {
							if (imageType != ImgLib::Image::PNG) {
								pos = outputFile.length();
								while (--pos >= 0 && outputFile[pos] != '.');
								if (pos >= 0) outputFile.erase(pos, outputFile.length() - pos);
								outputFile += ".png";
							}
						}
						vector<unsigned char>* final = encode(imageTargetGood, &imageSrc, sounds, false);
						lodepng::save_file(*final, outputFile.c_str());
						delete final;
					}
					else {
						cout << "  Upscale not needed" << endl;
					}
				}
				else {
					cout << "  Image could not be loaded" << endl;
				}
			}

			if (!upToDate) {
				// Re-encode
				cout << "  Bringing file format up to date..." << endl;
				vector<unsigned char>* src = encode(&imageSrc, &imageSrc, sounds, true);
				cout << "  Saving..." << endl;
				lodepng::save_file(*src, imageFile.c_str());
				delete src;
			}
		}

		delete sounds;
		cout << endl;
	}

	// Done
	return 0;
}



vector<unsigned char>* encode(const vector<unsigned char>* source, const vector<unsigned char>* soundSource, const vector<Sound>* sounds, bool reEncode) {
	vector<unsigned char>* out = new vector<unsigned char>();

	// Image
	unsigned long long unmaskState = 0;
	unsigned long long mask;
	unsigned int len = (reEncode ? (*sounds)[0].first : source->size());
	unsigned int pos = 0;
	for (; pos < len; ++pos) {
		unmaskState = (1664525 * unmaskState + 1013904223) & 0xFFFFFFFF;
		mask = unmaskState >> 24;
		unmaskState += (*source)[pos] ^ mask;//(static_cast<unsigned char>(source[i]) ^ mask);

		if (out->size() <= pos) out->resize(out->size() == 0 ? 1 : out->size() * 2);
		(*out)[pos] = (*source)[pos];
	}

	// Sounds
	vector<unsigned char> soundArray((source->size() - (*sounds)[0].first), 0);
	unsigned int j = 0;
	for (unsigned int i = 0; i < sounds->size(); ++i) {
		// Blank tag
		string name = (*sounds)[i].name;
		if (name.length() == 0) name = "Tag Unknown";

		// Tag
		while (soundArray.size() <= j + name.length() + 2) soundArray.resize(soundArray.size() == 0 ? 1 : soundArray.size() * 2);
		soundArray[j++] = '[';
		for (unsigned int k = 0; k < name.length(); ++k) {
			soundArray[j++] = name[k];
		}
		soundArray[j++] = ']';

		// Sound
		for (unsigned int k = (*sounds)[i].start; k < (*sounds)[i].stop; ++k) {
			if (soundArray.size() <= j) soundArray.resize(soundArray.size() == 0 ? 1 : soundArray.size() * 2);
			soundArray[j++] = (*soundSource)[k];
		}
	}

	// Masked
	for (unsigned int i = 0; i < j; ++i) {
		unmaskState = (1664525 * unmaskState + 1013904223) & 0xFFFFFFFF;
		mask = unmaskState >> 24;
		unmaskState += soundArray[i];

		if (out->size() <= pos) out->resize(out->size() == 0 ? 1 : out->size() * 2);
		(*out)[pos++] = soundArray[i] ^ mask;
	}

	// Done
	out->resize(pos);
	return out;
}


