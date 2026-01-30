import "server-only";
import {auth} from "@/auth";

export const API_URL = process.env.API_BASE_URL;
if (!API_URL) {
  throw new Error("API_BASE_URL is not defined");
}


export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const session = await auth();
  const token = session.accessToken ? session.accessToken : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };


  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error("Error en la API");
  }

  return res.json();
}

