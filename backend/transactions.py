import mysql.connector

conn = mysql.connector.connect(
    host="localhost", user="root", password="root", database="bank_app"
)
cursor = conn.cursor()

def deposit(account_no, amount):
    cursor.execute("UPDATE users SET balance = balance + %s WHERE account_no=%s", (amount, account_no))
    conn.commit()

def withdraw(account_no, amount):
    cursor.execute("SELECT balance FROM users WHERE account_no=%s", (account_no,))
    balance = cursor.fetchone()[0]
    if balance < amount:
        raise Exception("Insufficient balance")
    cursor.execute("UPDATE users SET balance = balance - %s WHERE account_no=%s", (amount, account_no))
    conn.commit()

def mini_statement(account_no):
    cursor.execute("SELECT balance FROM users WHERE account_no=%s", (account_no,))
    
    return cursor.fetchone()[0]
