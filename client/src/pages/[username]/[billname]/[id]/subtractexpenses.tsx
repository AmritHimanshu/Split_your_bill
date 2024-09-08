import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function Subtractexpenses() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const router = useRouter();
  const { username, billname, id } = router.query;

  const [selectedMember, setSelectedMember] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const subAmount = async () => {
    if (!selectedMember || !inputAmount) {
      return window.alert("Fill all the fields");
    }
    if (!/^\d*$/.test(inputAmount)) {
      setInputAmount("");
      return window.alert("Enter the number");
    }

    setIsLoading(true);
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

      if (res.status === 401) {
        setIsLoading(false);
        router.push("/login");
      }
      const data = await res.json();
      if (res.status !== 200) {
        setIsLoading(false);
        return window.alert(`${data.error}`);
      } else {
        setBillData(data);
        setInputAmount("");
        setIsLoading(false);
        router.push(`/${username}/${billname}/${id}`);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      window.alert(error);
    }
  };

  return (
    <div className="bg-green-100 bg-opacity-25 h-screen flex items-center justify-center">
      <div className="min-w-[400px] md:w-[500px] bg-white p-[15px] md:p-[20px] shadow-xl rounded-md">
        <div className="flex items-center justify-between p-[2px]">
          <div className="text-[15px] md:text-[19px] font-bold">
            Substract Spends
          </div>
          <Link href={`/${username}/${billname}/${id}`}>
            <CloseIcon
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={() => {}}
            />
          </Link>
        </div>
        <hr className="my-2 border-[1px] border-[rgb(116,116,116)]" />
        <div>
          <div className="space-y-3">
            <label
              htmlFor="selectMember"
              className="text-black text-[14px] md:text-[16px]"
            >
              Choose member:
            </label>
            <select
              className="border-[1px] border-[rgb(85,85,85)] text-[13px] md:text-[16px]"
              name="selectMember"
              id="selectMember"
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
            className="p-[8px] md:p-[10px] mt-[25px] w-[100%] text-center text-white bg-[rgb(0,144,72)] font-bold rounded-md cursor-pointer"
            onClick={subAmount}
          >
            {isLoading ? (
              <div>
                <RestartAltIcon className="animate-spin" /> Subtracting
              </div>
            ) : (
              <div>Subtract</div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Subtractexpenses;
