import PropTypes from "prop-types";
import { createContext, useMemo, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import instance from "../services/APIService";

const UserContext = createContext();

export default UserContext;

export function UserContextProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null);
  const [logoutMessage, setLogoutMessage] = useState(null);
  const login = (_user) => {
    setLogoutMessage(null);
    setUser(_user);
  };

  const logout = (expired) => {
    // TODO : mettre en place un interceptor pour les 203 qui logout
    // et afficher un message de déconnexion sur l'écran de login
    if (expired) {
      setLogoutMessage("Ta session a expiré. Reconnecte-toi vite !");
    }
    instance.get("/logout");
    setUser(null);
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
