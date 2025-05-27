import React, { useState } from 'react';
import './ClassSlider.css';
import BtnSlider from '../Slider/BtnSlider';
import dataClasses from './DataClass';

function ClassSlider() {
    const [slideIndex, setSlideIndex] = useState(0);
    const classesPerSlide = 3;
    
    const extendedClasses = [...dataClasses, ...dataClasses.slice(0, classesPerSlide)];
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
                                    .map((classItem) => (
                                        <div key={classItem.id} className="class-card-container">
                                            <div 
                                                className="class-card"
                                                style={{
                                                    backgroundImage: `url(${classItem.image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            />
                                            <h2 className="class-title">{classItem.title}</h2>
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