"use client";

import { useState } from "react";
// @TODO use later
// import { saveAs } from "file-saver";
import Head from "next/head";
import { USERS } from "@/constants/users";
import { VEHICLES } from "@/constants/vehicles";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [vehicleSearch, setVehicleSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const filteredVehicles = VEHICLES.filter(
    (v) =>
      v.vehicleBrand.includes(vehicleSearch) ||
      v.vehicleModel.includes(vehicleSearch) ||
      v.vehiclePlateNumber.includes(vehicleSearch)
  );
  const filteredUsers = USERS.filter((u) => u.name.includes(userSearch));

  const handleGenerate = async () => {
    if (!selectedVehicle || !selectedUser)
      return alert("يرجى اختيار المركبة والشخص");
    setLoading(true);
    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedVehicleIdx: Number(selectedVehicle),
          selectedUserIdx: Number(selectedUser),
        }),
      });
      if (!res.ok) throw new Error("Failed to generate PDF");
      const data = await res.json();
      setPdfUrl(data.url);
    } catch (err) {
      alert("PDF generation failed");
      console.error("Error generating PDF:", err);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Cairo:wght@700&display=swap"
        />
        <style>{`
          .amiri { font-family: Cairo, serif; }
        `}</style>
      </Head>
      <main
        className="min-h-screen bg-teal-50 flex flex-col items-center px-2 py-4 md:px-0"
        dir="rtl"
      >
        <h1 className="amiri text-xl md:text-2xl font-bold text-teal-800 mb-4 text-center">
          طلب مركبة لأداء مهمة رسمية
        </h1>
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-4 flex flex-col gap-6">
          <div>
            <label className="amiri block text-sm font-bold mb-2 text-gray-700">
              اختر المركبة
            </label>
            <input
              type="text"
              placeholder="ابحث عن مركبة..."
              value={vehicleSearch}
              onChange={(e) => setVehicleSearch(e.target.value)}
              className="text-slate-600 amiri w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 text-right"
            />
            <div className="grid grid-cols-2 gap-2">
              {filteredVehicles.map((v: any) => (
                <button
                  key={v.vehiclePlateNumber}
                  onClick={() =>
                    setSelectedVehicle(VEHICLES.indexOf(v).toString())
                  }
                  className={`amiri px-2 py-2 rounded-lg border text-sm font-bold transition-all duration-150 ${
                    selectedVehicle === VEHICLES.indexOf(v).toString()
                      ? "bg-teal-500 text-white border-teal-500"
                      : "bg-gray-100 text-gray-700 border-gray-100"
                  }`}
                >
                  {v.vehicleBrand} - {v.vehicleModel}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="amiri block text-sm font-bold mb-2 text-gray-700">
              اختر الشخص
            </label>
            <input
              type="text"
              placeholder="ابحث عن شخص..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="text-slate-600 amiri w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-2 text-right"
            />
            <div className="grid grid-cols-2 gap-2">
              {filteredUsers.map((u) => (
                <button
                  key={u.nationalId}
                  onClick={() => setSelectedUser(USERS.indexOf(u).toString())}
                  className={`amiri px-2 py-2 rounded-lg border text-sm font-bold transition-all duration-150 ${
                    selectedUser === USERS.indexOf(u).toString()
                      ? "bg-teal-500 text-white border-teal-500"
                      : "bg-gray-100 text-gray-700 border-gray-100"
                  }`}
                >
                  {u.name}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleGenerate}
            className="amiri bg-gradient-to-r from-teal-600 to-teal-400 hover:from-teal-700 hover:to-teal-500 text-white px-6 py-2 rounded-lg shadow-lg text-lg font-bold transition-all duration-200"
            disabled={loading || !selectedVehicle || !selectedUser}
          >
            {loading ? "...جاري الإنشاء" : "إنشاء النموذج"}
          </button>
        </div>
        {pdfUrl && (
          <div className="w-full max-w-md mt-6 shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src={pdfUrl}
              title="Generated PDF"
              width="100%"
              height="400px"
              style={{ border: "none" }}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
