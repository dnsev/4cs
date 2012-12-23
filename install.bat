@echo off

set done_name=DELETE_ME.bat

if %0==%done_name% (

echo Already installed
echo This file can be deleted

) else (
cd install
cd pypng

python setup.py install

cd ..
cd ..
move %0 %done_name%
)

