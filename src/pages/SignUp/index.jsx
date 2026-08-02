import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import { AuthContext } from "../../Contexts/auth"

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {signUp, loadingAuth} = useContext(AuthContext)

    const hadleSubmit = async(e) => {
        e.preventDefault();

        if(name !== "" && email !== "" && password !== ""){
           await signUp(email,password,name)
            
        }
    }

    return (
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Logo do sistema de chamados " />
                </div>

                <form onSubmit={hadleSubmit}>
                    <h1>Cadastrar nova conta</h1>
                    <input type="text" placeholder="Seu nome"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <input type="text" placeholder="email@email.com"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="text" placeholder="Digite sua senha"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" >
                        {loadingAuth ? "Carregando.." : "Cadastrar"}
                    </button>
                </form>
                <Link to="/">Já possui uma conta? Faça login</Link>
            </div>
        </div>
    )
}

export default SignUp