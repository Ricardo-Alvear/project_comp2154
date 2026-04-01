import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FileDown,
  ShieldCheck,
  FolderArchive,
  Search,
  Loader2,
} from "lucide-react";

export function TaxFiles() {
  const [taxDocuments, setTaxDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Use Vite environment variable for the API base URL
  // Fallback to localhost:5001 for local development
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/api/v1/tax-records`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTaxDocuments(response.data);
      } catch (err) {
        console.error("Failed to fetch records", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [API_BASE_URL]);

  const handleDownload = async (id, type, year) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        return;
      }

      // 1. Fetch the file blob from the dynamic URL
      const response = await axios({
        url: `${API_BASE_URL}/api/v1/tax-records/download/${id}`,
        method: "GET",
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });

      // 2. Trigger browser download
      const fileName = `${type.replace(/\s+/g, "_")}_${year}.pdf`;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      // 3. LOG THE DOWNLOAD TO DATABASE via dynamic URL
      await axios.post(
        `${API_BASE_URL}/api/v1/tax-records/log`,
        {
          fileName: fileName,
          fileSize: (response.data.size / 1024 / 1024).toFixed(2) + " MB",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error) {
      console.error("Download or logging failed:", error);
      alert("Could not complete the process. Please check your connection.");
    }
  };

  const filteredDocs = taxDocuments.filter(
    (doc) =>
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-100 pb-8">
        <div>
          <h1 className="text-4xl font-serif font-black tracking-tighter text-slate-900 uppercase">
            Secure Tax Vault
          </h1>
          <p className="text-slate-400 font-medium mt-1 tracking-wide uppercase text-xs">
            Access and download your verified financial records
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-600 w-64"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="animate-spin mb-4" size={40} />
          <p className="font-bold uppercase tracking-widest text-[10px]">
            Decrypting Vault...
          </p>
        </div>
      ) : filteredDocs.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
          <FolderArchive size={48} className="mx-auto mb-4 text-slate-300" />
          <p className="text-slate-500 font-medium">
            No tax records found in your vault.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDocs.map((doc) => (
            <div
              key={doc._id}
              className="group relative bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:border-blue-600 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <FolderArchive size={28} strokeWidth={1.5} />
                </div>
                <span className="text-2xl font-serif font-black text-slate-200 group-hover:text-blue-100 transition-colors">
                  {doc.year}
                </span>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                  {doc.type}
                </h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Ref: {doc.id}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                  <ShieldCheck size={14} /> {doc.status}
                </div>
                <button
                  onClick={() => handleDownload(doc.id, doc.type, doc.year)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-md hover:bg-blue-700 transition-all"
                >
                  <FileDown size={16} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
