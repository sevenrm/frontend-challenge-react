import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnalysis } from "../../api/getAnalysis";
import { ResponsiveBar } from "@nivo/bar";

interface AnalysisData {
  origin: string;
  value: string[];
  insight_name: string;
  name: string;
}

const Analysis: React.FC = () => {
  const { MODEL_NAME } = useParams<{ MODEL_NAME: string }>();
  const [analysisData, setAnalysisData] = useState<AnalysisData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAnalysisData();
  }, []);

  const fetchAnalysisData = async () => {
    try {
      const response = await getAnalysis(MODEL_NAME ?? "");
      const responseData = response.data || [];
      setAnalysisData(responseData);
    } catch (error) {
      console.error("Error fetching analysis data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">{MODEL_NAME}</h1>
      <div className="border border-gray-300 rounded shadow p-4">
        <ResponsiveBar
          data={analysisData}
          keys={["value"]}
          indexBy="origin"
          layout="horizontal"
          margin={{ top: 50, right: 30, bottom: 50, left: 150 }}
          padding={0.3}
          colors={{ scheme: "category10" }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Percentage",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          enableGridX
          enableGridY={false}
        />
      </div>
    </div>
  );
};

export default Analysis;
