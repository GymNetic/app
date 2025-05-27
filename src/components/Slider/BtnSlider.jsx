import React from "react";
import "./Slider.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function BtnSlider({direction, moveSlide}) {
    console.log(direction, moveSlide);
    return (
        <button 
        onClick={moveSlide}
        className={direction === "next" ? 'btn-slide next' : "btn-slide prev"}>
            {direction === "next" ? <IoIosArrowForward /> : <IoIosArrowBack />}
        </button>
    )
}

export default BtnSlider;