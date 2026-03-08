import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Upload,
  ShieldCheck,
  FileText,
  TrendingUp,
  Activity,
} from "lucide-react";

interface Proof {
  id: number;
  file_name: string;
  file_hash: string;
  created_at: string;
}

const Dashboard = () => {
  const [reputation, setReputation] = useState<number>(0);
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const repRes = await API.get("/reputation/me");
      const proofRes = await API.get("/proofs/my");

      setReputation(repRes.data.score);
      setProofs(proofRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  };

  const uploadProof = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      await API.post("/proofs/upload", formData);
      await fetchData();
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  const comparisonData = [
    { name: "Traditional", score: 70 },
    { name: "Baseline", score: 84 },
    { name: "CredMate", score: reputation || 92 },
  ];

  const trendData = [
    { day: "Mon", score: 40 },
    { day: "Tue", score: 55 },
    { day: "Wed", score: 70 },
    { day: "Thu", score: 80 },
    { day: "Fri", score: reputation },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">CredMate Dashboard</h1>
            <span className="text-slate-400 text-sm">
              Trust & Proof Analytics
            </span>
          </div>

          {/* STAT CARDS */}
          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Reputation</p>
                <p className="text-3xl font-bold">{reputation}</p>
              </div>
              <ShieldCheck className="text-green-400" size={36} />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Total Proofs</p>
                <p className="text-3xl font-bold">{proofs.length}</p>
              </div>
              <FileText className="text-blue-400" size={36} />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Trust Level</p>
                <p className="text-3xl font-bold">
                  {reputation > 80 ? "High" : "Medium"}
                </p>
              </div>
              <TrendingUp className="text-indigo-400" size={36} />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Activity</p>
                <p className="text-3xl font-bold">{proofs.length * 3}</p>
              </div>
              <Activity className="text-yellow-400" size={36} />
            </div>

          </div>

          {/* GRAPH GRID */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Reputation Trend */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="mb-4 font-semibold">Reputation Trend</h2>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#6366f1"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Model Comparison */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="mb-4 font-semibold">Model Comparison</h2>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={comparisonData}>
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="score" fill="#6366f1" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* UPLOAD */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">

            <Upload size={40} className="mx-auto mb-3 text-indigo-400" />

            <label className="cursor-pointer">

              <input
                type="file"
                className="hidden"
                onChange={uploadProof}
              />

              <p className="text-slate-300">
                {loading ? "Uploading..." : "Upload verification proof"}
              </p>

            </label>

          </div>

          {/* PROOFS */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="font-semibold mb-4">Recent Proofs</h2>

            {proofs.length === 0 ? (
              <p className="text-slate-400">No proofs uploaded yet.</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {proofs.map((proof) => (
                  <div
                    key={proof.id}
                    className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-indigo-500 transition"
                  >
                    <p className="font-semibold">{proof.file_name}</p>

                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(proof.created_at).toLocaleString()}
                    </p>

                    <p className="text-xs text-slate-500 mt-2">
                      ID: {proof.id}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;