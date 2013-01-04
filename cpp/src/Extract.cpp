#include "Include.hpp"
#include <iostream>
#include <cstring>
#include <sstream>
#include <vector>
#include "ImgLib/Image.hpp"
#include "ImgLib/ImageReader.hpp"
#include "LodePNG/lodepng.h"
#define EXTRACT_VERSION "1.0b"
using namespace std;
using namespace ImgLib;




int main(int argc, char** argv) {
	// Settings
	string outputPrefix = "";
	string outputSuffix = "-extracted";
	vector<cstring> files;
	bool setPrefixSuffix = false;
	bool version = false;

	// Read params
	bool canFlag = true;
	for (int i = 1; i < argc; ++i) {
		if (canFlag && argv[i][0] == '-') {
			if (strcmp(argv[i], "--") == 0) {
				canFlag = false;
			}
			else if (strcmp(argv[i], "-p") == 0 || strcmp(argv[i], "-pre") == 0 || strcmp(argv[i], "-prefix") == 0) {
				if (++i >= argc) break;
				outputPrefix = argv[i];
				if (!setPrefixSuffix) {
					setPrefixSuffix = true;
					outputSuffix = "";
				}
			}
			else if (strcmp(argv[i], "-s") == 0 || strcmp(argv[i], "-suf") == 0 || strcmp(argv[i], "-suffix") == 0) {
				if (++i >= argc) break;
				outputSuffix = argv[i];
				if (!setPrefixSuffix) {
					setPrefixSuffix = true;
					outputPrefix = "";
				}
			}
			else if (argv[i][1] == 'v' && argv[i][2] == '\0') {
				version = true;
			}
			else if (argv[i][1] == 'V' && argv[i][2] == '\0') {
				version = false;
			}
			else {
				cout << "Warning: unknown flag \"" << argv[i] << "\"" << endl;
			}
		}
		else {
			files.push_back(argv[i]);
		}
	}

	// Version
	if (version) {
		cout << EXTRACT_VERSION << endl;
		return 0;
	}

	// Usage
	if (files.size() == 0) {
		cout << "Usage:" << endl;
		cout << "    " << argv[0] << " [-p ...] [-s ...] image.png ..." << endl;
		cout << "" << endl;
		cout << "    -p prefix : set the prefix of the filenames to be extracted" << endl;
		cout << "              : default prefix is \"\"" << endl;
		cout << "" << endl;
		cout << "    -s suffix : set the suffix of the filenames to be extracted" << endl;
		cout << "              : default suffix is \"-extracted\"" << endl;
		cout << "" << endl;
		cout << "    image.png : the file to extract data from" << endl;
		cout << "              : can also be a list of images" << endl;
		cout << "" << endl;
		cout << "" << endl;
		cout << "    Also note, placing a \"--\" parameter causes any remaining parameters to be treated as files" << endl;
		cout << "" << endl;

		return -1;
	}

	for (unsigned int i = 0; i < files.size(); ++i) {
		// Load image
		cout << "Loading image..." << endl;
		std::vector<unsigned char> pngFile;
		lodepng::load_file(pngFile, files[i]);

		// Decode
		cout << "Decoding image..." << endl;
		Image image;
		stringstream errorStream;
		if (!image.loadFromSource(&pngFile, true, 0, &errorStream)) {
			cout << "Error decoding image file \"" << files[i] << "\":" << endl;
			cout << "  " << errorStream.str() << endl;
			return -1;
		}

		// Done
		pngFile.clear();

		// About
		cout << "  Image contains " << image.getChannelCount() << " channels" << endl;
		// TODO : ensure prefix directory exists

		// Extract data
		cout << "Extracting..." << endl;
		ImageReader ir(&image);
		int result = ir.unpack(outputPrefix.c_str(), outputSuffix.c_str());
		if (result < 0) {
			cout << "Error extracting: image likely doesn't contain data" << endl;
			return -1;
		}
	}

	// Done
	cout << "Done" << endl;
	return 0;
}



