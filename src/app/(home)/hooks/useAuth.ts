"use client";

import { authenticate, logout } from "@/lib/api";
import { Contact } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<Contact | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const res = await authenticate();
        if (res.data.isAuth) {
          setUser(res.data.user);
        } else {
          logout();
          router.replace("/login");
        }
      } catch (error) {
        logout();
        setUser(null);
        router.replace("/login");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, [router]);

  return { user, isLoading };
};

export default useAuth;
