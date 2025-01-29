import { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

const handleStyle = { left: 10 };

const ClassNode = ({ data, isConnectable }) => {

    const [isCompleted, setComplete] = useState(false);

    const handleCompletion = () => {
      setComplete(!isCompleted);
      data.completed = !isCompleted;
      console.log(data.completed);
    };
    
    const RenderButton = () => {
      return (
          <input 
              className={`btn ${isCompleted ? 'btn-success' : 'btn-danger'}`} 
              type="button" 
              value={isCompleted ? 'Class Completed' : 'Class Not Completed'} 
              onClick={handleCompletion} 
          />
      );
  };
    
      return (
        <div className="class-node">
          <Handle
            type="target"
            position={Position.Top} 
            isConnectable={isConnectable}
            className='custom-handle'
          />
          <div className='node-layout'>
            <label/>
            <div>
              <label htmlFor="text" className='node-header'>{`${data.label} (${data.units})`}</label>
            </div>
            <label/>
            <label/>
            <RenderButton/>
        
          </div>
          <Handle
            type="source"
            position={Position.Bottom}
            id="b"
            isConnectable={isConnectable}
            className='custom-handle'
          />
        </div>
      );

}

export default ClassNode;