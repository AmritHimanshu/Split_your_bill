import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";

function BillPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const router = useRouter();
  const { username, billname, id } = router.query;

  const [billData, setBillData] = useState<any>();

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

        if (res.status === 401) router.push("/login");
      } catch (error) {
        console.log(error);
        router.push("/login");
      }
    };

    const getSingleBill = async () => {
      try {
        const res = await fetch(`${BASE_URL}/${id}/getsinglebill`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (res.status === 401) router.push("/login");
        const data = await res.json();
        if (res.status === 422) return window.alert(`${data.error}`);
        setBillData(data);
      } catch (error) {
        console.log(error);
      }
    };

    {
      id && getSingleBill();
    }
    getData();
  }, [router, id, BASE_URL]);

  return (
    <div className="flex h-[100vh] bg-green-100 bg-opacity-25">
      <Sidebar />
      <div className="w-[100%] lg:w-[75% py-[20px] flex">
        <div className="py-[10px] md:px-[20px] w-[100%]">
          <div className="px-[10px] py-[5px] flex items-center justify-between">
            <div className="space-y-2">
              <div className="text-[20px] md:text-[27px] font-bold text-black">
                {billData?.title}
              </div>
              <div className="text-[11px] md:text-[14px] text-black">
                {billData &&
                  new Date(billData?.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 md:space-x-5">
              <Link
                href={`/${username}/${billname}/${id}/addexpenses`}
                className="bg-green-700 text-white h-max md:font-bold p-[3px] md:p-[6px] rounded-sm md:rounded-md cursor-pointer"
              >
                + Expenses
              </Link>
              <Link
                href={`/${username}/${billname}/${id}/subtractexpenses`}
                className="bg-green-700 text-white h-max md:font-bold p-[3px] md:p-[6px] rounded-sm md:rounded-md cursor-pointer"
              >
                - Expenses
              </Link>
            </div>
          </div>
          <hr className="border-[1px] border-black" />

          <div className="mt-[15px] h-[92%] overflow-y-auto flex items-center justify-evenly flex-wrap relative">
            {billData?.members &&
              billData?.members.map((member: any, index: any) => (
                <div
                  key={index}
                  className="bg-white w-[360px] h-max mx-5 my-7 p-5 rounded-md shadow-xl"
                >
                  <div className="text-[16px] md:text-[19px] text-center font-bold text-[rgb(0,144,72)] mb-2">
                    {member.name}
                  </div>
                  <div className="flex items-center justify-between text-gray-700 text-sm md:text-md font-[600]">
                    <div>Total expenses</div>
                    <div>₹{member.totalSpends}</div>
                  </div>
                  <hr className="my-2 border-[1px] border-[rgb(116,116,116)]" />
                  <div className="font-bold mb-[3px] text-sm md:text-md text-[rgb(76,76,76)]">
                    Pay to
                  </div>
                  {billData?.members.map(
                    (mbr: any, idx: any) =>
                      idx !== index && (
                        <>
                          <div
                            key={idx}
                            className="flex items-center justify-between my-4 text-sm"
                          >
                            <div>{mbr?.name}</div>
                            <div className="border-b-[0px]">
                              {Number(member?.totalSpends) /
                                billData.members.length >=
                              Number(mbr?.totalSpends) /
                                billData.members.length ? (
                                <div> ₹0</div>
                              ) : (
                                <div>
                                  ₹
                                  {Number(mbr?.totalSpends) /
                                    billData.members.length -
                                    Number(member?.totalSpends) /
                                      billData.members.length}
                                </div>
                              )}
                            </div>
                          </div>
                          <hr className="border-b-[1px] border-gray-200" />
                        </>
                      )
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillPage;
