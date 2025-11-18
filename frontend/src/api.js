import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export async function apiRegister(payload) {
  return axios.post(`${BASE}/register`, payload).then(r => r.data);
}
export async function apiLogin(payload) {
  return axios.post(`${BASE}/login`, payload).then(r => r.data);
}
export async function apiWithdraw(payload) {
  return axios.post(`${BASE}/withdraw`, payload).then(r => r.data);
}
export async function apiDeposit(payload) {
  return axios.post(`${BASE}/deposit`, payload).then(r => r.data);
}
export async function apiStatement(account_no) {
  return axios.get(`${BASE}/mini-statement/${account_no}`).then(r => r.data);
}