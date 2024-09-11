import "./ComponentStyles/CustomNode.css"

const CustomNode = (props) => {
    const onDragStart = (event, nodeType, label) => {
        const data = JSON.stringify({ nodeType, label });
        event.dataTransfer.setData('application/reactflow', data);
        event.dataTransfer.effectAllowed = 'move';
      };
    
      return (
        <aside>
          <div
            className="dndnode"
            onDragStart={(event) => onDragStart(event, 'default', props.label )}
            draggable
          >
            {props.label}
          </div>
        </aside>
      );
}

export default CustomNode;