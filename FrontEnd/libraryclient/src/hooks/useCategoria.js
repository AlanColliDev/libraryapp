import { useFetch } from "./useFetch";
import { cnf } from "../environment/config";

export const useCategoria = () => {
    const {data, isLoading,} = useFetch(`${cnf.URI_SERVER}${cnf.ENDPOINT_CATEGORIA}`);

    return {
        categorias: data,
        isLoading
    };
};
