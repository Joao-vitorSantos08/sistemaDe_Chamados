import "./profile.css"
import Header from "../../components/Header"
import Title from "../../components/Title"
import { FiSettings, FiUpload } from "react-icons/fi"
import avatar from "../../assets/images/avatar.png"
import { useContext, useState } from "react"
import { AuthContext } from "../../Contexts/auth"

const Profile = () => {

    const { user } = useContext(AuthContext)

    const [avatarUrl, setAvataUrl] = useState(user && user.avatarURL)

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Meu Perfil">
                    <FiSettings size={25} />
                </Title>
                <main className="container">
                    <form className="form-profile">
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#FFF" size={25} />
                            </span>
                            <input type="file" accept="image/*" /><br />
                            {avatarUrl === null ? (
                                <img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />

                            ) : (
                                <img src={avatar} alt="Foto de perfil" width={250} height={250} />
                            )}
                        </label>

                        <label>Nome</label>
                        <input type="text" />

                        <label>Email</label>
                        <input type="text"  disabled={true}/>
                        <button type="submit">Salvar</button>
                    </form>
                </main>
                <div className="container">
                    <button className="logout-btn">Sair</button>
                </div>
            </div>

        </div>
    )
}

export default Profile