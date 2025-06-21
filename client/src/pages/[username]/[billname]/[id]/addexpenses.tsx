import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { LOGIN } from "@/utils/Paths/paths";
import { ADD_AMOUNT, GET_SINGLE_BILL } from "@/utils/Apis/api";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Message from "@/pages/components/Message";

function Addexpenses() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const router = useRouter();
  const { username, billname, id } = router.query;

  const [selectedMember, setSelectedMember] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [billData, setBillData] = useState<any>();
  const [message, setMessage] = useState({ text: "", type: "" });
  const [selectedMemberError, setSelectedMemberError] = useState("");
  const [inputAmountError, setInputAmountError] = useState("");

  const getSingleBill = async () => {
    try {
      const res = await fetch(`${BASE_URL}/${id}/${GET_SINGLE_BILL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 401) {
        router.push(LOGIN);
      }

      const data = await res.json();

      if (res.status !== 200) {
        setMessage({ text: data.error, type: "error" });
        const error = new Error(data.error);
        throw error;
      }

      setBillData(data);
    } catch (error) {}

    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 2000);
  };

  useEffect(() => {
    {
      id && getSingleBill();
    }
  }, [id]);

  const addAmount = async () => {
    setSelectedMemberError("");
    setInputAmountError("");
    setMessage({ text: "", type: "" });

    let hasError = false;

    if (!selectedMember) {
      setSelectedMemberError("Member is required.");
      hasError = true;
    }

    if (!inputAmount) {
      setInputAmountError("Amount is required.");
      hasError = true;
    }

    if (!/^\d*$/.test(inputAmount)) {
      setInputAmount("");
      setInputAmountError("Enter the number.");
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/${ADD_AMOUNT}/${id}`, {
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
        router.push(LOGIN);
      }

      const data = await res.json();

      if (res.status !== 200) {
        setMessage({ text: data.error, type: "error" });
        const error = new Error(data.error);
        throw error;
      }

      setBillData(data);
      setSelectedMember("");
      setInputAmount("");
      router.push(`/${username}/${billname}/${id}`);
    } catch (error) {}

    setIsLoading(false);
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 2000);
  };

  return (
    <div className="bg-green-100 bg-opacity-25 h-screen flex items-center justify-center relative">
      {message.text && message.type && (
        <Message text={message.text} type={message.type} />
      )}

      <div className="min-w-[400px] md:w-[500px] bg-white p-[15px] md:p-[20px] shadow-xl rounded-md">
        <div className="flex items-center justify-between p-[2px]">
          <div className="text-[15px] md:text-[19px] font-bold">Add Spends</div>
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
            {selectedMemberError && (
              <p className="text-red-600 text-sm">{selectedMemberError}</p>
            )}
          </div>

          <div className="pt-[20px]">
            <label htmlFor="spend">Amount:</label>
            <input
              type="number"
              id="spend"
              name="spend"
              value={inputAmount}
              className="text-[15px] md:text-[18px] w-full outline-0 placeholder:text-[15px]"
              onChange={(e) => setInputAmount(e.target.value)}
            />
            <hr className="border-[1px] border-[rgb(116,116,116)]" />
            {inputAmountError && (
              <p className="text-red-600 text-sm">{inputAmountError}</p>
            )}
          </div>

          <button
            className="p-[8px] md:p-[10px] mt-[25px] w-[100%] text-center text-white bg-[rgb(0,144,72)] font-bold rounded-md cursor-pointer"
            onClick={addAmount}
          >
            {isLoading ? (
              <div>
                <RestartAltIcon className="animate-spin" /> Adding
              </div>
            ) : (
              <div>Add</div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addexpenses;
