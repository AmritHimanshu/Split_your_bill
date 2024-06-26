import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import CloseIcon from "@mui/icons-material/Close";

function BillPage() {
  const BASE_URL = "http://localhost:5000";

  const router = useRouter();
  const { id } = router.query;

  const [isAddTrue, setIsAddTrue] = useState(false);
  const [isSubTrue, setIsSubTrue] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  const [inputAmount, setInputAmount] = useState("");
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
  }, [router, id]);

  const addAmount = async () => {
    if (!selectedMember || !inputAmount) {
      return window.alert("Fill all the fields");
    }
    if (!/^\d*$/.test(inputAmount)) {
      setInputAmount("");
      return window.alert("Enter the number");
    }

    try {
      const res = await fetch(`${BASE_URL}/addAmount/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          selectedMember,
          inputAmount,
        }),
      });

      if (res.status === 401) router.push("/login");
      const data = await res.json();
      if (res.status !== 200) {
        return window.alert(`${data.error}`);
      } else {
        setBillData(data);
        setInputAmount("");
        setIsAddTrue(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const subAmount = async () => {
    if (!selectedMember || !inputAmount) {
      return window.alert("Fill all the fields");
    }
    if (!/^\d*$/.test(inputAmount)) {
      setInputAmount("");
      return window.alert("Enter the number");
    }

    try {
      const res = await fetch(`${BASE_URL}/subAmount/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          selectedMember,
          inputAmount,
        }),
      });

      if (res.status === 401) router.push("/login");
      const data = await res.json();
      if (res.status !== 200) {
        return window.alert(`${data.error}`);
      } else {
        setBillData(data);
        setInputAmount("");
        setIsSubTrue(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-[100vh] bg-green-600">
      <Sidebar />
      <div className="w-[100%] lg:w-[75%] py-[20px] flex overflow-y-auto">
        <div className="py-[10px] md:px-[20px] w-[100%]">
          <div className="px-[10px] py-[5px] flex items-center justify-between">
            <div>
              <div className="text-[20px] md:text-[27px] font-bold text-white">
                {billData?.title}
              </div>
              <div className="text-[11px] md:text-[14px] text-white">
                {billData &&
                  new Date(billData?.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </div>
            </div>

            {!isAddTrue && !isSubTrue && (
              <div className="flex items-center justify-center space-x-2 md:space-x-3">
                <div
                  className="bg-white text-green-700 h-max md:font-bold p-[3px] md:p-[4px] rounded-sm md:rounded-md cursor-pointer"
                  onClick={() => setIsAddTrue(!isAddTrue)}
                >
                  + Money
                </div>
                <div
                  className="bg-white text-green-700 h-max md:font-bold p-[3px] md:p-[4px] rounded-sm md:rounded-md cursor-pointer"
                  onClick={() => setIsSubTrue(!isSubTrue)}
                >
                  - Money
                </div>
              </div>
            )}
          </div>
          <hr className="border-[1px] border-white" />

          <div className="mt-[10px] h-[93%] overflow-y-auto flex items-center justify-evenly flex-wrap relative">
            {billData?.members &&
              billData?.members.map((member: any, index: any) => (
                <div
                  key={index}
                  className="bg-white w-[350px] h-max m-[10px] py-[5px] px-[10px] rounded-md shadow-xl"
                >
                  <div className="text-[16px] md:text-[19px] font-bold text-[rgb(0,144,72)]">
                    {member.name}
                  </div>
                  <div className="flex items-center justify-between text-gray-700 text-sm md:text-md">
                    <div>Total spent</div>
                    <div>₹{member.totalSpends}</div>
                  </div>
                  <hr className="my-1 border-[1px] border-[rgb(116,116,116)]" />
                  <div className="font-bold mb-[3px] text-sm md:text-md text-[rgb(76,76,76)]">
                    Pay to
                  </div>
                  {billData?.members.map(
                    (mbr: any, idx: any) =>
                      idx !== index && (
                        <div
                          key={idx}
                          className="flex items-center justify-between my-[5px] border-b-[1px] border-green-600 text-sm"
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
                      )
                  )}
                </div>
              ))}

            {isAddTrue && (
              <div className="fixed h-[90%] w-[100%] lg:w-[75%] bg-green-600 flex items-center justify-center">
                <div className="w-[400px] h-max bg-white p-[10px] shadow-xl rounded-md">
                  <div className="flex items-center justify-between p-[2px]">
                    <div className="text-[15px] md:text-[19px] font-bold">Add Spends</div>
                    <div>
                      <CloseIcon
                        style={{ cursor: "pointer", fontSize:"20px" }}
                        onClick={() => setIsAddTrue(!isAddTrue)}
                      />
                    </div>
                  </div>
                  <hr className="my-2 border-[1px] border-[rgb(116,116,116)]" />
                  <div>
                    <div>
                      <label
                        htmlFor="selectedFruit"
                        className="text-black text-[14px] md:text-[16px]"
                      >
                        Choose member:
                      </label>
                      <select
                        className="border-[1px] border-[rgb(85,85,85)] text-[13px] md:text-[16px]"
                        name="selectedFruit"
                        id="selectedFruit"
                        style={{ display: "block" }}
                        onChange={(e) => setSelectedMember(e.target.value)}
                      >
                        <option value="">Select member</option>
                        {billData?.members.map((member: any, index: any) => (
                          <option key={index} value={member._id}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-[20px]">
                      <label htmlFor="spend">Amount:</label>
                      <input
                        type="text"
                        id="spend"
                        name="spend"
                        value={inputAmount}
                        className="text-[15px] md:text-[18px] w-full outline-0 placeholder:text-[15px]"
                        onChange={(e) => setInputAmount(e.target.value)}
                      />
                      <hr className="border-[1px] border-[rgb(116,116,116)]" />
                    </div>

                    <button
                      className="p-[10px] mt-[25px] w-[100%] text-center bg-[rgb(0,144,72)] text-white font-bold border-2 border-white rounded-md cursor-pointer duration-300 hover:scale-105"
                      onClick={addAmount}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isSubTrue && (
              <div className="fixed h-[90%] w-[100%] lg:w-[75%] bg-green-600 flex items-center justify-center">
                <div className="w-[400px] h-max bg-white p-[10px] shadow-xl rounded-md">
                  <div className="flex items-center justify-between p-[2px]">
                  <div className="text-[15px] md:text-[19px] font-bold">Substract Spends</div>
                    <div>
                      <CloseIcon
                        style={{ cursor: "pointer", fontSize:"20px" }}
                        onClick={() => setIsSubTrue(!isSubTrue)}
                      />
                    </div>
                  </div>
                  <hr className="my-2 border-[1px] border-[rgb(116,116,116)]" />
                  <div>
                  <div>
                      <label
                        htmlFor="selectedFruit"
                        className="text-black text-[14px] md:text-[16px]"
                      >
                        Choose member:
                      </label>
                      <select
                        className="border-[1px] border-[rgb(85,85,85)] text-[13px] md:text-[16px]"
                        name="selectedFruit"
                        id="selectedFruit"
                        style={{ display: "block" }}
                        onChange={(e) => setSelectedMember(e.target.value)}
                      >
                        <option value="">Select member</option>
                        {billData?.members.map((member: any, index: any) => (
                          <option key={index} value={member._id}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-[20px]">
                      <label htmlFor="spend">Amount:</label>
                      <input
                        type="text"
                        id="spend"
                        name="spend"
                        value={inputAmount}
                        className="text-[15px] md:text-[18px] w-full outline-0 placeholder:text-[15px]"
                        onChange={(e) => setInputAmount(e.target.value)}
                      />
                      <hr className="border-[1px] border-[rgb(116,116,116)]" />
                    </div>

                    <button
                      className="p-[10px] mt-[25px] w-[100%] text-center bg-[rgb(0,144,72)] text-white font-bold border-2 border-white rounded-md cursor-pointer duration-300 hover:scale-105"
                      onClick={subAmount}
                    >
                      Substract
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillPage;
