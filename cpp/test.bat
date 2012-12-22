@echo off
set IMAGE_FILE=d0.png
set DATA_FILE=d0.png
set EMBEDDED_FILE=d1.png
set EXTRACT_PREFIX=e-
set EMBEDER=embed.exe
set EXTRACTER=extract.exe
set EMBEDER=python ..\py\embed.py
set EXTRACTER=python ..\py\extract.py

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

goto A

:A
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 0 -S 0 -b 1
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 0 -S 0 -b 2
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 0 -S 0 -b 3
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 0 -S 0 -b 4
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 0 -S 0 -b 5
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 0 -S 0 -b 6
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 0 -S 0 -b 7
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 0 -S 0 -b 8
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL



:B
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 1 -S 0 -b 1
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 1 -S 0 -b 2
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 1 -S 0 -b 3
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 1 -S 0 -b 4
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 1 -S 0 -b 5
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 1 -S 0 -b 6
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 1 -S 0 -b 7
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 1 -S 0 -b 8
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL



:C
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 0 -S 0 -b 1
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 0 -S 0 -b 2
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 0 -S 0 -b 3
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 0 -S 0 -b 4
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 0 -S 0 -b 5
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 0 -S 0 -b 6
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 0 -S 0 -b 7
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 0 -S 0 -b 8
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL



:D
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 1 -S 0 -b 1
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 1 -S 0 -b 2
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 1 -S 0 -b 3
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 1 -S 0 -b 4
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 1 -S 0 -b 5
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 1 -S 0 -b 6
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 1 -S 0 -b 7
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 1 -S 0 -b 8
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL



:E
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 0 -S 1 -b 1
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 0 -S 1 -b 2
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 0 -S 1 -b 3
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 0 -S 1 -b 4
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 0 -S 1 -b 5
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 0 -S 1 -b 6
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 0 -S 1 -b 7
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 0 -S 1 -b 8
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL



:F
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 1 -S 1 -b 1
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 1 -S 1 -b 2
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 1 -S 1 -b 3
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 1 -S 1 -b 4
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 1 -S 1 -b 5
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 1 -S 1 -b 6
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 1 -S 1 -b 7
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 0 -a 1 -S 1 -b 8
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL



:G
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 0 -S 1 -b 1
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 0 -S 1 -b 2
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 0 -S 1 -b 3
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 0 -S 1 -b 4
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 0 -S 1 -b 5
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 0 -S 1 -b 6
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 0 -S 1 -b 7
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 0 -S 1 -b 8
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL



:H
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 1 -S 1 -b 1
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 1 -S 1 -b 2
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 1 -S 1 -b 3
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 1 -S 1 -b 4
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 1 -S 1 -b 5
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 1 -S 1 -b 6
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 1 -S 1 -b 7
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::
set EMBED=-r 1 -a 1 -S 1 -b 8
echo Testing with EMBED=%EMBED%

%EMBEDER% -s 0 -o %EMBEDDED_FILE% %IMAGE_FILE% %DATA_FILE% %EMBED% > NUL
%EXTRACTER% -p %EXTRACT_PREFIX% %EMBEDDED_FILE% > NUL
python diff.py %DATA_FILE% %EXTRACT_PREFIX%%DATA_FILE%

del /q %EMBEDDED_FILE% 2> NUL
del /q %EXTRACT_PREFIX%%DATA_FILE% 2> NUL



