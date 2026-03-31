#!/bin/bash

# CrypTrus2.0 Setup Script for Termux
# This script sets up CrypTrus2.0 in your Termux environment

echo "🔥⚡ CrypTrus2.0 - Termux Setup Script ⚡🔥"
echo "========================================"
echo ""

# Check if running in Termux
if [ ! -d "$PREFIX" ]; then
    echo "[!] This script is designed for Termux environment"
    echo "[!] Please install Termux from F-Droid or Google Play"
    exit 1
fi

echo "[*] Updating package manager..."
apt update -y
apt upgrade -y

echo "[*] Installing required packages..."
echo "[*] Installing required packages..."

# Check if the environment is Termux by looking for its specific directory
if [ -d "/data/data/com.termux/files/usr" ]; then
    echo "Termux detected! Installing Termux-specific dependencies..."
    pkg update -y
    pkg install -y python
else
    echo "Standard Linux detected! Installing dependencies..."
    apt-get update -y
    apt-get install -y python3 python3-pip
fi

apt install -y python3 python3-pip curl wget git inetutils net-tools openssh

echo "[*] Installing Python dependencies..."
pip install --upgrade pip setuptools

echo "[*] Installing CrypTrus2.0 Python dependencies..."
pip install pyyaml netaddr

echo "[*] Creating necessary directories..."
mkdir -p output
mkdir -p configs
mkdir -p logs

echo "[*] Setting executable permissions..."
chmod +x cryptrus2.0.py
chmod +x termux/launcher.sh

echo "[*] Creating symlink for easy execution..."
ln -sf "$(pwd)/cryptrus2.0.py" "$PREFIX/bin/cryptrus2.0"

echo ""
echo "✅ CrypTrus2.0 Setup Complete!"
echo ""
echo "🚀 Quick Start Commands:"
echo "   1. Basic scan: python3 cryptrus2.0.py -t 192.168.1.0/24 --all"
echo "   2. Or use: cryptrus2.0 -t 192.168.1.0/24 --all"
echo "   3. Full scan with output: cryptrus2.0 -t 192.168.0.0/24 --scan --detect --iot --vuln --save"
echo ""
echo "📖 Help: cryptrus2.0 --help"