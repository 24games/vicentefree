@echo off
cd /d %~dp0
start http://localhost:5173/landing-page.html
timeout /t 2
start http://localhost:5173/



