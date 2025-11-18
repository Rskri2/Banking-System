import mysql.connector
from face_utils import b64_to_file
from binary_processing_module import convertToBinaryData
from crypto_utils import encrypt_bytes

conn = mysql.connector.connect(
    host="localhost", user="root", password="root", database="bank_app"
)
cursor = conn.cursor()

def register_user(first_name, last_name, phone_no, account_no, balance, face_b64):
 
    try:
        face_path = b64_to_file(face_b64)
        blob_face = convertToBinaryData(face_path)

        # Encrypt face before storing
        encrypted_face = encrypt_bytes(blob_face)

        cursor.execute(
            "INSERT INTO users (account_no, first_name, last_name, phone_no, balance, face_photo) VALUES (%s,%s,%s,%s,%s,%s)",
            (account_no, first_name, last_name, phone_no, balance, encrypted_face)
        )
        conn.commit()
        return True
    except Exception as e:
        print("error"+str(e))
