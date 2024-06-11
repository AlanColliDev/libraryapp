import { useFetch } from "./useFetch";
import { cnf } from "../environment/config";

export const useAutor = () => {
    const {data, isLoading,} = useFetch(`${cnf.URI_SERVER}${cnf.ENDPOINT_AUTOR}`);

    return {
        autores: data,
        autorIsLoading: isLoading
    };
};
