from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64

from Crypto.Random import get_random_bytes

# Generate a random 16-byte key (AES-128)
KEY = b"16byteslongkey!!"

def encrypt_bytes(data: bytes) -> bytes:
    cipher = AES.new(KEY, AES.MODE_CBC)
    ct_bytes = cipher.encrypt(pad(data, AES.block_size))
    return base64.b64encode(cipher.iv + ct_bytes)

def decrypt_bytes(enc_data: bytes) -> bytes:
    raw = base64.b64decode(enc_data)
    iv = raw[:16]
    ct = raw[16:]
    cipher = AES.new(KEY, AES.MODE_CBC, iv)
    return unpad(cipher.decrypt(ct), AES.block_size)
