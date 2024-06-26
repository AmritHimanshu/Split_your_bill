import { useRouter } from "next/router";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";

export default function Home() {
  // const BASE_URL = "http://localhost:5000";
  const BASE_URL = "https://split-your-bill-api.vercel.app";
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
          router.push(`/${[data.name]}`);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
        router.push("/login");
      }
    };

    getData();
  }, [router]);

  return <div className="flex h-[100vh] bg-green-600"></div>;
}
