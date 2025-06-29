import { useAuth } from "@/context/AuthContext";

export default function useUser() {
  const { user, token, login, logout } = useAuth();

  return {
    user,
    token,
    isLoggedIn: !!user && !!token,
    login,
    logout,
  };
}

