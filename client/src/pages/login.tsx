import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setUserState } from "@/store/features/userSlice";
import { REGISTER } from "@/utils/Paths/paths";
import { LOGIN, LOGOUT } from "@/utils/Apis/api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Message from "./components/Message";

function Login() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const userState = useAppSelector((state) => state.user.userState);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const logOut = async () => {
      try {
        const res = await fetch(`${BASE_URL}/${LOGOUT}`, {
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

    if(userState) logOut();
  }, [BASE_URL]);

  const loginUser = async (e: any) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setMessage({ text: "", type: "" });

    let hasError = false;

    if (!email) {
      setEmailError("Email is required.");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Password is required.");
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/${LOGIN}`, {
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
        setMessage({ text: data.error, type: "error" });
        const error = new Error(data.error);
        throw error;
      }
      
      dispatch(setUserState(data));
      router.push(`/${data.name}`);
    } catch (error) {}

    setIsLoading(false);

    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 2000);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-green-100 bg-opacity-25 relative">
      {message.text && message.type && (
        <Message text={message.text} type={message.type} />
      )}

      <div className="min-w-[345px] md:w-[500px] p-[15px] md:p-[20px] bg-white m-auto rounded-md shadow-lg">
        <div className="my-[10px] text-center text-[18px] md:text-[22px] text-green-600">
          Login
        </div>

        <div>
          <form onSubmit={loginUser}>
            <div className="my-[10px] pb-2 space-y-2">
              <label
                htmlFor="email"
                className="text-[14px] md:text-[18px] text-black"
              >
                Email
              </label>
              <div className="py-2 border-b-2">
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
              {emailError && (
                <p className="text-red-600 text-sm">{emailError}</p>
              )}
            </div>

            <div className="my-[10px] pb-2 space-y-2">
              <label
                htmlFor="password"
                className="text-[14px] md:text-[18px] text-black"
              >
                Password
              </label>
              <div className="flex items-center justify-between py-2 border-b-2">
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
              {passwordError && (
                <p className="text-red-600 text-sm">{passwordError}</p>
              )}
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
            <Link href={`${REGISTER}`}>
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
