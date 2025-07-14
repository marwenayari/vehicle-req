"use client";

import { useState } from "react";
import { saveAs } from "file-saver";

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
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">PDF Form Filler</h1>
      <button
        onClick={handleGenerate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate PDF"}
      </button>
      {pdfUrl && (
        <div className="mt-8">
          <iframe
            src={pdfUrl}
            title="Generated PDF"
            width="100%"
            height="600px"
            style={{ border: "1px solid #ccc" }}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
