import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

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
      <div className="p-[15px] w-[25%] h-[100vh] flex flex-col justify-between bg-white">
        <div>
          <div className="p-[5px] my-[10px] text-[25px] bg-green-700 font-bold text-white text-center cursor-default">
            Split - your - bills
          </div>

          <div>
            <Link href={`/${username}/create-new-bill`}>
              <div className="w-[100%] h-[50px] text-black p-[5px] mt-[50px] mb-[20px] text-[20px] font-bold cursor-pointer flex align-center justify-center rounded-md border-[1px] duration-200 hover:text-[rgb(0,144,72)] hover:border-green-600">
                + Add New
              </div>
            </Link>

            {bills?.map((bill: any, index) => (
              <Link href={`/${username}/${bill.title}`} key={index}>
                <div
                  key={index}
                  className={`border-b-[1px] border-[rgb(141,141,141)] text-center py-[5px] px-[10px] my-[10px] ${bill.title === billname ? "text-green-600 font-bold text-[20px]" : "text-[14px] text-gray-600"} flex align-center justify-between cursor-pointer`}
                >
                  <div className="">{bill.title}</div>
                  {bill.title === billname && <ArrowRightIcon />}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Link href="/login">
          <div className="flex align-center cursor-pointer" title="Log out">
            {/* <img src="" alt="" /> */}
            <div className="text-[16px] font-bold text-black mx-[10px]">
              Vikash
            </div>
          </div>
        </Link>
      </div>

      <div className="lg:hidden absolute z-10 p-[5px]">
        <MenuIcon
          style={{ fontSize: "26px", cursor: "pointer" }}
          onClick={() => setIsTrue(!isTrue)}
        />
        {isTrue && (
          <div className="bg-[rgb(41,41,41)] p-[20px] w-[300px] min-h-[500px] text-white flex flex-col justify-between">
            <div>
              <div className="p-[5px] my-[10px] text-[12px] bg-[rgb(195,195,195)] text-center cursor-default">
                Split - your - bills
              </div>

              <div>
                <div
                  className="w-[100%] h-[25px] text-white p-[5px] mt-[10px] mb-[20px] text-[10px] font-bold cursor-pointer flex align-center justify-center rounded-md border-[1px] duration-200 hover:text-[22px] hover:text-[rgb(0,144,72)]"
                  onClick={() => {
                    setIsTrue(!isTrue);
                  }}
                >
                  + New
                </div>

                <div className="border-b-[1px] border-[rgb(141,141,141)] text-center py-[5px] px-[10px] my-[10px] text-[10px] text-white flex align-center justify-between cursor-pointer">
                  <div className="text-[rgb(0,144,72)] font-bold hover:text-[rgb(255,255,216)]">
                    Jammu & Kashmir
                  </div>
                  {/* <div className="hover:text-[rgb(255,255,216)]">{bill.title}</div> */}
                  {/* <div className="text-[7px] text-[rgb(185,185,185)]">{new Date().toLocaleDateString()}</div> */}
                </div>
              </div>
            </div>

            <Link href="/login">
              <div className="flex align-center cursor-pointer" title="Log out">
                {/* <img src={user?.profilePic} alt="" /> */}
                <div className="text-[10px] font-bold text-white mx-[10px]">
                  {user.name}
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
