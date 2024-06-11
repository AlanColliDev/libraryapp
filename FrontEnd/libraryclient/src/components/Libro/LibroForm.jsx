import { useCallback, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useLibro } from "../../hooks/useLibro";
import { DropdownSearch } from "../DropdownSearch";
import { useCategoria } from "../../hooks/useCategoria";
import { useAutor } from "../../hooks/useAutor";

const initialForm = {
    isbn: "",
    titulo: "",
    descripcion: "",
    categoriaId: 0,
    autorId: 0,
    precio: 0,
    stock: 0,
};

export const LibroForm = () => {
    const { HandleInputChange, HandleSetDropdownForm, setErrors, ValidateForm, errors, formState } =
        useForm(initialForm);
    const { SaveLibro } = useLibro();
    const { categorias, isLoading } = useCategoria();
    const { autores, autorIsLoading } = useAutor();
    const { categoriaId, autorId } = formState;
    const [validationDone, setValidationDone] = useState(false);

    const HandleSetAutor = (id) => HandleSetDropdownForm('autorId', autorId, id)

    const HandleSetCategoria = (id) => HandleSetDropdownForm('categoriaId', categoriaId, id)

    const HandleSaveLibro = () => {
        setValidationDone(val => false); // Reseteamos el estado de validación
        ValidateForm(formState); // Ejecutamos la validación
        setValidationDone(val => !val); //
    }

    useEffect(() => {
        if (validationDone) {
            if (!(Object.keys(errors).length > 0)) {
                SaveLibro(formState);
            } else {
                // Manejar los errores
                console.log('Errores encontrados:', errors);
            }
        }
        setValidationDone(false);
    }, [validationDone])

    return (
        <div className="p-10 m-5">
            <div className="max-w-md mx-auto pb-4">Agregar Libro</div>
            <form className="max-w-md mx-auto">
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="isbn"
                            id="isbn"
                            onChange={HandleInputChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="isbn"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            ISBN
                        </label>
                    </div>
                    <div className="grid md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="titulo"
                                id="titulo"
                                onChange={HandleInputChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="titulo"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Título
                            </label>
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-1 pb-6">
                    <label
                        htmlFor="descripcion"
                        className="block mb-2 text-sm font-normal text-gray-900"
                    >
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        rows="4"
                        className="block p-2.5 w-full h-16 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900  dark:border-gray-600 dark:placeholder-gray-40 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Una historia..."
                        name="descripcion"
                        onChange={HandleInputChange}
                    ></textarea>
                </div>
                <div className="grid md:grid-cols-1 pb-6">
                    <label className="block mb-2 text-sm font-normal text-gray-900">
                        Autor
                    </label>
                    <DropdownSearch
                        key={1}
                        dataList={autores}
                        selectedData={autorId}
                        titleDropdown="Seleccionar Autor"
                        setterEvent={HandleSetAutor}
                        isLoading = {autorIsLoading}
                    />
                </div>
                <div className="grid md:grid-cols-1 pb-6">
                    <label className="block mb-2 text-sm font-normal text-gray-900">
                        Categoría
                    </label>
                    <DropdownSearch
                        key={2}
                        dataList={categorias}
                        selectedData={categoriaId}
                        titleDropdown="Seleccionar Categoría"
                        setterEvent={HandleSetCategoria}
                        isLoading = {isLoading}
                    />
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="number"
                            min={0}
                            name="precio"
                            id="precio"
                            onChange={HandleInputChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="precio"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Precio
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="number"
                            min={0}
                            name="stock"
                            id="stock"
                            required
                            onChange={HandleInputChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="stock"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Stock
                        </label>
                    </div>
                </div>
                <div>
                    {Object.values(errors).map((error, key) => {
                        return (
                            <>
                                <p key={key + 1} className="p-3 font-medium text-red-600">{error.replace("Id", "")}</p>
                            </>
                        );
                    })}{" "}
                </div>
                <button
                    type="button"
                    onClick={() => HandleSaveLibro(formState)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Guardar
                </button>
            </form>
        </div>
    );
};
