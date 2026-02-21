import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

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
      await fetchData(); // refresh after upload
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto">

          {/* Title */}
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          {/* Reputation Card */}
          <div className="bg-white shadow rounded-xl p-6 mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-lg text-gray-600">Reputation Score</h2>
              <p className="text-4xl font-bold mt-2 text-black">
                {reputation}
              </p>
            </div>

            <div className="text-5xl">
              ⭐
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white shadow rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Upload New Proof
            </h2>

            <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-black transition">
              <input
                type="file"
                className="hidden"
                onChange={uploadProof}
              />
              {loading ? (
                <p className="text-gray-500">Uploading...</p>
              ) : (
                <p className="text-gray-500">
                  Click to upload file
                </p>
              )}
            </label>
          </div>

          {/* Proof List */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">
              My Proofs
            </h2>

            {proofs.length === 0 ? (
              <p className="text-gray-500">
                No proofs uploaded yet.
              </p>
            ) : (
              <div className="space-y-4">
                {proofs.map((proof) => (
                  <div
                    key={proof.id}
                    className="border p-4 rounded-lg flex justify-between items-center hover:shadow transition"
                  >
                    <div>
                      <p className="font-medium">
                        {proof.file_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(proof.created_at).toLocaleString()}
                      </p>
                    </div>

                    <span className="text-xs bg-gray-100 px-3 py-1 rounded">
                      ID: {proof.id}
                    </span>
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