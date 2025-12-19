@echo off
echo ========================================
echo    Sistema CMG - Iniciando Servidor
echo ========================================
echo.
echo Servidor corriendo en: http://localhost:8000
echo.
echo Presiona Ctrl+C para detener el servidor
echo.
echo Abriendo navegador...
echo ========================================
echo.

REM Iniciar el navegador
start http://localhost:8000/login.html

REM Iniciar el servidor Python
python -m http.server 8000
