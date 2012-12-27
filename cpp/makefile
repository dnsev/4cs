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
compile: $(BIN)embed $(BIN)extract
	@echo Both executables compiled

.PHONY: clean
clean:
	@del /Q /S obj > NUL
	@xcopy src "obj\" /c /q /e /t /y > NUL
	@echo Cleaned


.PHONY: rebuild
rebuild: clean compile
	@echo Rebuilt



$(BIN)embed : $(OBJ)Embed.o $(OBJ)ImgLib/Image.o $(OBJ)ImgLib/ImageWriter.o $(OBJ)LodePNG/lodepng.o $(SRC)JPEG/jpgd.o $(OBJ)ImgLib/ImageHashmasker.o $(OBJ)Random/Random.o
	@$(CC) $(CC_FLAGS) -o $@ $^
	@echo $(BIN)embed compiled

$(BIN)extract : $(OBJ)Extract.o $(OBJ)ImgLib/Image.o $(OBJ)ImgLib/ImageReader.o $(OBJ)LodePNG/lodepng.o $(SRC)JPEG/jpgd.o $(OBJ)ImgLib/ImageHashmasker.o
	@$(CC) $(CC_FLAGS) -o $@ $^
	@echo $(BIN)extract compiled


$(OBJ)Embed.o : $(SRC)Embed.cpp $(SRC)Include.hpp $(SRC)LodePNG/lodepng.h
	@$(CC) $(CC_CFLAGS) -o $@ $<

$(OBJ)Extract.o : $(SRC)Extract.cpp $(SRC)Include.hpp $(SRC)LodePNG/lodepng.h
	@$(CC) $(CC_CFLAGS) -o $@ $<

$(OBJ)ImgLib/Image.o : $(SRC)ImgLib/Image.cpp $(SRC)ImgLib/Image.hpp $(SRC)Include.hpp $(SRC)LodePNG/lodepng.h $(SRC)JPEG/jpgd.h
	@$(CC) $(CC_CFLAGS) -o $@ $<

$(OBJ)ImgLib/ImageReader.o : $(SRC)ImgLib/ImageReader.cpp $(SRC)ImgLib/ImageReader.hpp $(SRC)Include.hpp
	@$(CC) $(CC_CFLAGS) -o $@ $<

$(OBJ)ImgLib/ImageWriter.o : $(SRC)ImgLib/ImageWriter.cpp $(SRC)ImgLib/ImageWriter.hpp $(SRC)Include.hpp $(SRC)Random/Random.hpp
	@$(CC) $(CC_CFLAGS) -o $@ $<

$(OBJ)ImgLib/ImageHashmasker.o : $(SRC)ImgLib/ImageHashmasker.cpp $(SRC)ImgLib/ImageHashmasker.hpp $(SRC)Include.hpp
	@$(CC) $(CC_CFLAGS) -o $@ $<


$(OBJ)LodePNG/lodepng.o : $(SRC)LodePNG/lodepng.cpp $(SRC)LodePNG/lodepng.h
	@$(CC) $(CC_CFLAGS) -o $@ $<


$(OBJ)JPEG/jpgd.o : $(SRC)JPEG/jpgd.cpp $(SRC)JPEG/jpgd.h
	@$(CC) $(CC_CFLAGS) -o $@ $<

$(OBJ)JPEG/jpge.o : $(SRC)JPEG/jpge.cpp $(SRC)JPEG/jpge.h
	@$(CC) $(CC_CFLAGS) -o $@ $<


$(OBJ)Random/Random.o : $(SRC)Random/Random.cpp $(SRC)Random/Random.hpp $(SRC)Include.hpp
	@$(CC) $(CC_CFLAGS) -o $@ $<

