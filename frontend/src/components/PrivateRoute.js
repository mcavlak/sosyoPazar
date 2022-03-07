
import { useState, useEffect } from "react"
import { Redirect, Route } from "react-router-dom"
import { getMeRequest } from "../api/controllers/account-controller"
import SuspenseFallback from "./SuspenseFallback"
import CustomLayout from "./CustomLayout"

const PrivateRoute = ({ component: Component, ...rest }) => {

    const [AUTH_STATUS, setAUTH_STATUS] = useState("WAITING")


    const checkAuthentication = async () => {

        try {
            let res = await getMeRequest()
            if (res) {
                setTimeout(() => {
                    setAUTH_STATUS("SUCCESS")
                }, 500);
                localStorage.setItem('user', JSON.stringify(res.data));
            }
        } catch (error) {
            if (error?.response?.status === 401) {
                setAUTH_STATUS("FAILED")
                localStorage.removeItem('user');
            }
        }
    }


    useEffect(() => {

        checkAuthentication()

    }, [])

    return (
        <Route  {...rest}>
            {
                AUTH_STATUS === "WAITING" ? <SuspenseFallback />
                    : AUTH_STATUS === "FAILED" ? <Redirect to={{ pathname: "/login" }} />
                        : AUTH_STATUS === "SUCCESS" ? <CustomLayout> <Component /></CustomLayout>
                            : <div>Error</div>
            }
        </Route>

    )
}

export default PrivateRoute