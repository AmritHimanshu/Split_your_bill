import Sidebar from "./components/Sidebar";

export default function Home() {
  const getData = async () => {
    try {
      const res = await fetch('http://localhost:5000', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if(data) {
        window.alert(data.message);
      }
      else console.log("error")
    } catch (error) {
      console.log(error);
    }
  };
  // getData();

  return (
    <div className="flex h-[100vh] bg-green-600">
      <Sidebar />
      <div className="w-[75%] py-[20px] flex overflow-y-auto">
        <div className="w-[100%] flex align-center justify-center text-[20px] font-bold text-[rgb(255,255,216)] tracking-wide cursor-default">
          Select the bill
        </div>
      </div>
    </div>
  );
}
