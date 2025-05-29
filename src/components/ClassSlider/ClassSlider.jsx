import './ClassSlider.css';
import { useState } from 'react';
import BtnSlider from '../Slider/BtnSlider';
import { Link } from 'react-router-dom';

function ClassSlider({ data = [], classesPerSlide = 3, title }) {
    const [slideIndex, setSlideIndex] = useState(0);
    const [hoveredCard, setHoveredCard] = useState(null);

    const extendedClasses = [...data, ...data.slice(0, classesPerSlide)];
    const totalSlides = Math.ceil(extendedClasses.length / classesPerSlide);

    const nextSlide = () => {
        if (slideIndex === totalSlides - 2) {
            setSlideIndex(0);
            return;
        }
        setSlideIndex(slideIndex + 1);
    };

    const prevSlide = () => {
        if (slideIndex === 0) {
            setSlideIndex(totalSlides - 2);
            return;
        }
        setSlideIndex(slideIndex - 1);
    };

    return (
        <div className="class-slider">
            {title && <h1 className="slider-title">{title}</h1>}

            <div className="class-slider-container">
                <div
                    className="class-slider-wrapper"
                    style={{
                        transform: `translateX(-${slideIndex * (100/totalSlides)}%)`,
                        width: `${totalSlides * 100}%`
                    }}
                >
                    {Array.from({ length: totalSlides - 1 }).map((_, slideIdx) => (
                        <div
                            key={slideIdx}
                            className="class-slide"
                            style={{ width: `${100/totalSlides}%` }}
                        >
                            <div className="class-slide-content">
                                {extendedClasses
                                    .slice(slideIdx * classesPerSlide, (slideIdx + 1) * classesPerSlide)
                                    .map((item) => (
                                        <div
                                            key={item.id}
                                            className="class-card-container"
                                            onMouseEnter={() => setHoveredCard(item.id)}
                                            onMouseLeave={() => setHoveredCard(null)}
                                        >
                                            <Link to={item.link} className="class-card-link">
                                                <div
                                                    className="class-card"
                                                    style={{
                                                        backgroundImage: `url(${item.image})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center'
                                                    }}>
                                                    <h2 className="class-title">{item.title}</h2>
                                                    {item.desc && hoveredCard === item.id && (
                                                        <p className="card-description">{item.desc}</p>
                                                    )}
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>
            <BtnSlider moveSlide={nextSlide} direction={"next"}/>
        </div>
    );
}

export default ClassSlider;