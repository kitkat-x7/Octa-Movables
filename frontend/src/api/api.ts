import axios from "axios";
const API_BASE = "http://localhost:5000/api/v1"; // Adjust if needed

// Booking APIs
export const getVehicleTypesbyWheel = (wheel: string) =>
    axios.get(`${API_BASE}/type/wheel/${wheel}`);
export const getVehicleModels = (typeId: number) => axios.get(`${API_BASE}/model?typeId=${typeId}`);
export const createBooking = (data: any) => axios.post(`${API_BASE}/booking`, data);

// Admin APIs
export const adminSignup = (data: any) => axios.post(`${API_BASE}/admin/signup`, data);
export const adminSignin = (data: any) => axios.post(`${API_BASE}/admin/signin`, data);
export const getAdminDashboard = (token: string) =>
  axios.get(`${API_BASE}/admin`, { headers: { token } });
// Add more as needed for CRUD
