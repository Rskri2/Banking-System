import React, { useState, useEffect } from "react";
import { apiWithdraw, apiDeposit, apiStatement } from "../api";

export default function Dashboard() {
  const account = sessionStorage.getItem("account_no") || "";
  const first = sessionStorage.getItem("first_name") || "";

  const [msg, setMsg] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);

  // Fetch current balance on mount
  useEffect(() => {
    async function fetchBalance() {
      if (account) {
        try {
          const currBalance = await apiStatement(account);
          setBalance(currBalance.balance);
        } catch (err) {
          console.error("Error fetching balance:", err);
        }
      }
    }
    fetchBalance();
  }, [account]);

  const withdraw = async () => {
    if (!amount || amount <= 0) return setMsg("Enter a valid amount");
    const res = await apiWithdraw({ account_no: account, amount });
    if (res.ok) {
      setBalance(res.balance);
      setMsg(`Withdrawn successfully. New balance: ${res.balance}`);
    } else {
      setMsg(`Error: ${res.error}`);
    }
    setAmount("");
  };

  const deposit = async () => {
    if (!amount || amount <= 0) return setMsg("Enter a valid amount");
    const res = await apiDeposit({ account_no: account, amount });
    if (res.ok) {
      setBalance(res.balance);
      setMsg(`Deposited successfully. New balance: ${res.balance}`);
    } else {
      setMsg(`Error: ${res.error}`);
    }
    setAmount("");
  };

  if (!account) return <div className="dashboard-container">Please login first.</div>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome, {first}</h2>
      <div className="balance">Account Balance: ${balance}</div>

      <div className="transaction-box">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="amount-input"
        />
        <div className="buttons">
          <button className="btn withdraw-btn" onClick={withdraw}>
            Withdraw
          </button>
          <button className="btn deposit-btn" onClick={deposit}>
            Deposit
          </button>
        </div>
      </div>

      {msg && <div className="message">{msg}</div>}

      <style jsx>{`
        .dashboard-container {
          // max-width: 500px;
          // margin: 50px auto;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          background-color: #f8f9fa;
          text-align: center;
          font-family: Arial, sans-serif;
        }
        .dashboard-title {
          margin-bottom: 10px;
          color: #333;
        }
        .balance {
          font-size: 18px;
          margin-bottom: 20px;
          font-weight: bold;
        }
        .transaction-box {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
        }
        .amount-input {
          width: 60%;
          padding: 8px 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 16px;
        }
        .buttons {
          display: flex;
          gap: 15px;
        }
        .btn {
          padding: 8px 16px;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          color: #fff;
          transition: all 0.2s ease-in-out;
        }
        .withdraw-btn {
          background-color: #dc3545;
        }
        .withdraw-btn:hover {
          background-color: #c82333;
        }
        .deposit-btn {
          background-color: #28a745;
        }
        .deposit-btn:hover {
          background-color: #218838;
        }
        .message {
          margin-top: 15px;
          font-size: 15px;
          color: #555;
        }
      `}</style>
    </div>
  );
}
