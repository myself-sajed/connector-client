/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import Connector from "./Connector";
import useAuth from "./hooks/useAuth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "@/redux/slices/loggedInUserSlice";
import { logout } from "@/lib/api";
import UserLoading from "./components/base/UserLoading";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const { user, isLoading } = useAuth();

  useEffect(() => {
    console.log(isLoading, user)
    if (!isLoading && !user) {
      router.push("/login");
    } else if (user) {
      dispatch(setLoggedInUser(user))
    }
  }, [isLoading, user]);

  if (!isLoading) {
    return <UserLoading />
  }

  return user ? <Connector /> : null;
};

export default Home;
