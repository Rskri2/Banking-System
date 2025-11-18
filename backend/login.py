import mysql.connector
from face_utils import b64_to_file, verify_face
from binary_processing_module import write_file
from crypto_utils import decrypt_bytes

conn = mysql.connector.connect(
    host="localhost", user="root", password="root", database="bank_app"
)
cursor = conn.cursor()

def login(account_no, face_b64):
    try:
        cursor.execute("SELECT first_name, face_photo FROM users WHERE account_no=%s", (account_no,))
        result = cursor.fetchone()
        if not result:
            return False, None
        first_name, encrypted_face = result
        blob_face = decrypt_bytes(encrypted_face)
        stored_path = write_file(blob_face, f"images/{account_no}.jpg")
        uploaded_path = b64_to_file(face_b64)
        verified = verify_face(uploaded_path, stored_path)
        return verified, first_name if verified else None
    except Exception as e:
        print("error"+str(e))