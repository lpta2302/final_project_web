/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useContext } from "react";
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

const getCurrentUser = () => ({ id: 1 });

const AuthContext = createContext(INIT_STATE)

export default function AuthProvider({ children }) {
    // const navigate = useNavigate();
    const [user, setUser] = useState(INIT_USER);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    async function checkAuthUser() {
        try {
            const { id, ...userInfo } = await getCurrentUser();
            if (!id)
                return false
            else
                setUser({ id, ...userInfo })

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
        isAuthenticated,
        isLoading,
        setUser,
        setIsAuthenticated,
        checkAuthUser,
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);