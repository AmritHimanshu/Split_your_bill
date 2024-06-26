import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import CloseIcon from "@mui/icons-material/Close";

function BillPage() {
  const [isTrue, setIsTrue] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");
  const [inputAmount, setInputAmount] = useState("");

  return (
    <div className="flex h-[100vh] bg-green-600">
      <Sidebar />
      <div className="w-[75%] py-[20px] flex overflow-y-auto">
        <div className="py-[10px] px-[20px] w-[100%]">
          <div className="px-[10px] pb-[10px] flex align-center justify-between">
            <div>
              <div className="text-[27px] font-bold text-white">
                Jammu & Kashmir
              </div>
              <div className="text-[14px] text-white">25/06/2024</div>
            </div>

            {!isTrue && (
              <div
                className="bg-white text-green-700 h-max font-bold p-[5px] rounded-md cursor-pointer"
                onClick={() => setIsTrue(!isTrue)}
              >
                Add Spends
              </div>
            )}
          </div>
          <hr className="border-[1px] border-white" />

          <div className="mt-[10px] h-[93%] overflow-y-auto flex align-center justify-evenly flex-wrap relative">
            <div className="bg-white w-[350px] h-max m-[10px] py-[5px] px-[10px] rounded-md shadow-xl">
              <div className="text-[19px] font-bold text-[rgb(0,144,72)]">
                Himanshu
              </div>
              <div className="flex align-center justify-between">
                <div>Total spent</div>
                <div>₹375</div>
              </div>
              <hr className="border-[1px] border-[rgb(116,116,116)]" />
              <div className="font-bold mb-[3px] text-[rgb(76,76,76)]">
                Pay to
              </div>
              <div className="flex align-center justify-between my-[5px] border-b-[1px] border-green-600">
                <div>Dhiraj</div>
                <div className="border-b-[0px]"> ₹320</div>
              </div>
              <div className="flex align-center justify-between my-[5px] border-b-[1px] border-green-600">
                <div>Vikash</div>
                <div className="border-b-[0px]"> ₹290</div>
              </div>
              <div className="flex align-center justify-between my-[5px] border-b-[1px] border-green-600">
                <div>Ashish</div>
                <div className="border-b-[0px]"> ₹50</div>
              </div>
            </div>
            {/* ------------------------------------------------------ */}
            <div className="bg-white w-[350px] h-max m-[10px] py-[5px] px-[10px] rounded-md shadow-xl">
              <div className="text-[19px] font-bold text-[rgb(0,144,72)]">
                Himanshu
              </div>
              <div className="flex align-center justify-between">
                <div>Total spent</div>
                <div>₹375</div>
              </div>
              <hr className="border-[1px] border-[rgb(116,116,116)]" />
              <div className="font-bold mb-[3px] text-[rgb(76,76,76)]">
                Pay to
              </div>
              <div className="flex align-center justify-between my-[5px] border-b-[1px] border-green-600">
                <div>Dhiraj</div>
                <div className="border-b-[0px]"> ₹320</div>
              </div>
              <div className="flex align-center justify-between my-[5px] border-b-[1px] border-green-600">
                <div>Vikash</div>
                <div className="border-b-[0px]"> ₹290</div>
              </div>
              <div className="flex align-center justify-between my-[5px] border-b-[1px] border-green-600">
                <div>Ashish</div>
                <div className="border-b-[0px]"> ₹50</div>
              </div>
            </div>

            <div className="bg-white w-[350px] h-max m-[10px] py-[5px] px-[10px] rounded-md shadow-xl">
              <div className="text-[19px] font-bold text-[rgb(0,144,72)]">
                Himanshu
              </div>
              <div className="flex align-center justify-between">
                <div>Total spent</div>
                <div>₹375</div>
              </div>
              <hr className="border-[1px] border-[rgb(116,116,116)]" />
              <div className="font-bold mb-[3px] text-[rgb(76,76,76)]">
                Pay to
              </div>
              <div className="flex align-center justify-between my-[5px] border-b-[1px] border-green-600">
                <div>Dhiraj</div>
                <div className="border-b-[0px]"> ₹320</div>
              </div>
              <div className="flex align-center justify-between my-[5px] border-b-[1px] border-green-600">
                <div>Vikash</div>
                <div className="border-b-[0px]"> ₹290</div>
              </div>
              <div className="flex align-center justify-between my-[5px] border-b-[1px] border-green-600">
                <div>Ashish</div>
                <div className="border-b-[0px]"> ₹50</div>
              </div>
            </div>

            <div className="bg-white w-[350px] h-max m-[10px] py-[5px] px-[10px] rounded-md shadow-xl">
              <div className="text-[19px] font-bold text-[rgb(0,144,72)]">
                Himanshu
              </div>
              <div className="flex align-center justify-between">
                <div>Total spent</div>
                <div>₹375</div>
              </div>
              <hr className="border-[1px] border-[rgb(116,116,116)]" />
              <div className="font-bold mb-[3px] text-[rgb(76,76,76)]">
                Pay to
              </div>
              <div className="flex align-center justify-between my-[5px] border-b-[1px] border-green-600">
                <div>Dhiraj</div>
                <div className="border-b-[0px]"> ₹320</div>
              </div>
              <div className="flex align-center justify-between my-[5px] border-b-[1px] border-green-600">
                <div>Vikash</div>
                <div className="border-b-[0px]"> ₹290</div>
              </div>
              <div className="flex align-center justify-between my-[5px] border-b-[1px] border-green-600">
                <div>Ashish</div>
                <div className="border-b-[0px]"> ₹50</div>
              </div>
            </div>

            {/* ----------------------------------------------------- */}

            {isTrue && (
              <div className="fixed h-[90%] w-[75%] bg-green-600 flex align-center justify-center">
                <div className="w-[400px] h-max bg-white p-[10px] shadow-xl rounded-md">
                  <div className="flex align-center justify-between p-[2px]">
                    <div className="text-[19px] font-bold">Add Spends</div>
                    <div>
                      <CloseIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsTrue(!isTrue)}
                      />
                    </div>
                  </div>
                  <hr className="border-[1px] border-[rgb(116,116,116)]" />
                  <div>
                    <div>
                      <label
                        htmlFor="selectedFruit"
                        className="text-black text-[16px]"
                      >
                        Choose member:
                      </label>
                      <select
                        className="border-[1px] border-[rgb(85,85,85)]"
                        name="selectedFruit"
                        id="selectedFruit"
                        style={{ display: "block" }}
                        onChange={(e) => setSelectedMember(e.target.value)}
                      >
                        <option value="">Select member</option>
                        <option>Himanshu</option>
                        <option>Vikash</option>
                        <option>Dhiraj</option>
                        <option>Ashish</option>
                        <option>Rahul</option>
                      </select>
                    </div>

                    <div className="pt-[20px]">
                      <label htmlFor="spend">Amount:</label>
                      <input
                        type="text"
                        id="spend"
                        name="spend"
                        value={inputAmount}
                        className="text-[18px] w-full outline-0 placeholder:text-[15px]"
                        onChange={(e) => setInputAmount(e.target.value)}
                      />
                      <hr className="border-[1px] border-[rgb(116,116,116)]" />
                    </div>

                    <button className="p-[10px] mt-[25px] w-[100%] text-center bg-[rgb(0,144,72)] text-white font-bold border-2 border-white rounded-md cursor-pointer duration-300 hover:scale-105">Add</button>
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
