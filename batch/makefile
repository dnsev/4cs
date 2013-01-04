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
compile: $(BIN)batch-decode $(BIN)batch-re-encode
	@echo Executables compiled

.PHONY: clean
clean:
	@del /Q /S obj > NUL
	@xcopy src "obj\" /c /q /e /t /y > NUL
	@echo Cleaned


.PHONY: rebuild
rebuild: clean compile
	@echo Rebuilt



$(BIN)batch-decode : $(OBJ)Batch.o
	@$(CC) $(CC_FLAGS) -o $@ $^
	@echo $(BIN)batch-decode compiled

$(BIN)batch-re-encode : $(OBJ)Batch.2.o
	@$(CC) $(CC_FLAGS) -o $@ $^
	@echo $(BIN)batch-re-encode compiled

$(OBJ)Batch.o : $(SRC)Batch.cpp $(SRC)Include.hpp
	@$(CC) $(CC_CFLAGS) -o $@ $<

$(OBJ)Batch.2.o : $(SRC)Batch.cpp $(SRC)Include.hpp
	@$(CC) $(CC_CFLAGS) -DREENCODE -o $@ $<
