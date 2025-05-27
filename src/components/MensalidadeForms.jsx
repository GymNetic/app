import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SlArrowLeft } from "react-icons/sl";
import "./MensalidadeForms.css";

function MensalidadeForms({ planName, planPrice, planDescription }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoBack = (e) => {
        e.preventDefault();
        navigate('/mensalidade-forms');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here
        console.log('Form submitted');
    };

    return (
        <div className="mensalidade-forms">
            <h1>Mensalidades</h1>
            <div className="mensalidade-forms-text">
                <p>Selecionaste este plano: {planName}</p>
                <p>Insere as tuas informações</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mensalidade-forms-container">
                    <div className="mensalidade-forms-input1">
                        <label htmlFor="name">Nome</label>
                        <input type="text" id="name" name="name" required />
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                        <label htmlFor="datanasc">Data de Nascimento</label>
                        <input 
                            type="date" 
                            id="datanasc" 
                            name="datanasc" 
                            placeholder="dd-mm-aaaa"
                            required 
                        />
                    </div>
                    <div className="mensalidade-forms-input2">
                        <label htmlFor="sobrenome">Sobrenome</label>
                        <input type="text" id="sobrenome" name="sobrenome" required />
                        <label htmlFor="telefone">Telefone</label>
                        <input type="tel" id="telefone" name="telefone" required />
                        <label htmlFor="morada">Morada</label>
                        <input type="text" id="morada" name="morada" required />
                    </div>
                </div>
                <div className="mensalidade-forms-checkbox">
                    <input type="checkbox" id="termos" name="Termos" required />
                    <label htmlFor="termos">
                        Aceito os Termos de Uso e Política de Privacidade
                    </label>
                </div>
                <div className="mensalidade-forms-div">
                    <div className="mensalidade-forms-button">
                        <button type="submit">SUBMETER</button>
                    </div>
                    <div 
                        className="mensalidade-forms-back"
                    >
                        <SlArrowLeft />
                        <a 
                            href="#" 
                            className="mensalidade-link"
                            onClick={handleGoBack}
                        >
                            VOLTAR AO PASSO ANTERIOR
                        </a>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default MensalidadeForms;