import React from "react";
import {
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialLinkedin,
  SlSocialTwitter,
  SlSocialYoutube,
} from "react-icons/sl";
import logo from "../logo/logo2.svg";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section left">
        <img src={logo} alt="Logo" height={60} />
        <div className="social-media-icons">
          <a href="#"><SlSocialInstagram /></a>
          <a href="#"><SlSocialLinkedin /></a>
          <a href="#"><SlSocialTwitter /></a>
          <a href="#"><SlSocialFacebook /></a>
          <a href="#"><SlSocialYoutube /></a>
        </div>
      </div>

<div className="footer-section centrada">
<div className="footer-section center">
        <h3>Links Rápidos</h3>
        <div className="links">
                <ul>
                    <li><a href="/ExerciciosP">Exercícios</a></li>
                    <li><a href="/PlanoTreinoP">Plano de Treino</a></li>                
                    <li><a href="/AulasGrupoP">Aulas de Grupo</a></li>
                    <li><a href="/HorariosAGP">Horários Aulas</a></li>                    
                </ul>
                <ul>
                    <li><a href="/PlanoNutriP">Plano Nutricional</a></li>
                    <li><a href="/AgendarPlanoNutriP">Avaliação Nutricional | Agendar</a></li>
                    <li><a href="/AgendarPlanoTreinoP">Personal Trainer | Agendar</a></li>
                    <li><a href="/AdesaoP">Mensalidades</a></li>
                </ul>
        </div>
    </div>   
</div>

      <div className="footer-section right">
        <p>Morada, Rua, Andar, Porta, Localidade, Código Postal</p>
        <p>Telefone</p>
        <p>Outros Contactos</p>
      </div>
    </footer>
  );
}

export default Footer;
