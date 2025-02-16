import { useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";

const ClassNode = ({ id, data, isConnectable, setNodes, setEdges }) => {
  const [isCompleted, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(data.completed || false);
  }, [data.completed]);

  const handleCompletion = () => {
    const newStatus = !isCompleted;
    setCompleted(newStatus);
    data.completed = newStatus;
    console.log("Completed:", newStatus);
  };

  // Function to delete the node and remove related edges
  const handleDelete = () => {
    setNodes((nds) => nds.filter((node) => node.id !== id)); // Remove node
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id)); // Remove related edges
  };

  return (
    <div
      className="class-node"
      onClick={handleCompletion}
      style={{
        padding: "10px",
        border: `2px solid ${isCompleted ? "green" : "red"}`,
        borderRadius: "8px",
        cursor: "pointer",
        position: "relative", // Needed for absolute positioning of the delete button
      }}
    >
      {/* Delete Button */}
      <button className="delete-button" onClick={handleDelete}>×</button>

      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="custom-handle" />

      <div className="node-layout">
        <div className="node-header">{`${data.label} (${data.units})`}</div>

        <div className="checkbox-container">
          <label>{isCompleted ? "Completed" : "Not Completed"}</label>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="custom-handle" />
    </div>
  );
};

export default ClassNode;
