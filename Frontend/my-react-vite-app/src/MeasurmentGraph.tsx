import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Measurement {
  id: number;
  timestamp: string;
  deviceId: number;
  measurementValue: number;
}

interface MeasurementGraphProps {
  deviceId: number;
}

const MeasurementGraph: React.FC<MeasurementGraphProps> = ({ deviceId }) => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadMeasurements = async () => {
    try {
      const result = await axios.get(
        `http://monitoring.localhost:82/monitor/getAllByDeviceId/${deviceId}`
      );
      setMeasurements(result.data);
      setError(null);
    } catch (error) {
      console.error("Failed to load measurements:", error);
      setError("Failed to load measurements. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeasurements();
  }, [deviceId]);

  if (loading) return <div>Loading measurements...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={measurements.map((m) => ({
          timestamp: new Date(m.timestamp).toLocaleTimeString(),
          measurementValue: m.measurementValue,
        }))}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="measurementValue"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MeasurementGraph;
