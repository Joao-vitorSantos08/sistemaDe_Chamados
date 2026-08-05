import "./profile.css"
import Header from "../../components/Header"
import Title from "../../components/Title"
import { FiSettings, FiUpload } from "react-icons/fi"
import avatar from "../../assets/images/avatar.png"
import { useContext, useState } from "react"
import { AuthContext } from "../../Contexts/auth"
import { db, storage } from "../../services/firebaseConnction"
import { doc, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

const Profile = () => {

    const { user, storageUser, setUser, logout } = useContext(AuthContext)

    const [avatarUrl, setAvataUrl] = useState(user && user.avatarURL)
    const [imageAvatar, setImageAvatar] = useState(null)
    const [nome, setNome] = useState(user && user.nome)
    const [email, setemail] = useState(user && user.email)

    const hadleFile = (e) => {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]


            if (image.type === "image/jpeg" || image.type === "image/png") {
                setImageAvatar(image)
                setAvataUrl(URL.createObjectURL(image))
            } else {
                alert("Envie uma imagem do tipo PNG ou JPEG")
                setImageAvatar(null)
                return
            }
        }
    }

    const handleUpload = async () => {
        const currentUid = user.uid
        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)
        const uploadTask = uploadBytes(uploadRef, imageAvatar)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                    let urlFoto = downloadURL;
                    const docRef = doc(db, "users", user.uid)
                    await updateDoc(docRef, {
                        avatarURL: urlFoto,
                        nome: nome,
                    })
                        .then(() => {
                            let data = {
                                ...user,
                                nome: nome,
                                avatarURL: urlFoto,
                            }
                            setUser(data);
                            storageUser(data);
                            toast.success("Perfil atualizado")
                        })
                })
            })
    }

    const hadleSubmit = async (e) => {
        e.preventDefault()

        if (imageAvatar === null && nome !== "") {
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
        } else if (nome !== "" && imageAvatar !== null) {
            handleUpload()
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
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#FFF" size={25} />
                            </span>
                            <input type="file" accept="image/*" onChange={hadleFile} /><br />
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />
                            ) : (
                                <img src={avatar} alt="Foto de perfil" width={250} height={250} />
                            )}
                        </label>

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
