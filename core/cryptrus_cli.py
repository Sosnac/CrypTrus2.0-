import sys
import time
from modules.steganography import SteganoProvider
from modules.auth_2fa import Auth2FA

def main():
    stego = SteganoProvider()
    auth = Auth2FA()

    while True:
        print("\n" + "═"*40)
        print("       🛡️  CryPTrus 2.0 VAULT  🛡️")
        print("═"*40)
        print(" [E] ENCRYPT & HIDE MESSAGE")
        print(" [D] DECRYPT & EXTRACT MESSAGE")
        print(" [A] AUTHENTICATE (2FA)")
        print(" [X] EXIT SYSTEM")
        print("═"*40)

        choice = input("Select Action: ").upper()

        if choice == 'E':
            print("\n--- Encryption Setup ---")
            img_in = input("📁 Source Image: ")
            msg = input("📝 Message to hide: ")
            
            # Auto-Destruct Timer Selection
            print("\n⏰ Set Auto-Destruct Timer:")
            print("1. 30 Seconds")
            print("2. 5 Minutes")
            print("3. No Timer")
            t_choice = input("Choice: ")
            
            timer = 30 if t_choice == '1' else 300 if t_choice == '2' else None
            
            out_name = "vault_" + img_in
            stego.encode_message(img_in, msg, out_name, timer)
            print(f"✅ Success! Secret locked in {out_name}")

        elif choice == 'D':
            print("\n--- Decryption Chamber ---")
            img_path = input("📁 Enter Vault Image: ")
            raw_result = stego.decode_message(img_path)

            # Check for Timer Metadata
            if raw_result.startswith("EXP:"):
                try:
                    parts = raw_result.split('|', 1)
                    expiry = int(parts[0].replace("EXP:", ""))
                    actual_msg = parts[1]

                    if time.time() > expiry:
                        print("\n💀 [AUTO-DESTRUCT ACTIVATED]")
                        print("This message has expired and been deleted from memory.")
                    else:
                        remaining = int(expiry - time.time())
                        print(f"\n🔓 Message: {actual_msg}")
                        print(f"⚠️  This message self-destructs in {remaining}s")
                except:
                    print("❌ Error processing secure metadata.")
            else:
                print(f"\n🔓 Message: {raw_result}")

        elif choice == 'A':
            code = input("Enter 6-digit TOTP: ")
            if auth.verify_code(code):
                print("✅ Identity Verified.")
            else:
                print("❌ Verification Failed.")

        elif choice == 'X':
            print("System offline.")
            break

if __name__ == "__main__":
    main()
