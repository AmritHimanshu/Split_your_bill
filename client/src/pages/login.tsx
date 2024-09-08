import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function Login() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const logOut = async () => {
      try {
        const res = await fetch(`${BASE_URL}/logout`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
      } catch (error) {
        console.log(error);
      }
    };

    logOut();
  }, [BASE_URL]);

  const loginUser = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      return window.alert("Fill all the fields");
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      if (res.status !== 200) {
        setIsLoading(false);
        return window.alert(`${data.error}`);
      } else {
        setIsLoading(false);
        window.alert("Successfully registered");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      window.alert(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-green-100 bg-opacity-25">
      <div className="min-w-[345px] md:w-[500px] p-[15px] md:p-[20px] bg-white m-auto rounded-md shadow-lg">
        <div className="my-[10px] text-center text-[18px] md:text-[22px] text-green-600">
          Login
        </div>
        <div>
          <form onSubmit={loginUser}>
            <div className="my-[10px] pb-2 space-y-2 border-b-2">
              <label
                htmlFor="email"
                className="text-[14px] md:text-[18px] text-black"
              >
                Email
              </label>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Enter your email"
                  className="outline-0 w-full text-[14px] md:text-[18px] placeholder:text-[14px]"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="my-[10px] pb-2 space-y-2 border-b-2">
              <label
                htmlFor="password"
                className="text-[14px] md:text-[18px] text-black"
              >
                Password
              </label>
              <div className="flex items-center justify-between">
                <input
                  type={`${!visible ? "password" : "text"}`}
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Enter your password"
                  className="outline-0 w-full text-[14px] md:text-[18px] placeholder:text-[14px]"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {visible ? (
                  <VisibilityIcon
                    style={{ cursor: "pointer", fontSize: "20px" }}
                    onClick={() => setVisible(!visible)}
                  />
                ) : (
                  <VisibilityOffIcon
                    style={{ cursor: "pointer", fontSize: "20px" }}
                    onClick={() => setVisible(!visible)}
                  />
                )}
              </div>
            </div>

            <button className="p-[8px] md:p-[10px] mt-[25px] w-[100%] text-center text-white bg-[rgb(0,144,72)] font-bold rounded-md cursor-pointer">
              {isLoading ? (
                <div>
                  <RestartAltIcon className="animate-spin" /> Signing in
                </div>
              ) : (
                <div>Login</div>
              )}
            </button>
          </form>

          <div className="text-center mt-[10px] mb-[5px] text-[14px] md:text-[16px]">
            <span className="mx-[5px]">Don&rsquo;t have an account?</span>
            <Link href="/register">
              <span className="mx-[5px] text-green-600 underline">
                Register here
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
