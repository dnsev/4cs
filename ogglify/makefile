SRC = src/
OBJ = obj/
BIN = ./
CC = g++
CC_FLAGS = -Wall -O3 -DNDEBUG -static
CC_CFLAGS = -Wall -O3 -DNDEBUG -static -c
#CC_FLAGS = -Wall -g
#CC_CFLAGS = -Wall -g -c
CC = g++


.PHONY: compile
compile: $(BIN)ogglify
	@echo Executable compiled

.PHONY: clean
clean:
	@del /Q /S obj > NUL
	@xcopy src "obj\" /c /q /e /t /y > NUL
	@echo Cleaned


.PHONY: rebuild
rebuild: clean compile
	@echo Rebuilt



$(BIN)ogglify : $(OBJ)SoundEmbedder.o
	@$(CC) $(CC_FLAGS) -o $@ $^

$(OBJ)SoundEmbedder.o : $(SRC)SoundEmbedder.cpp
	@$(CC) $(CC_CFLAGS) -o $@ $<
