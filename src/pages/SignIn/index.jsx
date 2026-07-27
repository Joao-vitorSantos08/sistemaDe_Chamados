import "./signIn.css"
import logo from "../../assets/images/logo.png"
import { useState } from "react"
import { Link } from "react-router-dom"

const SignIn = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Logo do sistema de chamados " />
                </div>

                <form>
                    <h1>Entrar</h1>
                    <input type="text" placeholder="email@email.com"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="text" placeholder="Digite sua senha"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" >Acessar</button>
                </form>
                <Link to="/register">Não possui uma conta? Cadastrar-se</Link>
            </div>
        </div>
    )
}

export default SignIn