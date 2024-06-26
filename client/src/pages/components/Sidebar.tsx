import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function Sidebar() {
  const BASE_URL = "http://localhost:5000";

  const router = useRouter();
  const { username, billname } = router.query;

  const [isTrue, setIsTrue] = useState(false);
  const [user, setUser] = useState<any>({});
  const [bills, setBills] = useState([]);

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

        const data = await res.json();
        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getBills = async () => {
      try {
        const res = await fetch(`${BASE_URL}/getbills`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.status === 401) router.push("/login");
        const data = await res.json();
        if (res.status === 503) return window.alert(`${data.error}`);
        if (res.status === 200) {
          setBills(data);
        }
      } catch (error) {
        console.log(error);
        window.alert("Internal server error");
      }
    };

    getData();
    getBills();
  }, [router]);

  return (
    <>
      <div className="hidden lg:block p-[15px] w-[25%] h-[100vh] flex flex-col justify-between bg-white shadow-xl">
        <div>
          <div className="p-[5px] my-[10px] text-[25px] bg-green-700 font-bold text-white text-center cursor-default">
            Split - your - bills
          </div>

          <div>
            <Link href={`/${username}/create-new-bill`}>
              <div className="w-[100%] h-[50px] text-black p-[5px] mt-[50px] mb-[20px] text-[20px] font-bold cursor-pointer flex items-center justify-center rounded-md border-[1px] duration-200 hover:text-[rgb(0,144,72)] hover:border-green-600">
                + Add New
              </div>
            </Link>

            {bills?.map((bill: any, index) => (
              <Link href={`/${username}/${bill.title}/${bill._id}`} key={index}>
                <div
                  key={index}
                  className={`border-b-[1px] border-[rgb(141,141,141)] text-center py-[5px] px-[10px] my-[10px] ${
                    bill.title === billname
                      ? "text-green-600 font-bold text-[20px]"
                      : "text-[14px] text-gray-600"
                  } flex items-center justify-between cursor-pointer`}
                >
                  <div className="">{bill.title}</div>
                  {bill.title === billname && <ArrowRightIcon />}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Link href="/login">
          <div className="flex items-center cursor-pointer" title="Log out">
            {/* <img src="" alt="" /> */}
            <div className="text-[16px] font-bold text-black mx-[10px]">
            Log Out ({user.name})
            </div>
          </div>
        </Link>
      </div>

      <div className="lg:hidden absolute z-10">
        <MenuIcon
          style={{ fontSize: "35px", cursor: "pointer", padding: "5px", color:"white" }}
          onClick={() => setIsTrue(!isTrue)}
        />
        {isTrue && (
          <div className="bg-white p-[20px] w-[100vw] h-[96vh] text-white flex flex-col justify-between">
            <div>
              <div className="p-[5px] my-[10px] text-[18px] bg-green-700 font-bold text-white text-center cursor-default">
                Split - your - bills
              </div>

              <div>
                <Link href={`/${username}/create-new-bill`}>
                  <div
                    className="w-[100%] h-[40px] text-black p-[5px] mt-[30px] mb-[20px] text-[15px] font-bold cursor-pointer flex items-center justify-center rounded-md border-[1px] duration-200 hover:text-[rgb(0,144,72)] hover:border-green-600"
                    onClick={() => {
                      setIsTrue(!isTrue);
                    }}
                  >
                    + Add New
                  </div>
                </Link>

                {bills?.map((bill: any, index) => (
                  <Link
                    href={`/${username}/${bill.title}/${bill._id}`}
                    key={index}
                  >
                    <div
                      key={index}
                      className={`border-b-[1px] border-[rgb(141,141,141)] text-center py-[5px] px-[10px] my-[12px] ${
                        bill.title === billname
                          ? "text-green-600 font-bold text-[20px]"
                          : "text-[14px] text-gray-600"
                      } flex items-center justify-between cursor-pointer`}
                    >
                      <div className="">{bill.title}</div>
                      {bill.title === billname && <ArrowRightIcon />}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/login">
              <div className="flex items-center cursor-pointer" title="Log out">
                {/* <img src={user?.profilePic} alt="" /> */}
                <div className="text-[13px] font-bold text-black mx-[10px]">
                  Log Out ({user.name})
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
