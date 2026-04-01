import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Bell, Plus, Calendar, Trash2, Clock, Loader2 } from "lucide-react";

// Use Vite environment variable for the API base URL
// Fallback to localhost:5001 for local development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// Create an Axios instance that dynamically uses the correct URL
const API = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
});

// Helper to get auth headers consistently
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    deadline: "",
  });

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      // Added auth headers for secure fetching
      const { data } = await API.get("/notifications", getAuthHeaders());
      const docs = data.notifications || data || [];
      setNotifications(Array.isArray(docs) ? docs : []);
    } catch (error) {
      console.error("Fetch error:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.deadline) {
      alert("Title and Deadline are required.");
      return;
    }

    try {
      // Added auth headers for secure creation
      const { data } = await API.post(
        "/notifications",
        formData,
        getAuthHeaders(),
      );
      const newNote = data.notification || data;
      setNotifications((prev) => [newNote, ...prev]);
      setFormData({ title: "", content: "", deadline: "" });
    } catch (err) {
      console.error("Error creating notification:", err);
      alert(err.response?.data?.message || "Failed to create notification.");
    }
  };

  const handleDelete = async (id) => {
    try {
      // Added auth headers for secure deletion
      await API.delete(`/notifications/${id}`, getAuthHeaders());
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-700">
      <div className="mb-10">
        <h1 className="text-4xl font-serif font-black tracking-tighter text-slate-900 uppercase flex items-center gap-3">
          <Bell className="text-blue-600" size={32} /> Notification Vault
        </h1>
        <p className="text-slate-400 font-medium mt-1 tracking-wide uppercase text-xs">
          Secure Broadcast Management
        </p>
      </div>

      {/* FORM SECTION */}
      <form
        onSubmit={handleAdd}
        className="bg-slate-50 p-8 rounded-3xl border border-slate-200 mb-12 shadow-sm space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="w-full p-4 rounded-xl border border-slate-200 focus:border-blue-600 outline-none transition-all"
            placeholder="Notification Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <div className="relative">
            <Clock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="date"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-blue-600 outline-none transition-all"
              value={formData.deadline}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deadline: e.target.value,
                })
              }
            />
          </div>
        </div>

        <textarea
          className="w-full p-4 rounded-xl border border-slate-200 focus:border-blue-600 outline-none transition-all h-24 resize-none"
          placeholder="Content (Optional)..."
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-10 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-md hover:bg-blue-700 transition-all active:scale-95"
          >
            <Plus size={16} className="inline mr-2" /> Create Alert
          </button>
        </div>
      </form>

      {/* NOTIFICATION LIST */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
            <Loader2 className="animate-spin mb-4" size={32} />
            <p className="uppercase text-[10px] font-bold tracking-widest">
              Accessing Secure Records...
            </p>
          </div>
        ) : notifications.length === 0 ? (
          <p className="text-center text-slate-400 py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 uppercase text-[10px] font-bold tracking-widest">
            No active notifications in the vault.
          </p>
        ) : (
          notifications.map((note) => (
            <div
              key={note._id}
              className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex justify-between items-center group hover:border-blue-600 transition-all"
            >
              <div className="flex-1">
                <h3 className="font-black text-lg text-slate-800 uppercase tracking-tight">
                  {note.title}
                </h3>
                <p className="text-slate-500 text-sm mt-1 mb-4 leading-relaxed">
                  {note.content || "No additional information provided."}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  <Calendar size={14} /> Deadline:{" "}
                  {new Date(note.deadline).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={() => handleDelete(note._id)}
                className="ml-6 p-4 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                title="Remove Record"
              >
                <Trash2 size={22} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
