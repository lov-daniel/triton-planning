import "./ComponentStyles/CustomNode.css"

const CustomNode = (props) => {
    const onDragStart = (event, nodeType, label) => {

        if (nodeType && label) {
          const data = JSON.stringify({ nodeType, label });
          event.dataTransfer.setData('application/reactflow', data);
          event.dataTransfer.effectAllowed = 'move';
        }
      };
    
      return (
        <aside>
          <div
            className="dndnode" id={props.label}
            onDragStart={(event) => onDragStart(event, 'classNode', props.label )}
            draggable
          >
            {props.label + " (" + props.units + ")"}
          </div>
        </aside>
      );
}

export default CustomNode;