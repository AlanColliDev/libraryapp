import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Navbar = () => {

    const {username} = JSON.parse(localStorage.getItem('us'))
    const {Logout} = useAuth()

    return (
        <nav className="bg-gray-50 dark:bg-gray-700">
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
                <div className="grid grid-cols-2">
                    <div className="items-center">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <NavLink
                                    className="text-gray-900 dark:text-white hover:underline"
                                    to={"/dashboard/libros"}
                                >
                                    Gestión de Libros
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="text-gray-900 dark:text-white hover:underline"
                                    to={"/dashboard/prestamo"}
                                >
                                    Préstamos
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-end justify-end col-end-9 gap-2 text-sm">
                        <p className="font-medium text-white">Usuario: {username}</p>
                        <div>
                            <button type="button" onClick={Logout} className="text-white hover:text-blue-500">Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
