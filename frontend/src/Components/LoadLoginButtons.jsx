import { useAuth0 } from "@auth0/auth0-react";

const LoadLoginButtons = () => {

    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();  

    if (!isAuthenticated) {
        return (<div>
        <button className="btn btn-success" type="button" href="log-in" onClick={() => loginWithRedirect()}>Log In/Sign Up</button>
        </div>)
    } else {
        
    return (<div>
        <button className="btn btn-danger" type="button" href="log-in" onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
    </div>)
    }
}

export default LoadLoginButtons;