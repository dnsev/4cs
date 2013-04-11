#include "Sound.hpp"

using namespace std;


Sound :: Sound(string name, unsigned int first, unsigned int start, unsigned int stop, unsigned int header, unsigned long long unmaskState, unsigned long long mask, bool masked) :
	name(name),
	newname(name),
	first(first),
	start(start),
	stop(stop),
	header(header),
	unmaskState(unmaskState),
	mask(mask),
	masked(masked)
{
}
Sound :: Sound(const Sound& other) :
	name(other.name),
	newname(other.newname),
	first(other.first),
	start(other.start),
	stop(other.stop),
	header(other.header),
	unmaskState(other.unmaskState),
	mask(other.mask),
	masked(other.masked)
{
}
Sound& Sound :: operator = (const Sound& other) {
	this->name = other.name;
	this->newname = other.newname;
	this->first = other.first;
	this->start = other.start;
	this->stop = other.stop;
	this->header = other.header;
	this->unmaskState = other.unmaskState;
	this->mask = other.mask;
	this->masked = other.masked;
	return *this;
}


void completeSound(vector<Sound>& sounds, vector<unsigned char>& source, cstring* magicStrings, unsigned int replaceLength) {
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


vector<Sound>* Sound :: extractSounds(vector<unsigned char>& source, bool& usingUpToDateFormat) {
	usingUpToDateFormat = true;

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

	vector<Sound>* sounds = new vector<Sound>();

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
				usingUpToDateFormat = false; // not masked
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
					if (s != 0) usingUpToDateFormat = false; // wrong header
					found = true;
					masked = true;
					break;
				}
			}
		}
		// Found
		if (found) {
			// Get the tag
			string tag = "Tag Unknown";
			unsigned int st = (masked ? tagStartMasked : tagStart);
			if (i - st < tagMaxLength) {
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
			else {
				st = i;
			}

			// Complete old sound
			if (sounds->size() > 0) {
				(*sounds)[sounds->size() - 1].stop = st;
				completeSound(*sounds, source, magicStrings, replaceLength);
			}
			// New sound
			sounds->push_back(Sound(tag, st, i, 0, s, unmaskState, mask, masked));
		}
	}
	if (sounds->size() > 0) {
		(*sounds)[sounds->size() - 1].stop = source.size();
		completeSound(*sounds, source, magicStrings, replaceLength);
	}

	return sounds;
}




