import React, { useEffect, useState } from "react";
import { getModels } from "../../api/getModels";
import { Link } from "react-router-dom";

interface Model {
  model_version: number;
  ts_start: number;
  ts_end: number;
  num_categorical: number;
  job_id: string;
  num_continuous: number;
  sk: string;
  ts_updated: number;
  model_name: string;
  model_type: string;
}

const Inventory: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await getModels();
      setModels(response.data);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  return (
    <div className="container mx-auto grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {models.map((model) => (
        <Link
          key={model.model_name}
          to={`/analysis/${model.model_name}`}
          className="flex flex-col p-4 border border-gray-300 rounded shadow hover:border-blue-500 transition duration-300"
        >
          <div className="mb-4 text-lg font-semibold">{model.model_name}</div>
          <div className="flex flex-wrap mb-2">
            <div className="w-full md:w-1/2">
              <span className="text-gray-600">Version:</span>{" "}
              {model.model_version}
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-gray-600">Type:</span> {model.model_type}
            </div>
          </div>
          <div className="flex flex-wrap mb-2">
            <div className="w-full md:w-1/2">
              <span className="text-gray-600">Start:</span> {model.ts_start}
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-gray-600">End:</span> {model.ts_end}
            </div>
          </div>
          <div className="flex flex-wrap mb-2">
            <div className="w-full md:w-1/2">
              <span className="text-gray-600">Categorical:</span>{" "}
              {model.num_categorical}
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-gray-600">Continuous:</span>{" "}
              {model.num_continuous}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Inventory;
