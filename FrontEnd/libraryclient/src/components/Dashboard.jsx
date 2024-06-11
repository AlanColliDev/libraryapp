import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Dashboard = () => {
    
    const user = JSON.parse(localStorage.getItem('us'));

    return (
        <>
            <Navbar />

            <div className="px-4 md:px-10 mx-auto w-full">
                <Outlet />

                <div className="m-10 flex p-20 align-middle bg-slate-400 justify-center text-sky-950 font-bold text-3xl">
                    <h2>Bienvenido a LibraryCore: </h2>
                    <p className="font-medium ml-2">{user.username}</p>
                    </div>
            </div>
        </>
    );
};
