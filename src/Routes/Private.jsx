import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/auth";

const Private = ({ children }) => {
    const { signed, loading } = useContext(AuthContext)

    if (loading) {
        return <div></div>;
    } else if(!signed) {
        return <Navigate to="/" />;
    }

    return children
}

export default Private