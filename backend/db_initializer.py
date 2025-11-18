import mysql.connector

def init_db():
    conn = mysql.connector.connect(
        host="localhost", user="root", password="root"
    )
    cursor = conn.cursor()
    cursor.execute("CREATE DATABASE IF NOT EXISTS bank_app")
    conn.database = "bank_app"

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        account_no VARCHAR(20) PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        phone_no VARCHAR(20),
        balance FLOAT,
        face_photo LONGBLOB
    )
    """)
    conn.commit()
    conn.close()
    print("Database initialized.")

if __name__ == "__main__":
    init_db()
