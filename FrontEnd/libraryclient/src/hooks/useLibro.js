import { useFetch } from "./useFetch";
import { sendDelete, sendPost, sendGet } from "../services/http";
import { cnf } from "../environment/config";
import { useNavigate } from "react-router-dom";
import { NotificationHelper } from "../helpers/NotificationHelper";
import { VerbNotification } from "../constants/VerbsNotification";

export const useLibro = () => {
  const navigate = useNavigate();
  const uri = `${cnf.URI_SERVER}${cnf.ENDPOINT_LIBRO}`;
  const { data, hasError, isLoading, setState } = useFetch(uri);

  const SaveLibro = async (formData) => {
    await sendPost(formData, cnf.ENDPOINT_LIBRO)
      .then(async (response) => {
        if (response.ok) {
          NotificationHelper({
            typeNotification: VerbNotification._SUCCESS,
            message: "El libro se guardó exitosamente",
            autoClose: 1500,
          }).SuccessNotification();
          navigate("/dashboard/libros");
        } else {
          const data = await response.json();
          NotificationHelper({
            typeNotification: VerbNotification._ERROR,
            message: data.message,
            autoClose: 3000,
          }).ErrorNotification();
        }
      })
      .catch((err) => {
        console.log(String(err));
      });
  };

  const HandleDeleteLibro = async (isbn) => {
    const uriDelete = `${cnf.ENDPOINT_LIBRO}?isbn=${isbn}`;
    await sendDelete(null, uriDelete)
      .then(async (response) => {
        if (response.ok) {
          const resp = await response.json();

          const libros = data.filter((elem) => elem.isbn !== isbn);

          setState({
            data: [...libros],
            isLoading: false,
            hasError: null,
          });

          NotificationHelper({
            typeNotification: VerbNotification._SUCCESS,
            message: resp.message,
            autoClose: 1500,
          }).SuccessNotification();
        } else {
          const resp = await response.json();
          NotificationHelper({
            typeNotification: VerbNotification._ERROR,
            message: resp.message,
            autoClose: 3000,
          }).ErrorNotification();
        }
      })
      .catch((err) => {
        console.log(String(err));
      });
  };

  const HandleSearchLibro = async ({ target }) => {
    const uriSearch = `${cnf.ENDPOINT_LIBRO}/Search?search=${target.value}`;
    await sendGet(null, uriSearch)
      .then(async (response) => {
        if (response.ok) {
          const libros = await response.json();
          setState({
            data: [...libros],
            isLoading: false,
            hasError: null,
          });
        }
      })
      .catch((error) => {
        console.log(String(error));
      });
  };

  return {
    hasError,
    isLoading,
    libros: data,
    SaveLibro,
    HandleDeleteLibro,
    HandleSearchLibro,
  };
};
