import { AuthContext } from "../../Contexts/auth"
import { useContext, useState, useEffect } from "react"
import Header from "../../components/Header"
import "./dashboard.css"
import Title from "../../components/Title"
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi"
import { Link } from "react-router-dom"
import { collection, getDocs, orderBy, limit, startAfter, query } from "firebase/firestore"
import { db } from "../../services/firebaseConnction"
import { format } from "date-fns"

const listaRef = collection(db, "chamados")

const Dashboard = () => {
    const [chamados, setChamados] = useState([])
    const [loading, setLoading] = useState(true)
    const [isEmpety, setInEmpety] = useState(false)
    const [lastDocs, setLastDocs] = useState()
    const [loadingMore, setloadingMore] = useState(false)
    useEffect(() => {
        const loadChamado = async () => {
            const q = query(listaRef, orderBy("created", "desc"), limit(5))
            const querySnapshot = await getDocs(q)
            setChamados([])
            await updateState(querySnapshot)
            setLoading(false)
        }
        loadChamado()
        return () => { }
    }, [])

    const updateState = async (querySnapshot) => {
        const iscollectionEmpty = querySnapshot.size === 0
        if (!iscollectionEmpty) {
            let lista = []
            querySnapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    createdFormat: format(doc.data().created.toDate(), "dd/MM/yyyy"),
                    status: doc.data().status,
                    complemento: doc.data().complemento
                })
            })
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
            setLastDocs(lastDoc)
            setChamados(chamados => [...chamados, ...lista])
        } else {
            setInEmpety(true)
        }
        setloadingMore(false)
    }

    if (loading) {
        return (
            <div>
                <Header />
                <div className="content">
                    <Title name="Chamados">
                        <FiMessageSquare size={25} />
                    </Title>
                    <div className="container dashboard">
                        <span>Buscando chamados...</span>
                    </div>
                </div>
            </div>
        )
    }

    const hadleMore = async () => {
        setloadingMore(true)
        const q = query(listaRef, orderBy("created", "desc"), startAfter(lastDocs), limit(3))
        const querySnapshot = await getDocs(q)
        await updateState(querySnapshot)
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Chamados">
                    <FiMessageSquare size={25} />
                </Title>

                <>

                    {chamados.length === 0 ? (
                        <div className="container dashboard">
                            <span>Nenhum chamado encontrado.. </span>
                            <Link to="/new " className="new">
                                <FiPlus color="#FFF" size={25} />
                                Novo Chamado
                            </Link>
                        </div>
                    ) : (
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
                                    {chamados.map((item, index) => (
                                        <tr key={index}>
                                            <td data-label="Cliente">{item.cliente}</td>
                                            <td data-label="Assunto">{item.assunto}</td>
                                            <td data-label="Status">
                                                <span className="badge" style={{ backgroundColor: item.status === "Aberto" ? "#5cb85c" : "#999" }} >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td data-label="Cadastrado">{item.createdFormat}</td>
                                            <td data-label="#">
                                                <button className="action" style={{ backgroundColor: "#3583f6" }}>
                                                    <FiSearch color="#FFF" size={25} />
                                                </button>
                                                <Link to={`/new/${item.id}`} className="action" style={{ backgroundColor: "#f6a935" }}>
                                                    <FiEdit2 color="#FFF" size={25} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                            {loadingMore && <h3>Buscado mais chamados...</h3>}
                            {!loadingMore && !isEmpety && <button className="btnMore" onClick={hadleMore}>Buscar</button>}
                        </>
                    )}

                </>
            </div>
        </div>
    )
}
export default Dashboard