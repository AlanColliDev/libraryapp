import { NavLink } from "react-router-dom";
import { usePrestamo } from "../../hooks/usePrestamo";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";

const initialForm = {
    fechaDevolucion: new Date().toISOString().split('T')[0],
    observacion: '',
    id: 0,
}


export const PrestamoList = () => {

    const [showModal, setShowModal] = useState(false);
    const { prestamos, SaveDevolucion, isLoading } = usePrestamo();
    const { HandleInputChange, HandleSetDropdownForm, ValidateForm, formState, errors } = useForm(initialForm);
    const prestamoId = formState.id;
    const [validationDone, setValidationDone] = useState(false);


    const HandleSelectPrestamo = (id) => {
        HandleInputChange({ target: { name: 'id', value: id } })
        setShowModal((val) => !val);
    }

    const HandleSaveDevolucion = () => {
        setValidationDone(val => false);
        ValidateForm(formState);
        setValidationDone(val => !val);
    }

    useEffect(() => {
        if (validationDone) {
            if (!(Object.keys(errors).length > 0)) {
                SaveDevolucion(formState);
                setShowModal((val) => !val);

            }
            else
                console.log('Errores encontrados:', errors);
        }
        setValidationDone(false);
    }, [validationDone])

    console.log(prestamos);

    return (
        <>
            <div className="relative overflow-x-auto p-10">
                <div className="grid grid-cols-2 gap-4">
                    <div className="h-3 text-slate-950 text-2xl pb-12 font-medium">
                        Registro de Libros prestados
                    </div>
                    <div className="col-end-7 col-span-2">
                        <NavLink
                            to={"add"}
                            className={
                                "p-2 pl-3 text-sm font-medium text-white hover:bg-blue-600 bg-blue-500 rounded-md inline-flex"
                            }
                        >
                            Nuevo préstamo
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        </NavLink>

                    </div>
                </div>


                <div className="flex justify-center">
                    <div className="w-full max-w-md  bg-white border border-gray-200 rounded-lg shadow px-6 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                {
                                    prestamos?.length > 0 ? prestamos.map((prestamo) => <Fragment key={prestamo.id}>
                                        <li key={prestamo.id} className="py-6">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                                    </svg>

                                                </div>
                                                <div className="flex-1 min-w-0 ms-4">
                                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        {prestamo.nombrePrestamista}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        Libro: {prestamo.titulo}
                                                    </p>
                                                </div>
                                                {
                                                    prestamo.estatus === "P" ? <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        <button onClick={() => HandleSelectPrestamo(prestamo.id)} title="some" type="button" className=" text-center inline-flex items-center py-2 px-3 rounded-xl bg-blue-800" > Devolver<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="pl-1 size-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                                        </svg>
                                                        </button>

                                                    </div> : <><p className="font-medium text-white">Devuelto el {new Date(prestamo.fechaDevolucion).toISOString().split('T')[0]}</p></>
                                                }

                                            </div>
                                        </li>
                                    </Fragment>) : (<>
                                        <li className="py-6">
                                            <div className="flex items-center">
                                                <div className="inline-flex flex-shrink-0 text-white text-center">
                                                    <p>Sin préstamos para mostrar</p> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </li>
                                    </>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-3 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between py-3 px-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-xl font-semibold">
                                            Completar datos de Devolución
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative px-6 py-3 flex-auto">
                                        <form>
                                            <div className="grid grid-cols-3 gap-8 pt-2 w-auto">
                                                <div className="grid md:gap-6">
                                                    <div className="relative z-0 w-full mb-5 group">
                                                        <input
                                                            type="date"
                                                            name="fechaDevolucion"
                                                            id="fechaDevolucion"
                                                            disabled
                                                            className="block py-[5.8%] px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            placeholder=" "
                                                            value={new Date().toISOString().split('T')[0]}
                                                        />
                                                        <label
                                                            htmlFor="fechaDevolucion"
                                                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:-translate-x-1/2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                        >
                                                            Fecha de Devolución
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="grid md:gap-6">
                                                    <div className="relative z-0 w-full mb-5 group">
                                                        <input
                                                            type="text"
                                                            name="observacion"
                                                            id="observacion"
                                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            placeholder=" "
                                                            onChange={HandleInputChange}
                                                        />

                                                        <label
                                                            htmlFor="observacion"
                                                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:-translate-x-1/2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 inline-flex"
                                                        >
                                                            Observaciones
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col py-6 justify-center align-middle mt-3">
                                                <div>
                                                    {Object.keys(errors).map((index, key) => {
                                                        return (
                                                            <Fragment key={key}>
                                                                <p className="p-3 font-medium text-red-600">{errors[index]}</p>
                                                            </Fragment>
                                                        );
                                                    })}{" "}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end px-6 py-3 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cerrar
                                        </button>
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={HandleSaveDevolucion}
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </div>
        </>
    );
};
