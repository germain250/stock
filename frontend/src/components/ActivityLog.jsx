import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getAllLogs } from "../services/apiService";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logs = await getAllLogs();
        const enrichedLogs = await Promise.all(
          logs.map(async (log) => {
            try {
              // Fetch user details
              const userResponse = await axios.get(
                `http://localhost:3000/auth/user/${log.user?._id}`
              );
              const user = userResponse.data;
              return {
                id: log._id,
                icon: getIcon(log.action),
                message: `${user.username} (${user.role}) - ${log.action}: ${log.details || "No details provided"}`,
                time: new Date(log.timestamp).toLocaleString(),
              };
            } catch (userError) {
              console.error(`Failed to fetch user for log ${log._id}`, userError);
              return {
                id: log._id,
                icon: getIcon(log.action),
                message: `${log.action}: ${log.details || "No details provided"}`,
                time: new Date(log.timestamp).toLocaleString(),
              };
            }
          })
        );
        setLogs(enrichedLogs);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load logs", err);
        setError("Failed to load activity logs.");
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const getIcon = (action) => {
    switch (action?.toLowerCase()) {
      case "added":
        return <FaPlus className="text-green-500" />;
      case "updated":
        return <FaEdit className="text-blue-500" />;
      case "deleted":
        return <FaTrash className="text-red-500" />;
      default:
        return <FaEdit className="text-gray-500" />;
    }
  };

  if (loading) return <p>Loading logs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white rounded-lg lg:h-80 overflow-scroll shadow p-4 mt-8 mb-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Activity Log</h2>
      <ul className="space-y-4">
        {logs.map((log) => (
          <li
            key={log.id}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100"
          >
            <div className="text-2xl">{log.icon}</div>
            <div className="flex-1">
              <p className="text-gray-700 font-medium">{log.message}</p>
              <p className="text-sm text-gray-500">{log.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
