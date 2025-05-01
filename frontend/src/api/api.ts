import axios from "axios";
const API_BASE = "http://localhost:5000/api/v1";

// Axios instance with token interceptor
const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) config.headers.token = token;
    return config;
  },
  (error) => Promise.reject(error)
);

// Booking APIs
export const getVehicleTypesbyWheel = (wheel: string) =>
  api.get(`/type/wheel/${wheel}`);
export const getVehicleModels = (typeId: number) =>
  api.get(`/model/type/${typeId}`);
export const createBooking = (data: any) =>
  api.post(`/booking`, data);

// Admin APIs
export const adminSignup = (data: { email: string; password: string }) =>
  api.post(`/admin/signup`, data);
export const adminSignin = (data: { email: string; password: string }) =>
  api.post(`/admin/signin`, data);
export const getAdminDashboard = () => api.get(`/admin`);

// Vehicle Type CRUD
export const getVehicleTypes = () => api.get(`/type`);
export const createVehicleType = (data: { wheel: string; name: string }) =>
  api.post(`/type`, data);
export const updateVehicleType = (id: number, data: { wheel: string; name: string }) =>
  api.patch(`/type/${id}`, data);
export const deleteVehicleType = (id: number) =>
  api.delete(`/type/${id}`);

// Vehicle Model CRUD
export const getVehicleModelsByType = (typeId: number) => api.get(`/model/type/${typeId}`);
export const createVehicleModel = (data: { modelname: string; vehicletypeid: number }) =>
  api.post(`/model`, data);
export const updateVehicleModel = (id: number, data: { modelname: string; vehicletypeid: number }) =>
  api.patch(`/model/${id}`, data);
export const deleteVehicleModel = (id: number) =>
  api.delete(`/model/${id}`);
