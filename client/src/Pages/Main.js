// Components
import ActionTab from "../Components/ActionTab";

// Package Imports
import React, { useCallback, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
  } from '@xyflow/react';
   
  import '@xyflow/react/dist/style.css';
   


const Main = () => {


    const initialNodes = [
        {
          id: 'CSE_11',
          type: 'default',
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

    const LoadContents = () => {
        const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
        const [nodes, , onNodesChange] = useNodesState(initialNodes);
        const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
      
        const onConnect = useCallback(
          (params) => setEdges((eds) => addEdge(params, eds)),
          [setEdges],
        );
        
        
        if (isAuthenticated) {
            let user_content = user.sub.split("|");
            let userID = user_content[1];

            return (<div style={{width: "100vw",height: '100vw' }}>
                <br></br>
                <ActionTab/>
                <p> user id: {userID}</p>
                <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Background/>
                <Controls/>
                </ReactFlow>
                </div>)
        }

        return (<div>
            please login
        </div>)
    
    }

    return (
        <div>
            <LoadContents></LoadContents>
        </div>
    );
}

export default Main