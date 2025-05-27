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
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
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