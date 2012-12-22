#ifndef RANDOM_H
#define RANDOM_H 1

#include "../Include.hpp"



class Random {
private:
	long long seedValue;

	int next(int bits);

public:
	Random();
	~Random();

	void seed(long long seed);

	int nextInt();

};



#endif

