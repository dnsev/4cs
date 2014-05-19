#include <iostream>
#include <fstream>
#include <sstream>
#include <cstring>
#include <string>
#include <vector>
#include <cstdlib>
#include <cassert>
using namespace std;



string getExtension(const string& str) {
	for (int i = str.length() - 1; i >= 0; --i) {
		if (str[i] == '.') {
			return str.substr(i, str.length() - i);
		}
	}

	return "";
}
string toLowerCase(const string& str) {
	string str2 = str;

	for (unsigned int i = 0; i < str2.length(); ++i) {
		if (str2[i] >= 'A' && str2[i] <= 'Z') str2[i] += 'A' - 'a';
	}

	return str2;
}
void clean(const string* tempAudioFile, const vector<int>* sounds) {
	if (tempAudioFile != NULL) remove(tempAudioFile->c_str());
	if (sounds != NULL) {
		for (unsigned int i = 0; i < sounds->size(); ++i) {
			stringstream temp;
			temp << "temp." << i << ".ogg";
			remove(temp.str().c_str());
		}
	}
}



int main(int argc, char** argv) {
	size_t maxOutputSize = 1024 * 1024 * 4;
	bool bestQuality = true;

	// Arguments
	if (argc <= 1) {
		cerr << "Usage:" << endl << endl;
		cerr << "  " << argv[0] << " audio_file image_file" << endl << endl;

		return -1;
	}

	// Find files
	vector<int> sounds;
	int imageFile = -1;
	string ext;
	for (int i = 1; i < argc; ++i) {
		if (strcmp(argv[i], "-fast") == 0) {
			bestQuality = false;
			continue;
		}

		ext = toLowerCase(getExtension(argv[i]));
		if (ext == ".jpg" || ext == ".jpeg" || ext == ".gif" || ext == ".png" || ext == ".webm") {
			if (imageFile < 0) {
				imageFile = i;
			}
			else {
				cout << "Warning: multiple images detected." << endl;
			}
		}
		else {
			sounds.push_back(i);
		}
	}

	// Errors
	if (sounds.size() <= 0) {
		cerr << "Error: no sounds detected." << endl;
		return -1;
	}
	if (imageFile < 0) {
		cerr << "Error: no image detected." << endl;
		return -1;
	}

	// Get the image file size
	ifstream f(argv[imageFile], ifstream::in | ifstream::binary);
	if (!f.is_open()) {
		cerr << "Error: couldn't open \"" << argv[imageFile] << "\"" << endl;
		return -1;
	}
	f.seekg(0, ifstream::end);
	size_t imageSize = f.tellg();
	f.close();

	// Size error
	if (imageSize >= maxOutputSize) {
		cerr << "Image is to large to fit sounds." << endl;
		return 0;
	}

	// Temp file removal
	string tempLogFile = "nul";
	string tempAudioFile = "out.ogg";
	f.open(tempAudioFile.c_str(), ifstream::in | ifstream::binary);
	if (f.is_open()) {
		f.close();
		remove(tempAudioFile.c_str());
	}

	// Output stuff
	unsigned int maxTagLength = 100;
	vector<size_t> soundSizes;
	vector<string> soundTags;
	vector<bool> canQualityGain;
	for (unsigned int i = 0; i < sounds.size(); ++i) {
		soundSizes.push_back(0);
		canQualityGain.push_back(true);
		soundTags.push_back(argv[sounds[i]]);
		ext = getExtension(soundTags[i]);
		soundTags[i] = soundTags[i].substr(0, soundTags[i].length() - ext.length());
		int j = soundTags[i].length() - 1;
		for (; j >= 0; --j) {
			if (soundTags[i][j] == '\\' || soundTags[i][j] == '/') break;
		}
		if (j >= 0) soundTags[i] = soundTags[i].substr(j + 1, soundTags[i].length() - (j + 1));
		if (soundTags[i].length() > maxTagLength - 2) soundTags[i] = soundTags[i].substr(0, maxTagLength - 2);
		soundTags[i].insert(0, "[");
		soundTags[i] += "]";
	}

	// Encode files
	stringstream cmd;
	char buffer[512];
	bool qualityMinimized = false;
	bool qualityIncreased = false;

	for (int quality = 0; quality <= 10; ++quality) {
		unsigned int i;
		unsigned int soundsFit = 0;
		for (i = 0; i < sounds.size(); ++i) {
			// Build command
			cmd.str("");
			cmd << "ffmpeg -y -nostdin -i \""
				<< argv[sounds[i]]
				<< "\" -vn"
				<< " -acodec libvorbis -aq "
				<< (quality < 0 ? 0 : quality);
			if (quality < 0) cmd << " -ac 1";
			cmd << " -map_metadata -1 \""
				<< tempAudioFile
				<< "\" >> \""
				<< tempLogFile
				<< "\" 2>&1";

			// Execute
			FILE* stream = popen(cmd.str().c_str(), "r");
			if (stream == NULL) {
				cerr << "Error: could not execute ffmpeg" << endl;
				clean(&tempAudioFile, &sounds);
				return -1;
			}
			cout << "Encoding \"" << argv[sounds[i]] << "\" @ quality=" << (quality < 0 ? 0 : quality);
			if (quality < 0) cout << "/mono";
			cout << "..." << endl;
			while (fgets(buffer, sizeof(buffer), stream) != NULL);
			pclose(stream);

			// File size
			f.open(tempAudioFile.c_str(), ifstream::in | ifstream::binary);
			if (!f.is_open()) {
				cerr << "Error: encoding failed" << endl;
				clean(&tempAudioFile, &sounds);
				return -1;
			}
			f.seekg(0, ifstream::end);
			size_t fileSize = f.tellg();
			f.close();
			if (fileSize <= 0) {
				cout << "Encoding failed" << endl << endl;
			}
			else {
				cout << "Encoding completed" << endl;

				// Check if fittable
				size_t space = maxOutputSize - imageSize;
				for (unsigned int j = 0; j < sounds.size(); ++j) {
					assert(soundSizes[j] + soundTags[j].length() <= space);
					space -= soundSizes[j] + soundTags[j].length();
				}

				// It doesn't...
				if (fileSize + soundTags[i].length() > space) {
					// Minimize quality (if the quality hasn't already been increased)
					if (!qualityIncreased) {
						if (!qualityMinimized) {
							// Quality minimize
							for (unsigned int j = 0; j < sounds.size(); ++j) {
								soundSizes[j] = 0;
							}
							soundsFit = 0;
							quality -= 2;
							qualityMinimized = (quality < -1);
							cout << "Quality decreased" << endl << endl;
							break;
						}
						else {
							// Can't fit
							cout << "Warning: sound file \"" << argv[sounds[i]] << "\" cannot be fit." << endl;
						}
					}
				}
				// It does
				else {
					// Fit okay
					soundSizes[i] = fileSize;
					++soundsFit;

					// Move temp file
					stringstream temp;
					temp << "temp." << i << ".ogg";
					remove(temp.str().c_str());
					rename(tempAudioFile.c_str(), temp.str().c_str());
				}
			}
		}

		// No breakout?
		if (i == sounds.size()) {
			qualityIncreased = true;
			if (!(bestQuality && soundsFit == sounds.size()) || (qualityMinimized && sounds.size() == 1)) break;
			cout << "Quality increased" << endl << endl;
		}
	}

	cout << endl;

	// Encode to the final image
	unsigned int totalSounds = 0;
	for (unsigned int j = 0; j < sounds.size(); ++j) {
		if (soundSizes[j] > 0) ++totalSounds;
	}
	if (totalSounds > 0) {
		cout << "Encoding image..." << endl;

		// 1: Get new filename
		ext = toLowerCase(getExtension(argv[imageFile]));
		string outputFilename = argv[imageFile];
		outputFilename = outputFilename.substr(0, outputFilename.length() - ext.length());
		outputFilename += "-embed";
		outputFilename += ext;

		ofstream out(outputFilename.c_str(), ifstream::out | ifstream::binary);
		if (!out.is_open()) {
			cerr << "Error: couldn't open \"" << outputFilename.c_str() << "\" for writing" << endl;
			clean(&tempAudioFile, &sounds);
			return -1;
		}

		// 2: Copy image source + hash
		unsigned long long unmaskState = 0;
		int mask;
		size_t count;
		f.open(argv[imageFile], ifstream::in | ifstream::binary);
		if (!f.is_open()) {
			cerr << "Error: couldn't open \"" << argv[imageFile] << "\"" << endl;
			clean(&tempAudioFile, &sounds);
			return -1;
		}
		while ((count = f.readsome(buffer, sizeof(buffer))) > 0) {
			out.write(buffer, count);

			// Hash
			for (unsigned int i = 0; i < count; ++i) {
				unmaskState = (1664525 * unmaskState + 1013904223) & 0xFFFFFFFF;
				mask = (unmaskState >> 24) & 0xFF;
				unmaskState += static_cast<unsigned int>(static_cast<unsigned char>(buffer[i] ^ mask));
			}
		}
		f.close();

		// 4: Add the sounds
		for (unsigned int j = 0; j < sounds.size(); ++j) {
			if (soundSizes[j] <= 0) continue;

			// Open file
			stringstream temp;
			temp << "temp." << j << ".ogg";
			f.open(temp.str().c_str(), ifstream::in | ifstream::binary);
			if (!f.is_open()) {
				cerr << "Error: couldn't open \"" << temp.str().c_str() << "\"" << endl;
				clean(&tempAudioFile, &sounds);
				return -1;
			}

			// Encode the key
			for (unsigned int i = 0; i < soundTags[j].length(); ++i) {
				unmaskState = (1664525 * unmaskState + 1013904223) & 0xFFFFFFFF;
				mask = (unmaskState >> 24) & 0xFF;
				unmaskState += static_cast<unsigned int>(static_cast<unsigned char>(soundTags[j][i]));
				soundTags[j][i] = (soundTags[j][i] ^ mask);
			}
			// Write
			out.write(soundTags[j].c_str(), soundTags[j].length());

			// Encode data
			while ((count = f.readsome(buffer, sizeof(buffer))) > 0) {
				// Hash
				for (unsigned int i = 0; i < count; ++i) {
					unmaskState = (1664525 * unmaskState + 1013904223) & 0xFFFFFFFF;
					mask = (unmaskState >> 24) & 0xFF;
					unmaskState += static_cast<unsigned int>(static_cast<unsigned char>(buffer[i]));
					buffer[i] = (buffer[i] ^ mask);
				}
				// Write
				out.write(buffer, count);
			}
			
			// Close
			f.close();
		}

		// Done
		out.close();
	}

	// Remove temp files
	clean(&tempAudioFile, &sounds);

	// Done
	return 0;
}


