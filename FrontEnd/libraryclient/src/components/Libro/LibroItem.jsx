import { NavLink } from "react-router-dom";

export const LibroItem = ({ libro = {}, deleteEvent = () => {} }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {libro.isbn}
      </th>
      <td className="px-6 py-4">{libro.titulo}</td>
      <td className="px-6 py-4">$ {libro.precio}</td>
      <td className="px-6 py-4">{libro.stock}</td>
      <td className="px-6 py-4">{libro.autor}</td>
      <td className="px-6 py-4">{libro.categoria}</td>
      <td>
        <div className="flex flex-row">
          {/* <div className="basis-1/2 pt-2">
            <NavLink
              to="edit"
              className=" p-2 text-sm font-medium text-white hover:bg-green-600 bg-green-500 rounded-md "
            >
              Editar
            </NavLink>
          </div> */}
          <div className="basis-1/2">
            <button
              type="button"
              className=" p-2 text-sm font-medium text-white hover:bg-red-600 bg-red-500 rounded-md "
              onClick={() => deleteEvent(libro.isbn)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};
