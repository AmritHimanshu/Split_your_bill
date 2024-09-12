import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Sidebar() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const router = useRouter();
  const { username, billname } = router.query;

  const [isTrue, setIsTrue] = useState(false);
  const [user, setUser] = useState<any>({});
  const [bills, setBills] = useState([]);
  const [delId, setDelId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetcing, setIsFetching] = useState(false);

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
      setIsFetching(true);
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
        if (res.status === 503) {
          setIsFetching(false);
          return window.alert(`${data.error}`);
        }
        if (res.status === 200) {
          setBills(data);
          setIsFetching(false);
        }
      } catch (error) {
        console.log(error);
        setIsFetching(false);
        window.alert("Internal server error");
      }
    };

    getData();
    getBills();
  }, [router, BASE_URL]);

  const handleBillOnDelete = async (id: String) => {
    setDelId(`${id}`);
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 401) router.push("/login");
      const data = await res.json();
      if (res.status !== 200) {
        setIsLoading(false);
        return window.alert(`${data.error}`);
      }
      if (res.status === 200) {
        setIsLoading(false);
        window.alert("Successfully deleted");
        router.push(`/${username}`);
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      window.alert(error);
    }
  };

  return (
    <>
      <div className="hidden lg:flex flex-col justify-between p-[15px] w-[300px]">
        <div className="">
          <div>
            <Link href={`/${username}/create-new-bill`}>
              <div className="w-[100%] h-[50px] text-black p-[5px] my-[20px] text-[20px] font-bold cursor-pointer flex items-center justify-center rounded-md border-[1px] border-black duration-200 hover:text-[rgb(0,144,72)] hover:border-green-600">
                + Create New
              </div>
            </Link>

            {isFetcing && (
              <div>
                <RestartAltIcon className="animate-spin" /> Fetching data
              </div>
            )}

            {bills?.map((bill: any, index) => (
              <div
                key={index}
                className="flex items-center border-b-[1px border-[rgb(141,141,141)] relative"
              >
                {isLoading && bill._id === delId ? (
                  <div className="px-[5px] py-[10px]">
                    <RestartAltIcon className="animate-spin" />{" "}
                    <span className=" text-green-600 font-bold text-[18px]">
                      Deleting
                    </span>
                  </div>
                ) : (
                  <>
                    <DeleteRoundedIcon
                      className="hover:bg-gray-300/40 rounded-2xl p-1"
                      style={{
                        fontSize: "30px",
                        cursor: "pointer",
                        color: "black",
                      }}
                      onClick={() => handleBillOnDelete(bill._id)}
                    />
                    <Link
                      href={`/${username}/${bill.title}/${bill._id}`}
                      className="w-full my-[3px]"
                    >
                      <div
                        className={`text-center px-5 py-[10px] text-[14px] rounded-md hover:bg-neutral-500 hover:bg-opacity-10 ${
                          bill.title === billname ?
                          "font-bold text-[16px] bg-neutral-500 bg-opacity-10" : "font-[500]"
                        } flex items-center justify-between cursor-pointer`}
                      >
                        <div className="">{bill.title}</div>
                        {bill.title === billname && (
                          <ArrowRightIcon style={{ fontSize: "35px" }} />
                        )}
                      </div>
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <Link href="/login">
          <div className="flex items-center cursor-pointer" title="Log out">
            <AccountCircleIcon />
            <div className="text-[16px] font-bold text-black mx-[10px]">
              Log Out ({user.name})
            </div>
          </div>
        </Link>
      </div>

      {/* <---------------------- Phone View Sidebar -----------------------> */}
      <div className="block lg:hidden absolute z-10">
        <MenuIcon
          style={{
            fontSize: "35px",
            cursor: "pointer",
            padding: "5px",
            color: "black",
          }}
          onClick={() => setIsTrue(!isTrue)}
        />
        {isTrue && (
          <div className="bg-white p-[20px] w-[100vw] h-[calc(100vh-40px)] text-black flex flex-col justify-between">
            <div>
              <div>
                <Link href={`/${username}/create-new-bill`}>
                  <div
                    className="w-[100%] h-[40px] text-black p-[5px] mt-[30px] mb-[20px] text-[15px] font-bold cursor-pointer flex items-center justify-center rounded-md border-[1px] border-black duration-200 hover:text-[rgb(0,144,72)] hover:border-green-600"
                    onClick={() => {
                      setIsTrue(!isTrue);
                    }}
                  >
                    + Create New
                  </div>
                </Link>

                {isFetcing && (
                  <div>
                    <RestartAltIcon className="animate-spin" /> Fetching data
                  </div>
                )}

                {bills?.map((bill: any, index) => (
                  <div
                    key={index}
                    className="flex items-center border-b-[1px border-[rgb(141,141,141)] relative"
                  >
                    {isLoading && bill._id === delId ? (
                      <div>
                        <RestartAltIcon className="animate-spin" />{" "}
                        <span className="px-[5px] py-[5px] text-green-600 font-bold text-[18px]">
                          Deleting
                        </span>
                      </div>
                    ) : (
                      <>
                        <DeleteRoundedIcon
                          className="hover:bg-gray-300/40 rounded-2xl p-1"
                          style={{
                            fontSize: "30px",
                            cursor: "pointer",
                            color: "black",
                          }}
                          onClick={() => handleBillOnDelete(bill._id)}
                        />
                        <Link
                          href={`/${username}/${bill.title}/${bill._id}`}
                          className="w-full my-[5px]"
                        >
                          <div
                            className={`text-center px-5 py-[5px] rounded-md hover:bg-neutral-500 hover:bg-opacity-10 ${
                              bill.title === billname
                                ? "font-bold text-[20px]"
                                : "text-[14px] font-[500]"
                            } flex items-center justify-between cursor-pointer`}
                          >
                            <div className="">{bill.title}</div>
                            {bill.title === billname && (
                              <ArrowRightIcon style={{ fontSize: "30px" }} />
                            )}
                          </div>
                        </Link>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Link href="/login">
              <div className="flex items-center cursor-pointer" title="Log out">
                <AccountCircleIcon />
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
