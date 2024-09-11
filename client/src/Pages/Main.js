// Components
import ActionTab from "../Components/ActionTab";
import CustomNode from "../Components/CustomNode";
import Graph from "../Components/Graph";

// Package Imports
import React, { useCallback, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {
    ReactFlow,
    useReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge
  } from '@xyflow/react';

  import '@xyflow/react/dist/style.css';

  import ClassNode from "../Nodes/ClassNode";
import Sidebar from "../Components/Sidebar";
   


const Main = () => {
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


    const LoadContents = () => {
        const { user, isAuthenticated } = useAuth0();

        if (isAuthenticated) {
            let user_content = user.sub.split("|");
            let userID = user_content[1];

            return (
                <div>
                    <p> user id: {userID}</p>
                    <ActionTab/>
                    <CustomNode label="CSE 12"/>
                    <Graph> </Graph>
                    <Sidebar/>
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