#include "../Include.hpp"
#include <iostream>
#include <cstring>
#include <sstream>
#include <fstream>
#include <vector>
#include <cstdlib>

#ifdef _WIN32
#define PATH_SEP "\\"
#else
#define PATH_SEP "/"
#endif



struct Sound {
	std::string name;
	std::string newname;
	unsigned int first;
	unsigned int start;
	unsigned int stop;
	unsigned int header;
	unsigned long long unmaskState;
	unsigned long long mask;
	bool masked;

	Sound(std::string name, unsigned int first, unsigned int start, unsigned int stop, unsigned int header, unsigned long long unmaskState, unsigned long long mask, bool masked);
	Sound(const Sound& other);
	Sound& operator = (const Sound& other);

	static std::vector<Sound>* extractSounds(std::vector<unsigned char>& source, bool& usingUpToDateFormat);
};




