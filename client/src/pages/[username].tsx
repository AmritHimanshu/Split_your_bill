import { useRouter } from "next/router";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";

export default function Home() {
  const BASE_URL = "http://localhost:5000";
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        
        if(res.status === 401) router.push('/login');
        const data = await res.json();
        if (data) {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
        router.push('/login');
      }
    };

    getData();
  }, [router]);

  return (
    <div className="flex h-[100vh] bg-green-600">
      <Sidebar />
      <div className="w-[100%] lg:w-[75%] py-[20px] flex overflow-y-auto">
        <div className="w-[100%] flex items-center justify-center text-[20px] font-bold text-white tracking-wide cursor-default">
          Select the bill
        </div>
      </div>
    </div>
  );
}
