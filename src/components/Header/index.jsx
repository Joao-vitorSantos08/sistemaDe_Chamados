import { Link } from "react-router-dom"
import { useContext } from "react"
import avatar from "../../assets/images/avatar.png"
import { AuthContext } from "../../Contexts/auth"
import { FiHome, FiUser, FiSettings } from "react-icons/fi"
import "./header.css"

const Header = () => {
    const { user } = useContext(AuthContext)

    return (
        <header className="sidbar">
            <div>
                <img src={user.avatarURL === null ? user.avatarURL : avatar} alt="foto de usuário" />
            </div>
            <nav>
                <ul>
                    <Link to="/dashboard">
                        <FiHome color="#FFF" size={24} />
                        Chamados
                    </Link>
                    <Link to="/customers">
                        <FiUser color="#FFF" size={24} />
                        Clientes
                    </Link>
                    <Link to="/profile">
                        <FiSettings color="#FFF" size={24} />
                        Perfil
                    </Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header