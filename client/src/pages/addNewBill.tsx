import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Sidebar from "./components/Sidebar";

function AddNewBill() {
  const [title, setTitle] = useState("");
  const [noOfInputs, setNoOfInputs] = useState([
    { memberName: "" },
    { memberName: "" },
  ]);

  const handleDeleteInput = (index: number) => {
    const newArray = [...noOfInputs];
    newArray.splice(index, 1);
    setNoOfInputs(newArray);
  };

  const handleAddInput = () => {
    setNoOfInputs([...noOfInputs, { memberName: "" }]);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    let onChangedValue = [...noOfInputs];
    onChangedValue[index].memberName = value;

    setNoOfInputs(onChangedValue);
  };

  return (
    <div className="flex h-[100vh] bg-green-600">
            <Sidebar />
            <div className="w-[75%] py-[20px] flex overflow-y-auto">
                <div className="bg-white p-[25px] rounded-md w-[500px] m-auto shadow-xl">
                    <div className="text-[20px] mb-[25px] text-[rgb(0,144,72)]">
                        Add New
                    </div>
                    <form className="space-y-5">
                        <div className="addNew-form-title space-y-2 border-b-2">
                            <label htmlFor="title" className="text-[rgb(87,87,87)] text-[17px]">Title</label>
                            <input className="text-[18px] w-full outline-0 placeholder:text-[15px]" id="title" name="title" type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        {noOfInputs.map((item, index) => (
                            <div key={index}>
                                <div className="addNew-form-member space-y-2 border-b-2">
                                    <label htmlFor={`member${index + 1}`} className="text-[rgb(87,87,87)] text-[17px]">Member {index + 1}:</label>
                                    <div className="flex align-center">
                                        <input className="text-[18px] w-full outline-0 placeholder:text-[15px]" id={`member${index + 1}`} name={`member${index + 1}`} value={item.memberName} type="text" placeholder="Enter name" onChange={(e) => handleOnChange(e, index)} />

                                        {index >= 2 && <DeleteIcon style={{ cursor: "pointer" }} onClick={() => handleDeleteInput(index)} />}
                                    </div>
                                </div>

                                {index === noOfInputs.length - 1 &&
                                    <div className="my-[20px] flex align-center max-w-max text-[rgb(57,57,57)] font-bold cursor-pointer" onClick={handleAddInput}>
                                        <AddCircleOutlineIcon style={{ marginRight: '5px' }} /> Add Members
                                    </div>
                                }
                            </div>
                        ))}

                        <button className="p-[10px] mt-[25px] w-[100%] text-center bg-[rgb(0,144,72)] text-white font-bold border-2 border-white rounded-md cursor-pointer duration-300 hover:scale-105">Create</button>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default AddNewBill;
