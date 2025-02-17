import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ReactFlow, useNodesState, useEdgesState, addEdge, Controls, Background, BackgroundVariant } from '@xyflow/react';
import { debounce } from "lodash";
import CustomConnectionLine from './CustomLineConnection';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Components and Styles
import ClassNode from "../Nodes/ClassNode";
import ClassEdge from "../Nodes/ClassEdge";
import '@xyflow/react/dist/style.css'; // ReactFlow CSS
import '../Nodes/NodeStyles/ClassNode.css'; // Node Styles
import { useAuth0 } from "@auth0/auth0-react";

const initialNodes = [];
const initialEdges = [];

const edgeTypes = { classEdge: ClassEdge };

const Graph = () => {

  const { user } = useAuth0();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // Track if the connection is completed

  // Debounce function inside useMemo to avoid re-creating it on every render
  const saveGraphDebounced = useMemo(
    () =>
      debounce((nodes, edges, user) => {
        if (!user) return;
  
        let user_content = user.sub.split("|");
        let userID = user_content[1]; // Match backend expectation
  
        fetch(`${BACKEND_URL}/graph/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userID, nodes, edges }), // ✅ Send correct keys
        }).then(() => console.log("Graph saved!"));
      }, 3000),
    []
  );

  useEffect(() => {
    saveGraphDebounced(nodes, edges, user);
    return () => saveGraphDebounced.cancel();
  }, [nodes, edges, user]);

  const loadGraph = async () => {
    let user_content = user.sub.split("|");
    let userID = user_content[1];

    try {
        const response = await fetch(`${BACKEND_URL}/graph/load/${userID}`);
        if (!response.ok) {
            console.warn("No saved graph found.");
            return;
        }
        const data = await response.json();
        setNodes(data.nodes);
        setEdges(data.edges);
    } catch (error) {
        console.error("Error loading graph:", error);
    }
  };

  useEffect(() => {
      loadGraph();
  }, []);

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
      id: `${data.label}`,
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
