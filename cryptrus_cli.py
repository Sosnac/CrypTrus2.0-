"""
CryPTrus 2.0 - Unified Security CLI
Integrates Network Scanning, 2FA, and Steganography.
"""
import sys
from network_scanner import NetworkScanner
from device_detection import DeviceDetection
from steganography import SteganoProvider
from auth_2fa import Auth2FA

def main_menu():
    scanner = NetworkScanner()
    detector = DeviceDetection()
    stego = SteganoProvider()
    auth = Auth2FA()

    print("\n" + "="*30)
    print("   CryPTrus 2.0 COMMAND CENTER  ")
    print("="*30)
    print("1. 🛡️  Verify 2FA Token")
    print("2. 📡  Scan Local Network")
    print("3. 📷  Hide Message in Image (Stego)")
    print("4. 🔓  Extract Message from Image")
    print("5. ❌  Exit")
    
    choice = input("\nSelect an option [1-5]: ")

    if choice == '1':
        code = input("Enter 6-digit TOTP code: ")
        if auth.verify_code(code):
            print("✅ Access Granted!")
        else:
            print("❌ Access Denied! Invalid Token.")

    elif choice == '2':
        print("Scanning network (192.168.1.1-10)...")
        hosts = scanner.scan_range("192.168.1")
        for host in hosts:
            dev_type = detector.identify_by_mac("B8:27:EB") # Example MAC
            print(f"📍 Found: {host} -> {dev_type}")

    elif choice == '3':
        img_in = input("Source Image Path (e.g., input.png): ")
        msg = input("Secret Message: ")
        img_out = input("Output Image Name (e.g., hidden.png): ")
        if stego.encode_message(img_in, msg, img_out):
            print(f"🚀 Message hidden successfully in {img_out}!")

    elif choice == '4':
        img_path = input("Target Image Path: ")
        secret = stego.decode_message(img_path)
        print(f"🔓 Decoded Message: {secret}")

    elif choice == '5':
        print("Shutting down CryPTrus 2.0... Goodbye.")
        sys.exit()

    else:
        print("Invalid selection. Try again.")

if __name__ == "__main__":
    while True:
        main_menu()
