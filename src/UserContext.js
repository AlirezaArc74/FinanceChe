import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [ signupToken, setSignupToken] = useState("");
  const [loginToken, setLoginToken] = useState()
  const [signUpModal, setSignUpModal] = useState(false);
  const [mapData, setMapData] = useState([]);
  const [userImage, setUserImage] = useState("");


  return (
    <UserContext.Provider
      value={{
        mapData,
        setMapData,
        loginToken,
        setLoginToken,
        signupToken,
        setSignupToken,
        signUpModal,
        setSignUpModal,
        userImage,
        setUserImage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider
export const useAllState = () => {
  return useContext(UserContext)
}
//  export { useAllState, UserContextProvider };
