@echo off
echo ========================================
echo   AFORINNOV - Installation automatique
echo ========================================
echo.

:: Vérifier Node.js
echo [1/5] Vérification de Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERREUR] Node.js n'est pas installe !
    echo Veuillez installer Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js est installe
echo.

:: Vérifier Docker
echo [2/5] Vérification de Docker...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERREUR] Docker n'est pas installe !
    echo Veuillez installer Docker Desktop depuis https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)
echo [OK] Docker est installe
echo.

:: Vérifier Git
echo [3/5] Vérification de Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERREUR] Git n'est pas installe !
    echo Veuillez installer Git depuis https://git-scm.com/
    pause
    exit /b 1
)
echo [OK] Git est installe
echo.

:: Initialiser Git
echo [4/5] Initialisation du repository Git...
if not exist .git (
    git init
    git add .
    git commit -m "Initial commit - AFORINNOV recruitment test"
    git branch -M main
    echo [OK] Repository Git initialise
) else (
    echo [INFO] Repository Git deja initialise
)
echo.

:: Lancer Docker Compose
echo [5/5] Lancement de l'application avec Docker...
echo Cette etape peut prendre 5-10 minutes la premiere fois...
echo.
docker-compose up --build

pause
