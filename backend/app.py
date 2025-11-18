from flask import Flask, request, jsonify
from registration import register_user
from login import login
from flask_cors import CORS
from transactions import deposit, withdraw, mini_statement

app = Flask(__name__)
CORS(app, origins = '*')
@app.route("/api/register", methods=["POST"])
def register_api():
    data = request.get_json()
    try:
        register_user(
            data["first_name"],
            data.get("last_name",""),
            data["phone"],
            data["account_no"],
            data["balance"],
            data["image"]
        )
        return jsonify({"ok": True, "message": "Registered successfully"})
    except Exception as e:
        print("error" + str(e))
        return jsonify({"ok": False, "error": str(e)}), 400

@app.route("/api/login", methods=["POST"])
def login_api():
    data = request.get_json()
    verified, first_name = login(data["account_no"], data["image"])
   
    if verified:
        return jsonify({"ok": True, "first_name": first_name})
    else:
        return jsonify({"ok": False, "error": "Face not recognized"})

@app.route("/api/deposit", methods=["POST"])
def deposit_api():
    data = request.get_json()
    try:
        deposit(data["account_no"], float(data["amount"]))
        balance = mini_statement(data["account_no"])
        return jsonify({"ok": True, "balance": balance})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)})

@app.route("/api/withdraw", methods=["POST"])
def withdraw_api():
    data = request.get_json()
    try:

        withdraw(data["account_no"], float(data["amount"]))
        balance = mini_statement(data["account_no"])
        return jsonify({"ok": True, "balance": balance})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)})

@app.route("/api/mini-statement/<account_no>", methods=["GET"])
def mini_statement_api(account_no):
   
    try:
        balance = mini_statement(account_no)
       
        return jsonify({"ok": True, "balance": balance})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
