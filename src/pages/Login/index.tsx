import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepLogged, setKeepLogged] = useState(false);

    const handleLogin = async () => {
        if (email && password) {
            const isLogged = await auth.signin(email, password, keepLogged);
            if (isLogged) {
                navigate('/');
            } else {
                alert("Não deu certo.")
            }
        }
    }

    return (
        <div>
            <h2>Página Fechada</h2>

            <input
                type="text"
                name="email"
                id="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder="Digite seu e-mail"
            />
            <input
                type="password"
                name="senha"
                id="senha"
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="Digite sua senha"
            />
            <button onClick={handleLogin}>Logar</button>
            <br /><br />
            <label htmlFor="loggedKeep">
                <input
                    type="checkbox"
                    name="loggedKeep"
                    onChange={e => setKeepLogged(e.target.checked)}
                    id="loggedKeep"
                /> Manter logado
            </label>
        </div>
    )
}