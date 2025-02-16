import { useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';

const ClassNode = ({ data, isConnectable }) => {
  const [isCompleted, setCompleted] = useState(Boolean(data.completed));

  // Sync state with `data.completed` when it changes externally
  useEffect(() => {
    setCompleted(data.completed || false);
  }, [data.completed]);

  const handleCompletion = () => {
    const newStatus = !isCompleted;
    setCompleted(newStatus);  // Update the local state
    data.completed = newStatus; // Update the `data` directly
    console.log("Completed:", newStatus);
  };

  return (
    <div className="class-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="custom-handle"
      />
      
      <div className="node-layout">
        <div className="node-header">{`${data.label} (${data.units})`}</div>
        
        {/* Completion Checkbox */}
        <div className="checkbox-container">
          <input 
            type="checkbox" 
            checked={isCompleted}  // Ensures it's always true/false
            onChange={handleCompletion} 
          />
          <label>{isCompleted ? "Completed" : "Not Completed"}</label>
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="custom-handle"
      />
    </div>
  );
};

export default ClassNode;
