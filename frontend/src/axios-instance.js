import { useMemo } from "react";
import axios from "axios";
import supabase from "./client"; // your Supabase client

export function useAxiosClient() {
  return useMemo(() => {
    const baseURL = import.meta.env.VITE_API_BASE_URL; // always uses deployed backend

    const instance = axios.create({ baseURL });

    // Attach Supabase token to requests
    instance.interceptors.request.use(async (config) => {
      try {
        let { data: { session } } = await supabase.auth.getSession();

        // Refresh token if needed
        if (!session || !session.access_token) {
          const { data, error } = await supabase.auth.refreshSession();
          if (error) throw error;
          session = data.session;
        }

        if (session?.access_token) {
          config.headers.Authorization = `Bearer ${session.access_token}`;
        }
      } catch (error) {
        console.warn(
          "Supabase token unavailable or refresh failed, proceeding without token",
          error
        );
      }

      return config;
    });

    return instance;
  }, []);
}
