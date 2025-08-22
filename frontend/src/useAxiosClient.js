// src/useAxiosClient.js
import { useMemo } from "react";
import axios from "axios";
import supabase from "./client"; // use your existing client.js

// Custom hook to get Axios instance with latest Supabase token
export function useAxiosClient() {
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:5000", // replace with your backend URL
    });

    instance.interceptors.request.use(async (config) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }

      return config;
    });

    return instance;
  }, []);

  return axiosInstance;
}
