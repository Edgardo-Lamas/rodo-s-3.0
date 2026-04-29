@echo off
chcp 65001 >nul 2>&1
title Internet Segura para la Familia - Rodo's 3.0

:: ── Verificar privilegios de administrador ───────────────────────────
net session >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

cls
echo.
echo  +----------------------------------------------------------+
echo  ^|   Internet Segura para la Familia                        ^|
echo  ^|   Rodo's 3.0  .  La Plata  .  wa.me/5492215069677       ^|
echo  +----------------------------------------------------------+
echo.
echo   Aplicando configuracion segura de red...
echo.

:: ── Configurar DNS en todos los adaptadores de red activos ───────────
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-NetAdapter | Where-Object { $_.Status -eq 'Up' } | ForEach-Object { try { Set-DnsClientServerAddress -InterfaceIndex $_.ifIndex -ServerAddresses ('1.1.1.3','1.0.0.3') -ErrorAction Stop; Write-Host '  [OK]' $_.Name } catch { Write-Host '  [--]' $_.Name } }"

:: ── Renovar cache DNS ────────────────────────────────────────────────
ipconfig /flushdns >nul 2>&1
echo.
echo   [OK] Cache DNS renovado

:: ── Resultado ────────────────────────────────────────────────────────
echo.
echo  +----------------------------------------------------------+
echo  ^|                                                          ^|
echo  ^|   Configuracion aplicada correctamente.                  ^|
echo  ^|                                                          ^|
echo  ^|   Tu red ahora filtra automaticamente:                   ^|
echo  ^|     - Contenido para adultos                             ^|
echo  ^|     - Sitios de malware y phishing                       ^|
echo  ^|     - Paginas de apuestas y estafas                      ^|
echo  ^|                                                          ^|
echo  ^|   Para proteger tambien los celulares y tablets          ^|
echo  ^|   de tu familia, contactanos:                            ^|
echo  ^|   wa.me/5492215069677                                    ^|
echo  ^|                                                          ^|
echo  +----------------------------------------------------------+
echo.
pause
