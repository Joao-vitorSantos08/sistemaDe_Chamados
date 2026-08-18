import Header from "../../components/Header"
import Title from "../../components/Title"
import { FiPlusCircle } from "react-icons/fi"
import "./new.css"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../Contexts/auth"
import { db } from "../../services/firebaseConnction"
import { collection, getDocs, getDoc, doc, addDoc, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { useParams, useNavigate} from "react-router-dom"

const listaRef = collection(db, "customers")

const NewChamado = () => {
    const { user } = useContext(AuthContext)
    const [customes, setcustomer] = useState([])
    const [loadCustomer, setLoadCustomer] = useState(true)
    const [customerSelected, setCustomerSelected] = useState(0)
    const [idCustomer, setIdCustomer] = useState(false)
    const navigate = useNavigate()

    const [complemento, setComplemento] = useState("")
    const [assunto, setAssunto] = useState("Suporte")
    const [status, setStatus] = useState("Aberto")
    const { id } = useParams()

    useEffect(() => {
        const loadCustomer = async () => {

            const querySnapshot = await getDocs(listaRef)
                .then((snapshot) => {
                    let lista = []

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeFantasia: doc.data().nomeFantasia
                        })
                    })
                    if (snapshot.docs.size === 0) {
                        console.log("Nhuma empresa encontrada")
                        setcustomer([{ id: "1", nomeFantasia: "Freela" }])
                        setLoadCustomer(false)
                        return
                    }
                    setcustomer(lista)
                    setLoadCustomer(false)
                    if (id) {
                        loadId(lista)
                    }
                })
                .catch((error) => {
                    console.log("Erro ao buscar os clientes" + error)
                    setLoadCustomer(false)
                    setcustomer([{ id: "1", nomeFantasia: "Freela" }])
                })
        }

        loadCustomer()
    }, [id])

    const loadId = async (lista) => {
        const docref = doc(db, "chamados", id)
        await getDoc(docref)
            .then((snapshot) => {
                setAssunto(snapshot.data().assunto)
                setStatus(snapshot.data().status)
                setComplemento(snapshot.data().complemento)
                let index = lista.findIndex(item => item.id === snapshot.data().clienteId)
                setCustomerSelected(index)
                setIdCustomer(true)
            })
            .catch((error) => {
                console.log(error)
                setIdCustomer(false)
            })
    }

    const handleOptionChange = (e) => {
        setStatus(e.target.value)
    }

    const handleChangeSelect = (e) => {
        setAssunto(e.target.value)
    }

    const handleChangeCustomers = (e) => {
        setCustomerSelected(e.target.value)
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        if (idCustomer) {
            const docRef = doc(db, "chamados", id)
            await updateDoc(docRef, {
                cliente: customes[customerSelected].nomeFantasia,
                clienteId: customes[customerSelected].id,
                assunto: assunto,
                complemento: complemento,
                status: status,
                userId: user.uid
            })
            toast.info("Chamado atulizado com sucesso")
            setCustomerSelected(0)
            setComplemento("")
            navigate("/dashboard")

            return
        }
        await addDoc(collection(db, "chamados"), {
            created: new Date(),
            cliente: customes[customerSelected].nomeFantasia,
            clienteId: customes[customerSelected].id,
            assunto: assunto,
            complemento: complemento,
            status: status,
            userId: user.uid
        })
            .then(() => {
                toast.success("Chamado registrado!")
                setComplemento("")
                setCustomerSelected(0)
            })
            .catch((error) => {
                console.log("Erro ao registrar " + error)
            })
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name={id? "Editando chamado" : "Novo chamado"}>
                    <FiPlusCircle size={25} />
                </Title>
                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label >Clientes</label>
                        {
                            loadCustomer ? (
                                <input type="text" disabled={true} value="Carregando..." />
                            ) : (
                                <select value={customerSelected} onChange={handleChangeCustomers}>
                                    {customes.map((item, index) => (
                                        <option key={index} value={index}>
                                            {item.nomeFantasia}
                                        </option>
                                    ))}
                                </select>
                            )
                        }
                        <label >Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value="suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>
                        <label>Status</label>
                        <div className="status">
                            <input type="radio"
                                name="radio"
                                value="Aberto"
                                onChange={handleOptionChange}
                                checked={status === "Aberto"}
                            />
                            <span>Em aberto</span>

                            <input type="radio"
                                name="radio"
                                value="Progreso"
                                onChange={handleOptionChange}
                                checked={status === "Progreso"}
                            />
                            <span>Progresso</span>

                            <input type="radio"
                                name="radio"
                                value="Atendido"
                                onChange={handleOptionChange}
                                checked={status === "Atendido"}
                            />
                            <span>Atendido</span>
                        </div>

                        <label >Complemento</label>
                        <textarea
                            type="text"
                            placeholder="Descreva seu problema (opcional)"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />
                        <button type="submit">Regitrar Chamado</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewChamado