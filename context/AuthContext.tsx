import { createContext, useContext, useState, ReactNode } from "react"

export type UserRole = "client" | "entrepreneur" | "deliveryman"  // establishes valid User Role values

type User = {
    id: string
    email: string
    role: UserRole
}

type AuthContextType = {    // encapsulation
    user: User | null
    login: (email: string, role: UserRole) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)   // createContext

type AuthProviderProps = {
    childen: ReactNode
}

export function AuthProvider({ children }: { children: ReactNode }) {   // It saves the state, provides the value, involves the app
    const [user, setUser] = useState<User | null>(null)  // Initial state = not authenticated

    function login(email: string, role: UserRole) { // Simulating backend
        const fakeUser: User = {
            id: crypto.randomUUID(),
            email,
            role,
        }

        setUser(fakeUser)
    }

    function logout() {
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {         // custom hook
    const context = useContext(AuthContext)

    if(!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider")
    }
    return context
}