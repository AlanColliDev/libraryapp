import { useNavigate } from "react-router-dom";
import { sendPost } from "../services/http";
import { cnf } from "../environment/config";

const _TIMEOUT = 1000;

export const useAuth = () => {
  const navigate = useNavigate();

  const Authenticate = async (user) => {
    try {
      const response = await sendPost(user, `${cnf.ENDPOINT_AUTH}/Login`);
      const data = await response.json();
      if (!response.ok) navigate("/login", { state: data });
      else {
        setTimeout(() => {
          localStorage.setItem("us", JSON.stringify(data));
          navigate("/dashboard");
        }, _TIMEOUT);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const Logout = () => {
    if (!(localStorage.length > 0)) return;

    localStorage.removeItem("us");
    navigate("/login");
  };

  return {
    Authenticate,
    Logout,
  };
};
