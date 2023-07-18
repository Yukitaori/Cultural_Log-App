import PropTypes from "prop-types";

import { createContext, useMemo, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import instance from "../services/APIService";

const UserContext = createContext();

export default UserContext;

export function UserContextProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null);
  const login = (_user) => {
    setUser(_user);
  };

  const logout = () => {
    instance.get("/logout");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
    }),
    [user]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
