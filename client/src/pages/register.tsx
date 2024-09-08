import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function Register() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const router = useRouter();

  useEffect(()=>{
    const logOut = async ()=>{
      try {
        const res = await fetch(`${BASE_URL}/logout`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          },
          credentials:'include'
        });
      } catch (error) {
        console.log(error);
      }
    }

    logOut();
  },[BASE_URL]);

  const [visible, setVisible] = useState(false);
  const [cvisible, setCVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const registerUser = async (e: any) => {
    e.preventDefault();

    const regex = /^[0-9]+$/;
    const { name, email, phone, password, cpassword } = inputData;
    if (!name || !email || !phone || !password || !cpassword) {
      return window.alert("Fill all the fields");
    } else if (password !== cpassword) {
      return window.alert("Password doesn't match");
    } else if (password.length < 6) {
      return window.alert("Length of password must be of atleast 6");
    } else if (phone.length < 10) {
      return window.alert("Invalid Phone number");
    } else if (!regex.test(phone)) {
      return window.alert("Invalid Phone number");
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/register`, {
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
        setIsLoading(false);
        window.alert(`${data.error}`);
      } else {
        setIsLoading(false);
        window.alert(`${data.message}`);
        router.push("/login");
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
          Register
        </div>
        <div>
          <form onSubmit={registerUser}>
            <div className="my-[10px] pb-2 space-y-2 border-b-2">
              <label htmlFor="name" className="text-[14px] md:text-[18px] text-black">
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
              <label htmlFor="email" className="text-[14px] md:text-[18px] text-black">
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
              <label htmlFor="phone" className="text-[14px] md:text-[18px] text-black">
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
              <label htmlFor="password" className="text-[14px] md:text-[18px] text-black">
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
                    style={{ cursor: "pointer",fontSize:"20px" }}
                    onClick={() => setVisible(!visible)}
                  />
                ) : (
                  <VisibilityOffIcon
                    style={{ cursor: "pointer",fontSize:"20px" }}
                    onClick={() => setVisible(!visible)}
                  />
                )}
              </div>
            </div>
            <div className="my-[10px] pb-2 space-y-2 border-b-2">
              <label htmlFor="cpassword" className="text-[14px] md:text-[18px] text-black">
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
                    style={{ cursor: "pointer", fontSize:"20px" }}
                    onClick={() => setCVisible(!cvisible)}
                  />
                ) : (
                  <VisibilityOffIcon
                    style={{ cursor: "pointer", fontSize:"20px" }}
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
            <Link href="/login">
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
