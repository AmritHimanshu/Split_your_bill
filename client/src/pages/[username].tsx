import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/store";
import { LOGIN } from "@/utils/Paths/paths"; 
import Sidebar from "./components/Sidebar";

export default function Home() {

  const userState = useAppSelector((state) => state.user.userState);
  console.log(userState)

  const router = useRouter();

  useEffect(() => {
    // if (!userState) router.push(LOGIN);
  }, []);

  return (
    <div className="flex h-[100vh] bg-green-100 bg-opacity-25">
      <Sidebar />
      <div className="w-[100%] lg:w-[75%] py-[20px] flex overflow-y-auto">
        <div className="w-[100%] flex items-center justify-center text-[20px] lg:text-[70px] font-bold text-gray-300 tracking-wide cursor-default">
          Select the bill
        </div>
      </div>
    </div>
  );
}
