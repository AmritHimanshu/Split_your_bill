import { useRouter } from "next/router";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";
import { useAppSelector } from "@/store/store";
import { LOGIN } from "@/utils/Paths/paths";

export default function Home() {
  const userState = useAppSelector((state) => state.user.userState);
  
  const router = useRouter();

  useEffect(() => {
      if (!userState) router.push(LOGIN);
      else router.push(`/${userState.name}`);
    }, []);

  return <div className="flex h-[100vh]"></div>;
}
