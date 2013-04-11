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
compile: $(BIN)bigger
	@echo Executable compiled

.PHONY: clean
clean:
	@del /Q /S obj > NUL
	@xcopy src "obj\" /c /q /e /t /y > NUL
	@echo Cleaned


.PHONY: rebuild
rebuild: clean compile
	@echo Rebuilt



$(BIN)bigger : $(OBJ)Bigger.o $(OBJ)ImgLib/Image.o $(OBJ)LodePNG/lodepng.o $(OBJ)JPEG/jpgd.o $(OBJ)JPEG/jpge.o $(OBJ)stb_image/stb_image.o $(OBJ)Sound/Sound.o
	@$(CC) $(CC_FLAGS) -o $@ $^


$(OBJ)Bigger.o : $(SRC)Bigger.cpp $(SRC)Include.hpp $(SRC)LodePNG/lodepng.h
	@$(CC) $(CC_CFLAGS) -o $@ $<

$(OBJ)ImgLib/Image.o : $(SRC)ImgLib/Image.cpp $(SRC)ImgLib/Image.hpp $(SRC)Include.hpp $(SRC)LodePNG/lodepng.h $(SRC)JPEG/jpgd.h $(SRC)JPEG/jpge.h $(SRC)stb_image/stb_image.c
	@$(CC) $(CC_CFLAGS) -o $@ $<

$(OBJ)Sound/Sound.o : $(SRC)Sound/Sound.cpp $(SRC)Sound/Sound.hpp
	@$(CC) $(CC_CFLAGS) -o $@ $<



$(OBJ)LodePNG/lodepng.o : $(SRC)LodePNG/lodepng.cpp $(SRC)LodePNG/lodepng.h
	@$(CC) $(CC_CFLAGS) -o $@ $<


$(OBJ)stb_image/stb_image.o : $(SRC)stb_image/stb_image.c
	@$(CC) $(CC_CFLAGS) -o $@ $< -DSTBI_NO_STDIO


$(OBJ)JPEG/jpgd.o : $(SRC)JPEG/jpgd.cpp $(SRC)JPEG/jpgd.h
	@$(CC) $(CC_CFLAGS) -o $@ $<

$(OBJ)JPEG/jpge.o : $(SRC)JPEG/jpge.cpp $(SRC)JPEG/jpge.h
	@$(CC) $(CC_CFLAGS) -o $@ $<

