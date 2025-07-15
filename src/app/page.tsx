"use client";

import { useState } from "react";
import { saveAs } from "file-saver";
import Head from "next/head";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-pdf");
      if (!res.ok) throw new Error("Failed to generate PDF");
      const data = await res.json();
      setPdfUrl(data.url);
    } catch (err) {
      alert("PDF generation failed");
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
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1
          className="amiri text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center"
          style={{ letterSpacing: "1px" }}
        >
          طلب مركبة لأداء مهمة رسمية
        </h1>
        <button
          onClick={handleGenerate}
          className="amiri bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-8 py-3 rounded-lg shadow-lg text-xl font-bold transition-all duration-200 mb-8"
          disabled={loading}
          style={{ minWidth: "220px" }}
        >
          {loading ? "...جاري الإنشاء" : "إنشاء النموذج"}
        </button>
        {pdfUrl && (
          <div className="w-full max-w-[70vw] mt-4 shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src={pdfUrl}
              title="Generated PDF"
              width="100%"
              height="600px"
              style={{ border: "none" }}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
