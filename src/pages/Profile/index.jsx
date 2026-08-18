import "./profile.css"
import Header from "../../components/Header"
import Title from "../../components/Title"
import { FiSettings,  } from "react-icons/fi"
import { useContext, useState } from "react"
import { AuthContext } from "../../Contexts/auth"
import { db, } from "../../services/firebaseConnction"
import { doc, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { getDownloadURL } from "firebase/storage"
const Profile = () => {

    const { user, storageUser, setUser, logout } = useContext(AuthContext)
    const [nome, setNome] = useState(user && user.nome)
    const email = (user && user.email)

    const handleUpload = async (snapshot) => {

        getDownloadURL(snapshot.ref).then(async () => {
            const docRef = doc(db, "users", user.uid)
            await updateDoc(docRef, {
                nome: nome,
            })
                .then(() => {
                    let data = {
                        ...user,
                        nome: nome,
                    }
                    setUser(data);
                    storageUser(data);
                    toast.success("Perfil atualizado")
                })
        })
    }

    handleUpload()

    const hadleSubmit = async (e) => {
        e.preventDefault()

        if (nome !== "") {
            const docRef = doc(db, "users", user.uid)
            await updateDoc(docRef, {
                nome: nome,
            })
                .then(() => {
                    let data = {
                        ...user,
                        nome: nome,
                    }
                    setUser(data);
                    storageUser(data);
                    toast.success("Perfil atualizado")
                })
        }

    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Meu Perfil">
                    <FiSettings size={25} />
                </Title>
                <main className="container">
                    <form className="form-profile" onSubmit={hadleSubmit}>

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label>Email</label>
                        <input type="text" value={email} disabled={true} />
                        <button type="submit">Salvar</button>
                    </form>
                </main>
                <div className="container">
                    <button className="logout-btn" onClick={() => logout()}>Sair</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
