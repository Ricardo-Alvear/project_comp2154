import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CheckCircle2,
  FileText,
  Database,
  HardDrive,
  Clock,
  Download,
  Loader2,
} from "lucide-react";

export function FileTrackingProgressPage() {
  const [downloadHistory, setDownloadHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5001/api/v1/tax-records/logs",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setDownloadHistory(response.data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Calculate total storage from the logs
  const totalStorage = downloadHistory
    .reduce((acc, log) => {
      const size = parseFloat(log.fileSize) || 0;
      return acc + size;
    }, 0)
    .toFixed(2);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="font-bold uppercase tracking-widest text-[10px]">
          Syncing Records...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h1 className="text-4xl font-serif font-black tracking-tighter text-slate-900 uppercase">
          File Tracking Progress
        </h1>
        <p className="text-slate-400 font-medium mt-1 tracking-wide uppercase text-xs">
          System Records & Download History
        </p>
      </div>

      {/* DASHBOARD STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-center gap-5">
          <div className="p-4 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20">
            <Database size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Total Downloads
            </p>
            <p className="text-2xl font-serif font-black text-slate-900">
              {downloadHistory.length}
            </p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-center gap-5">
          <div className="p-4 bg-slate-800 text-white rounded-xl">
            <HardDrive size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Bandwidth Used
            </p>
            <p className="text-2xl font-serif font-black text-slate-900">
              {totalStorage} MB
            </p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-center gap-5">
          <div className="p-4 bg-emerald-500 text-white rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Last Download
            </p>
            <p className="text-2xl font-serif font-black text-slate-900">
              {downloadHistory.length > 0
                ? new Date(downloadHistory[0].downloadDate).toLocaleDateString()
                : "No Activity"}
            </p>
          </div>
        </div>
      </div>

      {/* ACTIVITY LIST */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-6">
          Recent Activity
        </h3>

        {downloadHistory.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              No download history found.
            </p>
          </div>
        ) : (
          downloadHistory.map((log, i) => (
            <div
              key={log._id || i}
              className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl hover:border-blue-600 transition-all shadow-sm group"
            >
              <div className="flex items-center gap-5">
                <div className="p-3 bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-xl transition-colors">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="font-black text-slate-800 uppercase tracking-tight leading-none mb-1">
                    {log.fileName}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    {new Date(log.downloadDate).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    • {log.fileSize}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                  <CheckCircle2 size={14} /> Downloaded
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
