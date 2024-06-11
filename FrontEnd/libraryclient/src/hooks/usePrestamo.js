import { NotificationHelper } from "../helpers/NotificationHelper";
import { VerbNotification } from "../constants/VerbsNotification";
import { sendPost } from "../services/http";
import { useNavigate } from "react-router-dom";
import { cnf } from "../environment/config";
import { useFetch } from "./useFetch";

const autoClose = 3000;

export const usePrestamo = () => {
  const navigate = useNavigate();
  const uri = `${cnf.URI_SERVER}${cnf.ENDPOINT_PRESTAMO}`;
  const { data, hasError, isLoading, setState } = useFetch(uri);

  const SavePrestamo = async (formData) => {
    await sendPost(formData, cnf.ENDPOINT_PRESTAMO)
      .then(async (response) => {
        if (response.ok) {
          NotificationHelper({
            typeNotification: VerbNotification._SUCCESS,
            message: "El préstamo se generó exitosamente.",
            autoClose: 1500,
          }).SuccessNotification();
          navigate("/dashboard/prestamo");
        } else {
          const data = await response.json();
          NotificationHelper({
            typeNotification: VerbNotification._ERROR,
            message: data.message,
            autoClose,
          }).ErrorNotification();
        }
      })
      .catch((err) => {
        console.log(String(err));
      });
  };

  const SaveDevolucion = async (formData) => {
    await sendPost(formData, `${cnf.ENDPOINT_PRESTAMO}/Devolucion`)
      .then(async (response) => {
        if (response.ok) {
            const resp = await response.json();
            const prestamos = data.filter((prestamo) => prestamo.id !== resp.id)
            console.log({resp});
            setState({
              data: [...prestamos, resp],
              isLoading: false,
              hasError: null,
            });

          NotificationHelper({
            typeNotification: VerbNotification._SUCCESS,
            message: "La devolución se registró exitosamente.",
            autoClose: 1500,
          }).SuccessNotification();
          
          
        } else {
          const data = await response.json();
          NotificationHelper({
            typeNotification: VerbNotification._ERROR,
            message: data.message,
            autoClose,
          }).ErrorNotification();
        }
      })
      .catch((err) => {
        console.log(String(err));
      });
  };

  return {
    SavePrestamo,
    SaveDevolucion,
    prestamos: data,
    hasError,
    isLoading,
  };
};
