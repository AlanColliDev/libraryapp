import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Dashboard = () => {

    return (
        <>
            <Navbar />
            <div className="px-4 md:px-10 mx-auto w-full">
                <Outlet />
            </div>
        </>
    );
};
