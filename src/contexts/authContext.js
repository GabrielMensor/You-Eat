import { useNavigation } from '@react-navigation/native';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext({})

export default function AuthProvider({children}) {
    const [user, setUser] = useState({})
    const navigation = useNavigation()

    

    return(
        <AuthContext.Provider value={{nome: "CPF Cancelado" }}>
            {children}
        </AuthContext.Provider>
    )
}