import unittest
import os
from PIL import Image
from steganography import SteganoProvider
from auth_2fa import Auth2FA

class TestCryPTrusCore(unittest.TestCase):
    """Test suite for Steganography and 2FA modules."""

    def setUp(self):
        """Set up testing environment before each test."""
        self.stego = SteganoProvider()
        self.auth = Auth2FA()
        self.test_img = "test_input.png"
        self.output_img = "test_output.png"
        self.secret_msg = "CryPTrus-Secret-2026"

        # Create a tiny 100x100 solid blue image for testing
        img = Image.new('RGB', (100, 100), color='blue')
        img.save(self.test_img)

    def tearDown(self):
        """Clean up files after tests are done."""
        for file in [self.test_img, self.output_img]:
            if os.path.exists(file):
                os.remove(file)

    def test_steganography_integrity(self):
        """Verify that a message can be hidden and perfectly recovered."""
        # 1. Encode
        self.stego.encode_message(self.test_img, self.secret_msg, self.output_img)
        
        # 2. Decode
        recovered = self.stego.decode_message(self.output_img)
        
        # 3. Assert
        self.assertEqual(self.secret_msg, recovered, "Decoded message does not match original!")

    def test_2fa_verification(self):
        """Verify that a generated TOTP token is valid."""
        # 1. Get the current valid code
        current_code = self.auth.current_otp()
        
        # 2. Verify it
        is_valid = self.auth.verify_code(current_code)
        
        # 3. Assert
        self.assertTrue(is_valid, "2FA Verification failed for a valid token!")

if __name__ == "__main__":
    unittest.main()
