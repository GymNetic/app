import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import './BackButton.css';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button className="back-button" onClick={() => navigate(-1)}>
            <IoIosArrowBack size={24} />
            Voltar
        </button>
    );
};

export default BackButton;