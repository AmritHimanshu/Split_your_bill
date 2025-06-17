import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAppSelector } from "@/store/store";
import { LOGOUT, REGISTER } from "@/utils/Apis/api";
import { LOGIN } from "@/utils/Paths/paths";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Message from "./components/Message";

function Register() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const userState = useAppSelector((state) => state.user.userState);

  const router = useRouter();

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

    if (userState) logOut();
  }, [BASE_URL]);

  const [visible, setVisible] = useState(false);
  const [cvisible, setCVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setCPasswordError] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const registerUser = async (e: any) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setCPasswordError("");
    setMessage({ text: "", type: "" });

    let hasError = false;

    const regex = /^[0-9]+$/;

    const { name, email, phone, password, cpassword } = inputData;

    if (!name) {
      setNameError("Name is required.");
      hasError = true;
    }
    if (!email) {
      setEmailError("Email is required.");
      hasError = true;
    }
    if (!phone) {
      setPhoneError("Phone is required.");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Password is required.");
      hasError = true;
    }
    if (!cpassword) {
      setCPasswordError("Confirm Password is required.");
      hasError = true;
    }
    if (!regex.test(phone)) {
      setPhoneError("Invalid Phone number");
      hasError = true;
    }
    if (password.length < 6) {
      setPasswordError("Length of password must be of atleast 6");
      hasError = true;
    }
    if (password !== cpassword) {
      setPasswordError("Password doesn't match");
      setCPasswordError("Password doesn't match");
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/${REGISTER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          cpassword,
        }),
      });

      const data = await res.json();

      if (res.status !== 200) {
        setMessage({ text: data.error, type: "error" });
        const error = new Error(data.error);
        throw error;
      }
      
      setIsLoading(false);
      window.alert(`${data.message}`);
      router.push(LOGIN);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      window.alert(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-green-100 bg-opacity-25 relative">
      {message.text && message.type && (
        <Message text={message.text} type={message.type} />
      )}

      <div className="min-w-[345px] md:w-[500px] p-[15px] md:p-[20px] bg-white m-auto rounded-md shadow-lg">
        <div className="my-[10px] text-center text-[18px] md:text-[22px] text-green-600">
          Register
        </div>
        <div>
          <form onSubmit={registerUser}>
            <div className="my-[10px] pb-2 space-y-2 border-b-2">
              <label
                htmlFor="name"
                className="text-[14px] md:text-[18px] text-black"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={inputData.name}
                placeholder="Enter your name"
                className="outline-0 w-full text-[14px] md:text-[18px] placeholder:text-[14px]"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div className="my-[10px] pb-2 space-y-2 border-b-2">
              <label
                htmlFor="email"
                className="text-[14px] md:text-[18px] text-black"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={inputData.email}
                placeholder="Enter your email"
                className="outline-0 w-full text-[14px] md:text-[18px] placeholder:text-[14px]"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div className="my-[10px] pb-2 space-y-2 border-b-2">
              <label
                htmlFor="phone"
                className="text-[14px] md:text-[18px] text-black"
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={inputData.phone}
                placeholder="Enter your phone number"
                className="outline-0 w-full text-[14px] md:text-[18px] placeholder:text-[14px]"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div className="my-[10px] pb-2 space-y-2 border-b-2">
              <label
                htmlFor="password"
                className="text-[14px] md:text-[18px] text-black"
              >
                Password
              </label>
              <div className="flex items-center">
                <input
                  type={`${!visible ? "password" : "text"}`}
                  name="password"
                  id="password"
                  value={inputData.password}
                  placeholder="Enter your password"
                  className="outline-0 w-full text-[14px] md:text-[18px] placeholder:text-[14px]"
                  onChange={(e) => handleOnChange(e)}
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
            <div className="my-[10px] pb-2 space-y-2 border-b-2">
              <label
                htmlFor="cpassword"
                className="text-[14px] md:text-[18px] text-black"
              >
                Confirm Password
              </label>
              <div className="flex items-center">
                <input
                  type={`${!cvisible ? "password" : "text"}`}
                  name="cpassword"
                  id="cpassword"
                  value={inputData.cpassword}
                  placeholder="Re-enter your password"
                  className="outline-0 w-full text-[14px] md:text-[18px] placeholder:text-[14px]"
                  onChange={(e) => handleOnChange(e)}
                />
                {cvisible ? (
                  <VisibilityIcon
                    style={{ cursor: "pointer", fontSize: "20px" }}
                    onClick={() => setCVisible(!cvisible)}
                  />
                ) : (
                  <VisibilityOffIcon
                    style={{ cursor: "pointer", fontSize: "20px" }}
                    onClick={() => setCVisible(!cvisible)}
                  />
                )}
              </div>
            </div>

            <button className="p-[8px] md:p-[10px] mt-[25px] w-[100%] text-center bg-[rgb(0,144,72)] text-white font-bold border-2 rounded-md pointer">
              {isLoading ? (
                <div>
                  <RestartAltIcon className="animate-spin" /> Registering
                </div>
              ) : (
                <div>Register</div>
              )}
            </button>
          </form>

          <div className="text-center mt-[10px] mb-[5px] text-[14px] md:text-[16px]">
            <span className="mx-[5px]">Already have an account?</span>
            <Link href={`${LOGIN}`}>
              <span className="mx-[5px] text-green-600 underline">
                Login here
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
