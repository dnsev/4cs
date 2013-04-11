#include "Include.hpp"
#include <iostream>
#include <cstring>
#include <sstream>
#include <fstream>
#include <vector>
#include <cstdlib>
using namespace std;

#ifdef _WIN32
#define PATH_SEP "\\"
#else
#define PATH_SEP "/"
#endif



struct Sound {
	string name;
	string newname;
	unsigned int start;
	unsigned int stop;
	unsigned int header;
	unsigned long long unmaskState;
	unsigned long long mask;
	bool masked;

	Sound(string name, unsigned int start, unsigned int stop, unsigned int header, unsigned long long unmaskState, unsigned long long mask, bool masked) :
		name(name),
		newname(name),
		start(start),
		stop(stop),
		header(header),
		unmaskState(unmaskState),
		mask(mask),
		masked(masked)
	{
	}
	Sound(const Sound& other) :
		name(other.name),
		newname(other.newname),
		start(other.start),
		stop(other.stop),
		header(other.header),
		unmaskState(other.unmaskState),
		mask(other.mask),
		masked(other.masked)
	{
	}
	Sound& operator = (const Sound& other) {
		this->name = other.name;
		this->newname = other.newname;
		this->start = other.start;
		this->stop = other.stop;
		this->header = other.header;
		this->unmaskState = other.unmaskState;
		this->mask = other.mask;
		this->masked = other.masked;
		return *this;
	}
};



void extractSounds(cstring filename);
void reencode(cstring filename, vector<Sound>& sounds, vector<char>& source);
string formatFilename(string filename);
void completeSound(vector<Sound>& sounds, vector<char>& source, cstring* magicStrings, unsigned int replaceLength);



int main(int argc, char** argv) {
	// Files
	for (int i = 1; i < argc; ++i) {
		extractSounds(argv[i]);
	}

	// Done
	cout << "Done" << endl;
	return 0;
}



string formatFilename(string filename) {
	int index = 0;
	cstring ext = ".ogg";
	stringstream fname;
	fname << filename << ext;
	while (true) {
		ifstream f(fname.str().c_str(), (ifstream::in | ifstream::binary));
		if (!f.is_open()) {
			return fname.str();
		}
		f.close();

		fname.str("");
		fname << filename << "[" << (++index) << "]" << ext;
	}
}

void completeSound(vector<Sound>& sounds, vector<char>& source, cstring* magicStrings, unsigned int replaceLength) {
	Sound& s = sounds[sounds.size() - 1];

	if (s.masked) {
		unsigned int i = s.start;
		while (true) {
			source[i] = (static_cast<unsigned char>(source[i]) ^ s.mask);

			if (++i >= s.stop) break;
			s.unmaskState = (1664525 * s.unmaskState + 1013904223) & 0xFFFFFFFF;
			s.mask = s.unmaskState >> 24;
			s.unmaskState += (static_cast<unsigned char>(source[i]) ^ s.mask);
		}
	}
	else if (s.header != 0) {
		// Fix headers
		for (unsigned int i = s.start, j; i < s.stop - replaceLength; ++i) {
			for (j = 0; j < replaceLength; ++j) {
				if (source[i + j] != magicStrings[s.header][j]) break;
			}
			if (j == replaceLength) {
				// Replace
				for (j = 0; j < replaceLength; ++j) {
					source[i + j] = magicStrings[0][j];
				}
			}
		}
	}
}
void extractSounds(cstring filename) {
	ifstream f(filename, (ifstream::in | ifstream::binary));
	if (!f.is_open()) return;

	vector<char> source;
	char buffer[256];
	unsigned int len = 1;
	while (len > 0) {
		len = f.readsome(buffer, 256);
		for (unsigned int i = 0; i < len; ++i) {
			source.push_back(buffer[i]);
		}
	}
	f.close();

	// Vars
	cstring magicStrings[] = { "OggS\x00\x02" , "moot\x00\x02" , "Krni\x00\x02" };
	unsigned int magicStringsCount = 3;
	unsigned int headerLength = 6;
	unsigned int replaceLength = 4;
	bool found, masked;

	unsigned long long unmaskState = 0;
	unsigned long long mask;
	unsigned long long unmaskStateTemp;
	unsigned long long maskTemp;

	unsigned int tagMaxLength = 100;
	unsigned int tagStart = 0, tagStartMasked = 0;
	unsigned long long tagUnmaskedState = 0;
	unsigned long long tagMask;

	vector<Sound> sounds;

	// Search
	for (unsigned int i = 0, s, j; i < source.size() - headerLength; ++i) {
		// Unmasking
		unmaskState = (1664525 * unmaskState + 1013904223) & 0xFFFFFFFF;
		mask = unmaskState >> 24;
		unmaskState += (static_cast<unsigned char>(source[i]) ^ mask);

		// Tag check
		if ((static_cast<unsigned char>(source[i]) ^ mask) == static_cast<unsigned char>('[')) {
			tagStartMasked = i;
			tagUnmaskedState = unmaskState;
			tagMask = mask;
		}
		if (source[i] == '[') {
			tagStart = i;
		}

		// Header search
		found = false;
		masked = false;
		for (s = 0; s < magicStringsCount; ++s) {
			for (j = 0; j < headerLength; ++j) {
				if (source[i + j] != magicStrings[s][j]) break;
			}
			if (j == headerLength) {
				found = true;
				break;
			}
		}
		if (!found) {
			for (s = 0; s < magicStringsCount; ++s) {
				j = 0;
				unmaskStateTemp = unmaskState;
				maskTemp = mask;
				while (true) {
					if ((static_cast<unsigned char>(source[i + j]) ^ maskTemp) != static_cast<unsigned char>(magicStrings[s][j]) || ++j >= headerLength) break;
					unmaskStateTemp = (1664525 * unmaskStateTemp + 1013904223) & 0xFFFFFFFF;
					maskTemp = unmaskStateTemp >> 24;
					unmaskStateTemp += (static_cast<unsigned char>(source[i + j]) ^ maskTemp);
				}
				if (j >= headerLength) {
					found = true;
					masked = true;
					break;
				}
			}
		}
		// Found
		if (found) {
			// Get the tag
			string tag = "Name Unknown";
			if (i - (masked ? tagStartMasked : tagStart) < tagMaxLength) {
				string tagTemp = "";
				if (masked) {
					for (j = tagStartMasked + 1; j < i; ++j) {
						tagUnmaskedState = (1664525 * tagUnmaskedState + 1013904223) & 0xFFFFFFFF;
						tagMask = tagUnmaskedState >> 24;
						tagUnmaskedState += (static_cast<unsigned char>(source[j]) ^ tagMask);

						if ((static_cast<unsigned char>(source[j]) ^ tagMask) == static_cast<unsigned char>(']')) break;
						tagTemp += source[j] ^ tagMask;
					}
				}
				else {
					for (j = tagStart + 1; j < i; ++j) {
						if (source[j] == ']') break;
						tagTemp += source[j];
					}
				}
				if (j < i) tag = tagTemp;
			}

			// Complete old sound
			if (sounds.size() > 0) {
				sounds[sounds.size() - 1].stop = i;
				completeSound(sounds, source, magicStrings, replaceLength);
			}
			// New sound
			sounds.push_back(Sound(tag, i, 0, s, unmaskState, mask, masked));
			// Next
			//i += headerLength - 1;
		}
	}
	if (sounds.size() > 0) {
		sounds[sounds.size() - 1].stop = source.size();
		completeSound(sounds, source, magicStrings, replaceLength);
	}

	// Output
	cout << "Found " << sounds.size() << " sound" << (sounds.size() == 1 ? "" : "s") << endl;

	if (sounds.size() > 0) {
		// Output source files
		for (unsigned int i = 0; i < sounds.size(); ++i) {
			sounds[i].newname = formatFilename(sounds[i].name);
			cout << sounds[i].name << " -> " << sounds[i].newname << endl;
			ofstream o(sounds[i].newname.c_str(), (ofstream::out | ofstream::binary));
			if (o.is_open()) {
				o.write(&source[sounds[i].start], sounds[i].stop - sounds[i].start);
				o.close();
			}
		}

#ifdef REENCODE
		reencode(filename, sounds, source);
#endif
	}
}
void reencode(cstring filename, vector<Sound>& sounds, vector<char>& source) {
	// Re-encode
	ofstream("_", (ofstream::out | ofstream::binary)).close();

	// Exe
	string exe = "embed.exe";
	ifstream f(exe.c_str(), (ifstream::out | ifstream::binary));
	if (f.is_open()) f.close();
	else {
		exe = "..";
		exe += PATH_SEP;
		exe += "cpp";
		exe += PATH_SEP;
		exe += "embed.exe";
	}

	// Command
	string cmd;
	cmd += exe;
	cmd += " _ \"";
	cmd += filename;
	cmd += "\"";
	for (unsigned int i = 0; i < sounds.size(); ++i) {
		cmd += " \"";
		cmd += sounds[i].newname;
		cmd += "\"";
	}
	cout << "--------------------------------------------------------------------------------" << endl;
	system(cmd.c_str());
	cout << "--------------------------------------------------------------------------------" << endl;


	// Delete old sounds
	for (unsigned int i = 0; i < sounds.size(); ++i) {
		remove(sounds[i].newname.c_str());
	}
	remove("_");
}




