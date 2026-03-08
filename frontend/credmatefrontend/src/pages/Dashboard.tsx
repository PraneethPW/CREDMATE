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
  RadialBarChart,
  RadialBar
} from "recharts";

import {
  Upload,
  ShieldCheck,
  FileText,
  TrendingUp,
  Activity
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
      console.error(error);
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const trendData = [
    { day: "Mon", score: 40 },
    { day: "Tue", score: 60 },
    { day: "Wed", score: 70 },
    { day: "Thu", score: 80 },
    { day: "Fri", score: reputation }
  ];

  const comparisonData = [
    { name: "Traditional", score: 70 },
    { name: "Baseline", score: 84 },
    { name: "CredMate", score: reputation || 92 }
  ];

  const radialData = [
    {
      name: "Reputation",
      value: reputation,
      fill: "#6366f1"
    }
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-8">

        <div className="max-w-7xl mx-auto space-y-8">

          {/* HEADER */}

          <div className="flex justify-between items-center">

            <h1 className="text-3xl font-bold tracking-wide">
              CredMate Analytics
            </h1>

            <span className="text-slate-400 text-sm">
              Trust Intelligence Dashboard
            </span>

          </div>

          {/* STAT CARDS */}

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-slate-900/70 backdrop-blur border border-slate-800 rounded-xl p-6 hover:border-indigo-500 transition">

              <p className="text-slate-400 text-sm">Reputation Score</p>

              <div className="flex justify-between items-center mt-2">

                <h2 className="text-3xl font-bold">
                  {reputation}
                </h2>

                <ShieldCheck className="text-indigo-400" />

              </div>

            </div>

            <div className="bg-slate-900/70 backdrop-blur border border-slate-800 rounded-xl p-6 hover:border-blue-500 transition">

              <p className="text-slate-400 text-sm">Proofs Uploaded</p>

              <div className="flex justify-between items-center mt-2">

                <h2 className="text-3xl font-bold">
                  {proofs.length}
                </h2>

                <FileText className="text-blue-400" />

              </div>

            </div>

            <div className="bg-slate-900/70 backdrop-blur border border-slate-800 rounded-xl p-6 hover:border-green-500 transition">

              <p className="text-slate-400 text-sm">Trust Level</p>

              <div className="flex justify-between items-center mt-2">

                <h2 className="text-3xl font-bold">
                  {reputation > 80 ? "High" : "Medium"}
                </h2>

                <TrendingUp className="text-green-400" />

              </div>

            </div>

            <div className="bg-slate-900/70 backdrop-blur border border-slate-800 rounded-xl p-6 hover:border-yellow-500 transition">

              <p className="text-slate-400 text-sm">Activity Index</p>

              <div className="flex justify-between items-center mt-2">

                <h2 className="text-3xl font-bold">
                  {proofs.length * 3}
                </h2>

                <Activity className="text-yellow-400" />

              </div>

            </div>

          </div>

          {/* GRAPH GRID */}

          <div className="grid md:grid-cols-3 gap-6">

            {/* RADIAL REPUTATION */}

            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">

              <h3 className="mb-4 font-semibold">
                Reputation Index
              </h3>

              <ResponsiveContainer width="100%" height={220}>

                <RadialBarChart
                  innerRadius="70%"
                  outerRadius="100%"
                  data={radialData}
                  startAngle={180}
                  endAngle={0}
                >

                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                  />

                  <Tooltip />

                </RadialBarChart>

              </ResponsiveContainer>

            </div>

            {/* TREND GRAPH */}

            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">

              <h3 className="mb-4 font-semibold">
                Reputation Trend
              </h3>

              <ResponsiveContainer width="100%" height={220}>

                <LineChart data={trendData}>

                  <CartesianGrid stroke="#1e293b" />

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

            {/* MODEL COMPARISON */}

            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">

              <h3 className="mb-4 font-semibold">
                Model Comparison
              </h3>

              <ResponsiveContainer width="100%" height={220}>

                <BarChart data={comparisonData}>

                  <XAxis dataKey="name" stroke="#94a3b8" />

                  <YAxis stroke="#94a3b8" />

                  <Tooltip />

                  <Bar
                    dataKey="score"
                    fill="#6366f1"
                    radius={[6,6,0,0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* UPLOAD */}

          <div className="bg-slate-900/70 border border-dashed border-indigo-500 rounded-xl p-10 text-center hover:bg-slate-900 transition">

            <Upload
              size={40}
              className="mx-auto text-indigo-400 mb-4"
            />

            <label className="cursor-pointer">

              <input
                type="file"
                className="hidden"
                onChange={uploadProof}
              />

              <p className="text-slate-300">
                {loading ? "Uploading..." : "Upload Verification Proof"}
              </p>

            </label>

          </div>

        </div>

      </div>
    </>
  );
};

export default Dashboard;