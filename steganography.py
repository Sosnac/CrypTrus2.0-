"""Module for hiding and revealing messages within images."""
from PIL import Image

class SteganoProvider:
    """Provides methods for LSB Steganography."""

    def __init__(self):
        pass

    def encode_message(self, image_path, message, output_path):
        """Hides a message inside an image."""
        img = Image.open(image_path)
        encoded = img.copy()
        width, height = img.size
        
        # Add a delimiter so we know where the message ends
        message += "#####" 
        binary_message = ''.join(format(ord(i), '08b') for i in message)
        
        data_index = 0
        for y in range(height):
            for x in range(width):
                pixel = list(img.getpixel((x, y)))
                for n in range(3): # Red, Green, Blue channels
                    if data_index < len(binary_message):
                        # Change the last bit of the channel
                        pixel[n] = pixel[n] & ~1 | int(binary_message[data_index])
                        data_index += 1
                encoded.putpixel((x, y), tuple(pixel))
                if data_index >= len(binary_message):
                    break
        
        encoded.save(output_path)
        return True

    def decode_message(self, image_path):
        """Extracts a hidden message from an image."""
        img = Image.open(image_path)
        binary_data = ""
        for y in range(img.height):
            for x in range(img.width):
                pixel = img.getpixel((x, y))
                for n in range(3):
                    binary_data += str(pixel[n] & 1)

        # Convert bits to chars
        all_bytes = [binary_data[i:i+8] for i in range(0, len(binary_data), 8)]
        decoded_text = ""
        for byte in all_bytes:
            decoded_text += chr(int(byte, 2))
            if decoded_text.endswith("#####"): # Look for delimiter
                return decoded_text[:-5]
        return "No message found."
