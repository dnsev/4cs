@echo off

set chrome="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
set base_dir=%~dp0
set target_dir="%base_dir%4cs"

:: Setup
mkdir 4cs > nul 2> nul

:: Create
::crxmake.py %target_dir% 4cs.full.user.js 4cs.user.js manifest.json
crxmake.py %target_dir% 4cs.user.js 4cs.user.js manifest.json

:: Build
%chrome% --pack-extension=%target_dir% --pack-extension-key=%target_dir%.pem --no-message-box || echo some error occured
:: || %chrome% --pack-extension=%target_dir% --no-message-box

:: Done
rmdir /S /Q %target_dir% > nul 2> nul
