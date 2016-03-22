@echo off
echo starting j3 app.....
echo changing directory...
cd C:\xampp
echo starting apache server
start apache_start.bat
echo starting mysql server
start mysql_start.bat
echo starting chrome..
start chrome.exe localhost/j3/