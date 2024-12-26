import $http from "./axios.js";

export const authenticate = async (data: any) => {
  try {
    const res = await $http.post(`/auth/cliAuth`, data);
    return res?.data ?? (res as any)?.response?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const createCmds = async (data: any) => {
  try {
    const res = await $http.post(`/command/cli/create`, data);
    return res?.data ?? (res as any)?.response?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const getAllCmds = async (data: any) => {
  try {
    const res = await $http.get(`/command/cli/get`, data);
    return res?.data ?? (res as any)?.response?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const deleteCmd = async (data: any) => {
  try {
    const res = await $http.post(`/command/cli/delete`, data);
    return res?.data ?? (res as any)?.response?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};
