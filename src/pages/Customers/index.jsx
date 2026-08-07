import Header from "../../components/Header"
import Title from "../../components/Title"
import { FiUser } from "react-icons/fi"
import { useState } from "react"
import { db } from "../../services/firebaseConnction"
import { addDoc, collection } from "firebase/firestore"
import { toast } from "react-toastify"
const Customers = () => {
    const [nome, setNome] = useState("")
    const [cnpj, setcnpj] = useState("")
    const [endereco, setEndereco] = useState("")

    const hadleRegister = async (e) => {
        e.preventDefault()
        if (nome !== "" && cnpj !== "" && endereco !== "") {
            await addDoc(collection(db, "customers"), {
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco
            })
            setNome("")
            setcnpj("")
            setEndereco("")
            toast.success("Empresa registrada!")
        }else{
            toast.error("Preencha todos os campos!")
        }
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25} />
                </Title>
                <main className="container" onSubmit={hadleRegister}>
                    <form className="form-profile" >
                        <label >Nome fantasia</label>
                        <input type="text" placeholder="Nome da empresa"
                            value={nome} onChange={(e) => setNome(e.target.value)}
                        />
                        <label >CNPJ</label>
                        <input type="text" placeholder="Digite o CNPJ"
                            value={cnpj} onChange={(e) => setcnpj(e.target.value)}
                        />
                        <label >Endereço</label>
                        <input type="text" placeholder="Digite o CNPJ"
                            value={endereco} onChange={(e) => setEndereco(e.target.value)}
                        />
                        <button type="submit">Cadastrar</button>
                    </form>
                </main>
            </div>
        </div>
    )

}


export default Customers