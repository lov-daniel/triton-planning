// Components
import ActionTab from "../Components/ActionTab";
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
    
    const initialNodes = [];
    const initialEdges = [];


    const LoadContents = () => {
        const { user, isAuthenticated } = useAuth0();

        if (isAuthenticated) {
            let user_content = user.sub.split("|");
            let userID = user_content[1];

            return (
                <div>
                    <p> user id: {userID}</p>
                    <Sidebar/>
                    <ActionTab/>
                    <Graph> </Graph>
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