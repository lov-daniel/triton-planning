import React, { useState, useCallback, useMemo } from 'react';
import { ReactFlow, useNodesState, useEdgesState, addEdge, Controls, Background, BackgroundVariant } from '@xyflow/react';
import CustomConnectionLine from './CustomLineConnection';

// Components and Styles
import ClassNode from "../Nodes/ClassNode";
import ClassEdge from "../Nodes/ClassEdge";
import '@xyflow/react/dist/style.css'; // ReactFlow CSS
import '../Nodes/NodeStyles/ClassNode.css'; // Node Styles

const initialNodes = [];
const initialEdges = [];

const Graph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // Track if the connection is completed

  const edgeTypes = { classEdge: ClassEdge };

  const nodeTypes = useMemo(
    () => ({
      classNode: (props) => <ClassNode {...props} setNodes={setNodes} setEdges={setEdges} />,
    }),
    [setNodes, setEdges]
  );

  const onInit = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  const onConnect = useCallback((params) => {
    setEdges((eds) => {
        const newEdges = addEdge({ ...params, type: "classEdge" }, eds);
        return newEdges;
    });
    setIsConnected(true);
}, [setEdges]);

  const onDrop = (event) => {
    event.preventDefault();
    if (!event.dataTransfer.types.includes('application/reactflow')) {
      console.warn('Invalid drop format');
      return;
    }

    const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));
    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: `${+new Date()}`,
      type: 'classNode',
      position,
      data: { label: `${data.label}`, units: `${data.units}`, completed: false },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  return (
    <div className="reactflow-wrapper" onDrop={onDrop} onDragOver={onDragOver} style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineComponent={(props) => <CustomConnectionLine {...props} isConnected={isConnected} />}
        onConnect={onConnect}
        onInit={onInit}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Graph;
