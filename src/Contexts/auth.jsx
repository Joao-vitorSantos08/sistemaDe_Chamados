import { useState, createContext, useEffect, use } from "react";
import { auth, db } from "../services/firebaseConnction"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { data, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const navigate = useNavigate()

    const signIn = async (email, password) => {
        setLoadingAuth(true)
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid
                const docRef = doc(db, "users", uid)
                const docSnap = await getDoc(docRef)
                let data = {
                    uid: uid,
                    nome: docSnap.data.nome,
                    email: value.user.email,
                    avatarURL: docSnap.data.avatarURL

                }
                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                toast.success(`Bem-vindo(a) de volta`)
                navigate("/dashboard")
            })

            .catch((error) => {
                console.log(error)
                setLoadingAuth(false)
                toast.error("Algo deu errado! ")
            })
    }

    const signUp = async (email, password, name) => {
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (value) => {
                let uid = value.user.uid
                await setDoc(doc(db, "users", uid), {
                    nome: name,
                    avatarURL: null
                })

                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: name,
                            email: value.user.email,
                            avatarURL: null
                        };

                        setUser(data)
                        setLoadingAuth(false)
                        storageUser(data)
                        toast.success("Seja bem-vindo ao sistema!")
                        navigate("/dashboard")
                    })

            })
            .catch((error) => {
                console.log(error)
                setLoadingAuth(false)
            })
    }

    const storageUser = (data) => {
        localStorage.setItem("@tickets", JSON.stringify(data))
    }

    return (

        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            loadingAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider