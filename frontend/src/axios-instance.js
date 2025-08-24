// src/axios-instance.js
import { useMemo } from "react";
import axios from "axios";
import supabase from "./client"; // your Supabase client

export function useAxiosClient() {
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
    });

    // Request interceptor to attach Supabase access token if available
    instance.interceptors.request.use(async (config) => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.access_token) {
          config.headers.Authorization = `Bearer ${session.access_token}`;
        }
      } catch (error) {
        console.warn(
          "Supabase session unavailable, proceeding without token",
          error
        );
      }

      return config;
    });

    return instance;
  }, []);

  return axiosInstance;
}


