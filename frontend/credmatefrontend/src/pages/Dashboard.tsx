import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Upload, ShieldCheck, FileText } from "lucide-react";

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

  const chartData = [
    { name: "Traditional", score: 70 },
    { name: "Baseline", score: 84 },
    { name: "CredMate", score: reputation || 92 },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <h1 className="text-3xl font-bold">Dashboard</h1>

          {/* Stat Cards */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white shadow-lg rounded-xl p-6 flex justify-between items-center">
              <div>
                <p className="text-gray-500">Reputation Score</p>
                <p className="text-4xl font-bold">{reputation}</p>
              </div>
              <ShieldCheck size={40} className="text-green-500" />
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6 flex justify-between items-center">
              <div>
                <p className="text-gray-500">Total Proofs</p>
                <p className="text-4xl font-bold">{proofs.length}</p>
              </div>
              <FileText size={40} className="text-blue-500" />
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6 flex justify-between items-center">
              <div>
                <p className="text-gray-500">Trust Level</p>
                <p className="text-4xl font-bold">
                  {reputation > 80 ? "High" : "Medium"}
                </p>
              </div>
              ⭐
            </div>

          </div>

          {/* Reputation Progress */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="font-semibold mb-4">Reputation Progress</h2>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${reputation}%` }}
              ></div>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Your credibility score based on verified proofs.
            </p>
          </div>

          {/* Graph Section */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="font-semibold mb-4">Model Comparison</h2>

            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="font-semibold mb-4">Upload Proof</h2>

            <label className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-black transition flex flex-col items-center gap-3">

              <Upload size={32} />

              <input
                type="file"
                className="hidden"
                onChange={uploadProof}
              />

              {loading ? "Uploading..." : "Click to upload file"}
            </label>
          </div>

          {/* Proof List */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="font-semibold mb-4">My Proofs</h2>

            {proofs.length === 0 ? (
              <p className="text-gray-500">No proofs uploaded yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {proofs.map((proof) => (
                  <div
                    key={proof.id}
                    className="border p-4 rounded-lg hover:shadow-md transition"
                  >
                    <p className="font-semibold">{proof.file_name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(proof.created_at).toLocaleString()}
                    </p>
                    <p className="text-xs mt-2 text-gray-400">
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