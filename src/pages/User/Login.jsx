import React, { useState } from "react";
import SimplePopUp from "../../components/simplePopUp.jsx";
import "./Login.css";

function Login() {
    const [showPopUp, setShowPopUp] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    return (
        <div className="user-area">
            <div className="user-area-image">
                <img src="https://www.nutri.pt/wp-content/uploads/2020/01/nutricionista.jpg" alt=" " />
                <div className="user-area-title">
                    <h1>ÁREA DE UTILIZADOR</h1>
                </div>
            </div>

            <div className="login-forms">
                <h1>Acede a tua Conta</h1>
                <form onSubmit={handleSubmit}>
                    <div className="login-forms-container">
                        <div className="login-forms-input">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                            <label htmlFor="acesscode">Código de Acesso</label>
                            <input type="text" id="acesscode" name="acesscode" required />
                        </div>
                    </div>
                    <div className="login-forms-div">
                        <button className="login-forms-button" type="submit">SUBMETER</button>
                        <a
                            href="#"
                            className="login-link"
                            onClick={e => { e.preventDefault(); setShowPopUp(true); }}
                        >
                            O que é um Código de Acesso?
                        </a>
                    </div>
                    {showPopUp && (
                        <SimplePopUp onClose={() => setShowPopUp(false)} />
                    )}
                </form>
            </div>
        </div>
    );
}

export default Login;
