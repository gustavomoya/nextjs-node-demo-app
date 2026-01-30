// import "server-only";
import {auth} from "@/auth";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
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
    throw new Error("API Error");
  }

  return res.json();
}

export async function apiDelete(endpoint: string) {
  const session = await auth();
  const token = session.accessToken ? session.accessToken : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };


  return await fetch(`${API_URL}${endpoint}`, {
    headers,
    method: "DELETE",
  });
}

export async function apiDownload(endpoint: string) {
  const session = await auth();
  const token = session.accessToken ? session.accessToken : null;

  return await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: "DELETE",
  });
}
