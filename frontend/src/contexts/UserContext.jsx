import PropTypes from "prop-types";
import { createContext, useMemo, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import instance from "../services/APIService";

const UserContext = createContext();

export default UserContext;

export function UserContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("user", null);
  const [logoutMessage, setLogoutMessage] = useState(null);

  const login = (_user) => {
    setLogoutMessage(null);
    setUser(_user);
  };

  // Si le jeton de session expire, l'utilisateur est déconnecté
  // et il est redirigé vers l'accueil et un message l'informe du motif de sa déconnexion
  const logout = (expired) => {
    if (expired) {
      setLogoutMessage("Ta session a expiré. Reconnecte-toi vite !");
    }
    instance.get("/logout");
    setUser(null);
    navigate("/");
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
      logoutMessage,
      setLogoutMessage,
    }),
    [user, logoutMessage]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
