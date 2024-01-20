import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {

    let token = localStorage.getItem("token_set");
    console.log(token);

    return (
        token === "true" ? <Outlet /> : <Navigate to="/" />
    )

}

export default PrivateRoute;