import React, { useState } from 'react';
import './Slider.css';
import BtnSlider from './BtnSlider';
import dataSlider from './dataSlider';

function Slider() {
    const [slideIndex, setSlideIndex] = useState(1);

    const nextSlide = () => {
        if (slideIndex !== dataSlider.length) {
        setSlideIndex(slideIndex + 1);
        } else if (slideIndex === dataSlider.length) {
        setSlideIndex(1);
        }
    }

    const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
    }

    const moveDot = (index) => {
        setSlideIndex(index);
    }

    console.log(Array.from({ length: dataSlider.length }));
    return (
        <div className="container-slider">
            {dataSlider.map((obj, index) => (
                <div
                key={obj.id}
                className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                >
                    <img
                        src={`/Imgs/img${index + 1}.jpg`}
                        alt={obj.alt || `Slide ${index + 1}`}
                    />
                    <h1>{obj.title}</h1>
                    <p>{obj.description}</p>
                </div>
            ))}
            <BtnSlider moveSlide={nextSlide} direction={"next"}/>
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({ length: dataSlider.length }).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => moveDot(index + 1)}
                        className={slideIndex === index + 1 ? "dot active" : "dot"}
                        
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default Slider;