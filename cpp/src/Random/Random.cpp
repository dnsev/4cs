#include "Random.hpp"
#include <sys/time.h>
#include <cassert>



Random :: Random() :
	seedValue(0)
{
	struct timezone zone;
	struct timeval time;
	gettimeofday(&time, &zone);

	this->seed(static_cast<int>(time.tv_sec + time.tv_usec * 1.0e-6));
}
Random :: ~Random() {
}
int Random :: next(int bits) {
	assert(bits >= 0);
	assert(bits <= 32);

	this->seedValue = (this->seedValue * 0x5DEECE66DLL + 0xBLL) & ((1LL << 48) - 1);
    return static_cast<int>(static_cast<unsigned long long>(this->seedValue) >> (48 - bits));
}
void Random :: seed(long long seed) {
	this->seedValue = (seed ^ 0x00000000DEECEF00LL) & 0x00000000FFFFFFFFLL;
}

int Random :: nextInt() {
	return this->next(31);
}