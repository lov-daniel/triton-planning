// Components
import ClassNode from "../Nodes/ClassNode";

// Package Imports
import React, { useCallback, useState } from 'react';
import {
    ReactFlow,
    useReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant
  } from '@xyflow/react';

// ReactFlow CSS
import '@xyflow/react/dist/style.css';

// Node Styles
import '../Nodes/NodeStyles/ClassNode.css'

const nodeTypes = { classNode: ClassNode };
const initialNodes = [
    {
      id: 'CSE_11',
      type: 'classNode',
      position: { x: 0, y: 0 },
      data: { label: 'CSE 11' }
    },
    {
        id: 'CSE_12',
        type: 'default',
        position: { x: 0, y: 0 },
        data: { label: 'CSE 12' }
      }
  ];
const initialEdges = [];


const Graph = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const [reactFlowInstance, setReactFlowInstance] = useState(null); // Store the instance
    const onInit = useCallback((instance) => {
        setReactFlowInstance(instance);
    }, []);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
      );

      const OnDrop = (event) => {
          event.preventDefault();

          // Check if the dropped data has the expected format
          if (!event.dataTransfer.types.includes('application/reactflow')) {
              console.warn('Invalid drop format');
              return;
          }

          const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));

          const type = data.nodeType;
          const label = data.label;

          const position = reactFlowInstance.screenToFlowPosition({
              x: event.clientX,
              y: event.clientY,
            });
          const newNode = {
              id: `${+new Date()}`,
              type : "default",
              position,
              data: { label: `${label} node` },
            };
        
          setNodes((nds) => nds.concat(newNode));
          console.log(nodes)
      };
  
      const onDragOver = (event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
      };
      


    return (<div className="reactflow-wrapper" onDrop={OnDrop} onDragOver={onDragOver} style={{width: "100vw",height: '100vw' }}>
        <br></br>
        <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
    >
        <Background variant={BackgroundVariant.Lines}/>
        <Controls/>
        </ReactFlow>
        </div>) 
};

export default Graph