@echo off
echo ========================================
echo MySQL Database Initialization Script
echo ========================================
echo.
echo This script will initialize the ecommerce database.
echo Please make sure MySQL is running on localhost:3306
echo.
echo Default credentials:
echo - Host: localhost
echo - Port: 3306
echo - User: root
echo - Password: (empty or enter your password)
echo.
pause

echo.
echo Attempting to connect to MySQL and run init-db.sql...
echo.

REM Try to find MySQL in common installation paths
set MYSQL_PATH=

if exist "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" (
    set MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe
) else if exist "C:\Program Files\MySQL\MySQL Server 5.7\bin\mysql.exe" (
    set MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 5.7\bin\mysql.exe
) else if exist "C:\xampp\mysql\bin\mysql.exe" (
    set MYSQL_PATH=C:\xampp\mysql\bin\mysql.exe
) else (
    echo MySQL not found in common paths.
    echo Please run the following command manually in MySQL Workbench:
    echo.
    echo 1. Open MySQL Workbench
    echo 2. Connect to localhost:3306
    echo 3. Open init-db.sql file
    echo 4. Execute the entire script
    echo.
    pause
    exit /b
)

echo Found MySQL at: %MYSQL_PATH%
echo.
echo Enter your MySQL root password (press Enter if no password):
"%MYSQL_PATH%" -u root -p < init-db.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Database initialized successfully!
    echo ========================================
    echo.
    echo You can now access the application at:
    echo http://localhost:3000
    echo.
) else (
    echo.
    echo ========================================
    echo Error initializing database
    echo ========================================
    echo.
    echo Please initialize manually using MySQL Workbench:
    echo 1. Open MySQL Workbench
    echo 2. Connect to localhost:3306
    echo 3. Open init-db.sql file
    echo 4. Execute the entire script
    echo.
)

pause
