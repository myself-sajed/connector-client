"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { usePathname, useRouter } from "next/navigation";
import { getUserToken } from "../helpers/localStorageHandler";
import { useEffect } from "react";

const useAuthenticate = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = getUserToken();

    if (pathname === "/login" && token) {
      router.replace("/");
    } else if (pathname === "/" && !token) {
      router.replace("/login");
    } else if (pathname === "/signup" && token) {
      router.replace("/");
    }
  }, [pathname]);
};

export default useAuthenticate;
