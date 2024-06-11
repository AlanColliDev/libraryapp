import { NavLink } from "react-router-dom";
import { useLibro } from "../../hooks/useLibro";
import { LibroItem } from "./LibroItem";
import { useEffect, useState } from "react";

export const LibrosList = () => {
  const { libros, hasError, isLoading, HandleDeleteLibro } = useLibro();

  return (
    <>
      <div className="relative overflow-x-auto p-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="h-3 text-slate-950 text-2xl pb-12 font-medium">
            Libros registrados
          </div>
          <div className="col-end-7 col-span-2">
            <NavLink to={"add"} className={'p-2 text-sm font-medium text-white hover:bg-blue-600 bg-blue-500 rounded-md'}>Agregar Libro</NavLink>
          </div>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ISBN
              </th>
              <th scope="col" className="px-6 py-3">
                Título
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Autor
              </th>
              <th scope="col" className="px-6 py-3">
                Categoría
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && (
              libros?.length > 0 && (
                libros.map((libro) => (
                  <LibroItem key={libro.isbn} libro={libro} deleteEvent={HandleDeleteLibro}/>
                ))
              )
            )}
          </tbody>
        </table>
        {
          !libros.length > 0 
            && (<div className="bg-slate-600 text-white rounded-sm text-center p-5">Sin datos para mostrar</div>)
        }
      </div>
    </>
  );
};
