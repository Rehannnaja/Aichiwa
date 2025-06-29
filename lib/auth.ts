export interface AuthUser {
  id: string;
  email: string;
  username?: string;
}

export async function login(email: string, password: string) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login gagal");
  }

  return await res.json(); // { user, token }
}

export async function register(email: string, password: string, username?: string) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registrasi gagal");
  }

  return await res.json(); // { user, token }
}

export function logout() {
  // bersihkan localStorage jika tidak pakai backend session
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

