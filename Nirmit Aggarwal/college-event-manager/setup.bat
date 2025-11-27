@echo off
echo ========================================
echo College Event Manager - Setup Script
echo ========================================
echo.

echo [1/4] Installing Backend Dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    exit /b 1
)
cd ..
echo ✓ Backend dependencies installed

echo.
echo [2/4] Installing Frontend Dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    exit /b 1
)
cd ..
echo ✓ Frontend dependencies installed

echo.
echo ========================================
echo ✅ Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Start MongoDB: mongod
echo 2. Seed database: cd backend ^& node seed.js
echo 3. Start backend: cd backend ^& npm run dev
echo 4. Start frontend: cd frontend ^& npm run dev
echo.
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
echo.
pause
