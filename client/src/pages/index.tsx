import { useRouter } from "next/router";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";

export default function Home() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
          router.push(`/${data.name}`);
        }
      } catch (error) {
        console.log(error);
        router.push("/login");
      }
    };

    getData();
  }, [router,BASE_URL]);

  return <div className="flex h-[100vh]"></div>;
}
