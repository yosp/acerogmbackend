import React, { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContex } from '../../context/GlobalState'

const LogoutPopup = () => {
    const signoutTime = 3660000;
    const redirectTime = 3800;
    const warningTime = 3540000;
    const aceroContext = useContext(GlobalContex)
    const { LogoutUser } = aceroContext
    let warnTimeout;
    let logoutTimeout;
    let reditectTimeout;
    

    const warn = () => {
        toast.warn("Tu sección sera cerrada en 1 minuto por inactividad", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 5000
        });
    };

    const logoutAction = () => {
        LogoutUser()
    }

    const logout = () => {
        toast.error("Tu sección fue cerrada por inactividad", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000
        });
        reditectTimeout = setTimeout(logoutAction, redirectTime)
    };

    const setTimeouts = () => {
        warnTimeout = setTimeout(warn, warningTime);
        logoutTimeout = setTimeout(logout, signoutTime);
    };

    const clearTimeouts = () => {
        if (warnTimeout) clearTimeout(warnTimeout);
        if (logoutTimeout) clearTimeout(logoutTimeout);
    };

    useEffect(() => {
        const events = [
            "load",
            "mousemove",
            "mousedown",
            "click",
            "scroll",
            "keypress",
        ];

        const resetTimeout = () => {
            clearTimeouts();
            setTimeouts();
        };

        for (let i in events) {
            window.addEventListener(events[i], resetTimeout);
        }

        setTimeouts();
        return () => {
            for (let i in events) {
                window.removeEventListener(events[i], resetTimeout);
                clearTimeouts();
            }
        };
    }, [clearTimeouts, setTimeouts]);

    return <div>
        <ToastContainer />
    </div>;
};
export default LogoutPopup;
