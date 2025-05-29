import React from "react";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialYoutube } from "react-icons/sl";
import logowhite from "../logo/logowhite.svg";
import "./SideBar.css";

const SideBar = ({ show }) => {
    return (
        <div className={show ? 'SideBar active' : 'SideBar'}>
            <img src={logowhite} alt="Logo" height={60} />
            <p>Na GymNetic, acreditamos que o movimento é a base de uma vida equilibrada, saudável e feliz. Somos mais do que um ginásio — somos uma comunidade dedicada ao bem-estar físico e mental, onde cada pessoa encontra o seu espaço para evoluir.</p>
            <p className="contact-info">Morada, Rua, Andar, Porta, Localidade, Código Postal</p>
            <p className="contact-info">Telefone</p>
            <p className="contact-info">Outros Contactos</p>
            <p className="contact-info">Horário de Funcionamento</p>
            <div className="social-media-icons">
                <a href="https://www.facebook.com/"><SlSocialFacebook /></a>
                <a href="https://www.instagram.com/"><SlSocialInstagram /></a>
                <a href="https://www.linkedin.com/"><SlSocialLinkedin /></a>
                <a href="https://www.twitter.com/"><SlSocialTwitter /></a>
                <a href="https://www.youtube.com/"><SlSocialYoutube /></a>
            </div>
            <p className="copyright">© 2025 GymNetic</p>
        </div>
    );
};

export default SideBar;