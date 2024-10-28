/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useContext } from "react";
import { getLocalstorage } from "../util/localstorage";
const INIT_USER = {
    id: '',
    name: '',
    username: '',
    firstName: '',
    lastName: '',
    accountStatus: '',
    accountRole: '',
}

const INIT_STATE = {
    user: INIT_USER,
    isAuthenticated: false,
    isLoading: false,
    setUser() { },
    setIsAuthenticated() { },
    checkAuthUser: async () => false,
};

const AuthContext = createContext(INIT_STATE)

export default function AuthProvider({ children }) {
    // const navigate = useNavigate();
    const [user, setUser] = useState(INIT_USER);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    async function checkAuthUser() {
        try {
            const cookieFallback = getLocalstorage('cookieFallback');
            
            if(!cookieFallback)
                return false;
            
            setUser(cookieFallback)
            // const { id, ...userInfo } = await getCurrentUser(cookieFallback);
            
            // if (!user.id)
            //     return false
            // else
            //     // setUser({ id, ...userInfo })
            //     setUser(user)

            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
            return false
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (
            localStorage.getItem('cookieFallback') === '[]' ||
            localStorage.getItem('cookieFallback') === null
        )
            console.log('not found');
        // navigate(0);
        else
            checkAuthUser();
    }, []);

    const value = {
        user,
        token,
        isAuthenticated,
        isLoading,
        setUser,
        setToken,
        setIsAuthenticated,
        checkAuthUser,
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);