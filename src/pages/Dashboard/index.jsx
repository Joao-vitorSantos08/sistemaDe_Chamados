import { AuthContext } from "../../Contexts/auth"
import { useContext } from "react"
import Header from "../../components/Header"
import "./dashboard.css"
import Title from "../../components/Title"
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi"
import { Link } from "react-router-dom"


const Dashboard = () => {
    const { logout } = useContext(AuthContext)
    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Tichtks">
                    <FiMessageSquare size={25} />
                </Title>

                <>
                    <Link to="/new " className="new">
                        <FiPlus color="#FFF" size={25} />
                        Novo Chamado
                    </Link>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Cliente</th>
                                <th scope="col">Assunto</th>
                                <th scope="col">Status</th>
                                <th scope="col">Cadastrado em</th>
                                <th scope="col">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Cliente">Mecador Esquina</td>
                                <td data-label="Assunto">Suporte</td>
                                <td data-label="Status">Em Aberto</td>
                                <td data-label="Cadastrado">12/09/2026</td>
                                <td data-label="#">
                                    <button className="action" style={{ backgroundColor: "#3583f6" }}>
                                        <FiSearch color="#FFF" size={25} />
                                    </button>
                                    <button className="action" style={{ backgroundColor: "#f6a935" }}>
                                        <FiEdit2 color="#FFF" size={25} />
                                    </button>
                                </td>
                            </tr>


                            <tr>
                                <td data-label="Cliente">Informatica Tech</td>
                                <td data-label="Assunto">Suporte</td>
                                <td data-label="Status">Em Aberto</td>
                                <td data-label="Cadastrado">12/09/2026</td>
                                <td data-label="#">
                                    <button className="action" style={{ backgroundColor: "#3583f6" }}>
                                        <FiSearch color="#FFF" size={25} />
                                    </button>
                                    <button className="action" style={{ backgroundColor: "#f6a935" }}>
                                        <FiEdit2 color="#FFF" size={25} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            </div>
        </div>
    )
}


export default Dashboard