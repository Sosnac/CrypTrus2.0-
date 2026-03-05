#!/bin/bash

# CrypTrus2.0 Launcher for Termux
# Make script executable: chmod +x launcher.sh
# Run: ./launcher.sh

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║  🔥 CrypTrus2.0 - IoT Intelligence Gatherer ⚡    ║"
echo "║     Termux Non-Root Edition v2.0                  ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# Check Python installation
if ! command -v python3 &> /dev/null; then
    echo "[!] Python3 is not installed"
    echo "[*] Installing Python3..."
    apt install -y python3 python3-pip
fi

# Check if running in Termux
if [ -z "$PREFIX" ]; then
    echo "[!] Not running in Termux environment"
    exit 1
fi

# Display menu
show_menu() {
    echo ""
    echo "Select scan type:"
    echo "1) Quick Scan (Network + Device Detection)"
    echo "2) Full Scan (All modules)"
    echo "3) IoT Only Scan"
    echo "4) Vulnerability Assessment Only"
    echo "5) Custom Scan"
    echo "6) Exit"
    echo ""
}

while true; do
    show_menu
    read -p "Enter choice [1-6]: " choice
    
    case $choice in
        1)
            read -p "Enter target network (e.g., 192.168.1.0/24): " target
            echo "[*] Starting quick scan on $target..."
            python3 cryptrus2.0.py -t "$target" --scan --detect --save
            ;;
        2)
            read -p "Enter target network (e.g., 192.168.1.0/24): " target
            echo "[*] Starting full scan on $target..."
            python3 cryptrus2.0.py -t "$target" --all
            ;;
        3)
            read -p "Enter target network (e.g., 192.168.1.0/24): " target
            echo "[*] Starting IoT scan on $target..."
            python3 cryptrus2.0.py -t "$target" --scan --iot --save
            ;;
        4)
            read -p "Enter target network (e.g., 192.168.1.0/24): " target
            echo "[*] Starting vulnerability assessment on $target..."
            python3 cryptrus2.0.py -t "$target" --scan --iot --vuln --save
            ;;
        5)
            echo ""
            echo "Available options:"
            echo "--scan    : Network scanning"
            echo "--detect  : Device detection"
            echo "--iot     : IoT identification"
            echo "--vuln    : Vulnerability checking"
            echo "--save    : Save results"
            echo "--all     : Run all modules"
            echo ""
            read -p "Enter custom command arguments: " custom_args
            python3 cryptrus2.0.py $custom_args
            ;;
        6)
            echo "[*] Exiting CrypTrus2.0"
            exit 0
            ;;
        *)
            echo "[!] Invalid choice. Please try again."
            ;;
    esac
    
    read -p "Press Enter to continue..."
done