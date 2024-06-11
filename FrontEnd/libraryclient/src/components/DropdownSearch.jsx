import { Fragment, useState } from "react";

export const DropdownSearch = ({
    dataList = [{ id: 0, nombre: "" }],
    selectedData = { id: 0, nombre: '' },
    titleDropdown = 'Seleccionar',
    isLoading = true,
    setterEvent = () => { },
}) => {
    const [openDrop, setOpenDrop] = useState(false);
    const [search, setSearch] = useState("");
    const [filterData] = dataList.filter((element) => element.id === selectedData)

    const HandleSetOpenDrop = () => {
        setOpenDrop(!openDrop);
    };

    const HandleSearch = (evt) => {
        setSearch(evt.target.value);
    };

    const HandleSelectedDrop = (id) => {
        setterEvent(id);
        HandleSetOpenDrop();
        setSearch((state) => "");
    };


    return (
        <>
            <div className="w-full font-medium h-1/2">
                <div
                    className={`bg-gray-300 w-full p-2 flex items-center justify-center rounded ${!filterData ? "text-gray-600" : "text-gray-700"
                        } cursor-pointer`}
                    onClick={HandleSetOpenDrop}
                >
                    {filterData?.id > 0 ? filterData?.nombre : titleDropdown}
                    <div className="px-2">
                        <i
                            className={`fa-solid fa-chevron-down ${openDrop && "rotate-180"}`}
                        ></i>
                    </div>
                </div>
                <div className="rounded relative z-2">
                    <ul
                        className={`overflow-y-auto mt-2 w-full rounded-md lg:bg-white lg:text-gray-600 lg:relative sm:relative sm:bg-slate-500 sm:text-white transition-all ${openDrop ? "max-h-40" : "max-h-0"
                            }`}
                    >
                        <div className="">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Buscar..."
                                value={search}
                                onChange={(event) => HandleSearch(event)}
                                className="placeholder:text-gray-700 text-gray-700 outline-none rounded w-full"
                            />
                        </div>
                        {
                            !isLoading ? dataList.map((data) => (
                                <Fragment key={`${data.id}.${data.nombre}`}>
                                    <li
                                        key={data?.nombre}
                                        className={`p-2 text-sm bg-gray-600 text-white hover:bg-blue-500 cursor-pointer hover:text-black ${data?.id === filterData?.id &&
                                            "bg-blue-400 sm:bg-blue-400 text-white"
                                            } ${data?.nombre?.toUpperCase().startsWith(search.toUpperCase())
                                                ? ""
                                                : "hidden"
                                            }`}
                                        onClick={() => HandleSelectedDrop(data?.id)}
                                    >
                                        {data?.nombre}
                                    </li>
                                </Fragment>
                            ))  : <><p>Sin ddta</p></>
                        }
                    </ul>
                </div>
            </div>
        </>
    );
};
