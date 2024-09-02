// Components
import FileInput from "../Components/FileInput";

// Package Imports
import { Auth0Provider } from '@auth0/auth0-react';
import { useAuth0 } from "@auth0/auth0-react";


const Main = () => {

    const LoadContents = () => {
        const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
        
        if (isAuthenticated) {
            let user_content = user.sub.split("|");
            let userID = user_content[1];
            return (<div>
                <FileInput></FileInput>
                <p> user id: {userID}</p>
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