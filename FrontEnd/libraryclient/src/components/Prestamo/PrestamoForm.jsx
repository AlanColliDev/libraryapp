import { Fragment, useEffect, useState } from "react";
import { useLibro } from "../../hooks/useLibro";
import { useForm } from "../../hooks/useForm";
import { usePrestamo } from "../../hooks/usePrestamo";


const initialForm = {
    fechaPrestamo: new Date().toISOString().split('T')[0],
    fechaDevolucion: '',
    nombrePrestamista: '',
    telefono: '',
    observacion: '',
    isbn: 0,
}

const customErros = {
    fechaPrestamo: 'Debe seleccionar una Fecha de Préstamo',
    fechaDevolucion: 'Debe capturar la Fecha de Devolución',
    nombrePrestamista: 'Capturar el nombre del Prestamista',
    isbn: 'Debe seleccionar un Libro',
}

export const PrestamoForm = () => {
    const { isLoading, libros, HandleSearchLibro } = useLibro();
    const { SavePrestamo } = usePrestamo();
    const { HandleSetDropdownForm, HandleInputChange, ValidateForm, errors, formState } = useForm(initialForm);
    const libroSelected = formState.isbn || '';
    const [validationDone, setValidationDone] = useState(false);


    const HandleSelectLibro = (isbn) => HandleSetDropdownForm('isbn', libroSelected, isbn)



    const HandleSavePrestamo = () => {
        setValidationDone(val => false);
        ValidateForm(formState); 
        setValidationDone(val => !val); 
    }

    useEffect(() => {
        if (validationDone) {
            if (!(Object.keys(errors).length > 0)) {
                SavePrestamo(formState);
            } else {
                // Manejar los errores
                console.log('Errores encontrados:', errors);
            }
        }
        setValidationDone(false);
    }, [validationDone])

    useEffect(() => {
        HandleSelectLibro('');
    }, [libros])

    return (
        <>
            <div className="p-5 m-2 ">
                <div className="max-w-md pb-4 text-2xl text-slate-800 font-medium">
                    Préstamo de Libro
                </div>

                <form className=" w-10/12 py-4 px-10 mx-auto border-8 rounded-md">
                    <div className="inline-grid grid-cols-2 pb-3 text-gray-500 font-medium">
                        <h4>Capturar información del Préstamo</h4>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="pl-2 size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>

                    </div>
                    <div className="grid grid-cols-3 gap-8 pt-2 w-auto">
                        <div className="grid md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    onChange={HandleSearchLibro}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                />

                                <label
                                    htmlFor="search"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:-translate-x-1/2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 inline-flex"
                                >
                                    Título o ISBN
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="pl-1 size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </label>
                            </div>
                        </div>
                        <div className="grid md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="date"
                                    name="fechaPrestamo"
                                    id="fechaPrestamo"
                                    disabled
                                    className="block py-[3.2%] px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    value={new Date().toISOString().split('T')[0]}
                                />
                                <label
                                    htmlFor="fechaPrestamo"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:-translate-x-1/2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Fecha de Préstamo
                                </label>
                            </div>
                        </div>
                        <div className="grid md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="date"
                                    name="fechaDevolucion"
                                    id="fechaDevolucion"
                                    onChange={HandleInputChange}
                                    className="block py-[3.2%] px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    min={new Date().toISOString().split('T')[0]}
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
                                    name="nombrePrestamista"
                                    onChange={HandleInputChange}
                                    id="nombrePrestamista"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                />
                                <label
                                    htmlFor="nombrePrestamista"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:-translate-x-1/2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Nombre del Prestario
                                </label>
                            </div>
                        </div>
                        <div className="grid md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="telefono"
                                    id="telefono"
                                    onChange={HandleInputChange}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    pattern="[7-9]{1}[0-9]{9}"
                                    title="Phone number with 7-9 and remaing 9 digit with 0-9"
                                />
                                <label
                                    htmlFor="telefono"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:-translate-x-1/2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Teléfono
                                </label>
                            </div>
                        </div>
                        <div className="grid md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="observacion"
                                    id="observacion"
                                    onChange={HandleInputChange}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    pattern="[7-9]{1}[0-9]{9}"
                                    title="Phone number with 7-9 and remaing 9 digit with 0-9"
                                />
                                <label
                                    htmlFor="observacion"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:-translate-x-1/2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Obervación
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="grid-cols-2 text-gray-500 font-medium inline-grid">
                        <h4>Seleccione el Libro a Prestar
                        </h4><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="pl-2 size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                        </svg>
                    </div>
                    <div className="w-full grid grid-cols-3 gap-5 justify-center align-middle cursor-pointer relative">
                        {
                            libros.map((book) => (<Fragment key={book.isbn}>
                                <div onClick={() => HandleSelectLibro(book.isbn)} className={`transition-all relative w-full p-4 mt-5 bg-white border cursor-pointer text-center rounded-lg shadow  ${libroSelected === book.isbn ? 'dark:bg-slate-900 border-green-700 border-4' : 'dark:bg-gray-800'}`}>{libroSelected === book.isbn && <div className="absolute bottom-20 left-52">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 text-green-500 ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </div>
                                }
                                    <div className="grid grid-cols-3">
                                        <div>
                                            <p className="text-gray-400 text-sm font-medium">ISBN:</p>
                                        </div>
                                        <div className="col-span-2 ">
                                            <h5 className="mb-2 text-sm font-bold text-gray-900 text-left dark:text-white">{book.isbn}</h5>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3">
                                        <div>
                                            <p className="text-gray-400 text-sm font-medium">Libro:</p>
                                        </div>
                                        <div className="col-span-2 ">
                                            <h5 className="mb-2 text-sm font-bold text-gray-900 text-left dark:text-white">{book.titulo}</h5>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3">
                                        <div>
                                            <p className="text-gray-400 text-sm font-medium">Autor:</p>
                                        </div>
                                        <div className="col-span-2 ">
                                            <h5 className="mb-2 text-sm font-bold text-left text-gray-900 dark:text-white">{book.autor}</h5>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3">
                                        <div>
                                            <p className="text-gray-400 text-sm font-medium">Stock:</p>
                                        </div>
                                        <div className="font-medium text-gray-700 h-7 w-7 rounded-full bg-white text-sm flex items-center justify-center" >{book.stock}</div>
                                    </div>
                                </div>
                            </Fragment>))
                        }

                    </div>
                    <div className="flex flex-col py-6 justify-center align-middle mt-3">
                        <div>
                            {Object.keys(errors).map((index, key) => {
                                return (
                                    <Fragment key={key}>
                                        <p className="p-3 font-medium text-red-600">{customErros[index] && customErros[index] || errors[index]}</p>
                                    </Fragment>
                                );
                            })}{" "}
                        </div>
                        <button type="button" onClick={HandleSavePrestamo} className="p-3 shadow rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium">Guardar</button>
                    </div>
                </form>
            </div>
        </>
    );
};
