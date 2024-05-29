/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import Connector from "./Connector";
import useAuth from "./js/useAuth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "@/redux/slices/loggedInUserSlice";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user && router) {
      router.push("/login");
    } else if (user) {
      dispatch(setLoggedInUser(user))
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? <Connector /> : null;
};

export default Home;
