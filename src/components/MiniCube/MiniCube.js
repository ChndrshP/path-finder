import React from "react";
import { Container } from "react-bootstrap";
import { useState } from "react";
import "./MiniCube.css";


const Cube = ({ x, y }) => {
    const [i, setI] = useState(0);
    const changeColor = () => {
        setI((i + 1) % 4);
        const element = document.getElementById(x + "." + y);
        element.style.textAlign = "center";
        element.style.fontSize = "7px";
        element.style.fontWeight = "bold";
        if (i === 0) {
            element.style.border = "2px solid #f8f9fa";
            // element.innerHTML = 'S';
            element.classList.add("start");
            element.classList.remove("block");
            element.classList.remove("goal");
            element.classList.remove("defaultColor");
        } else if (i === 1) {
            element.style.border = "2px solid #f8f9fa ";
            // element.innerHTML = 'G';
            element.classList.add("goal");
            element.classList.remove("block");
            element.classList.remove("start");
            element.classList.remove("defaultColor");
        } else if (i === 2) {
            // element.style.border = "2px solid black";
            // element.innerHTML = 'X';
            element.classList.add("block");
            element.classList.remove("goal");
            element.classList.remove("start");
            element.classList.remove("defaultColor");
        }else{
            element.classList.add("defaultColor");
            element.classList.remove("goal");
            element.classList.remove("start");
            element.classList.remove("block");
            
        }

    }
    return (
        <div className="cube col-1 defaultColor text-white align-items-center  rounded-1 p-1 m-1 display-inline-block  " id={x + "." + y} onClick={() => { changeColor() }} style={{ width: "20px", height: "20px" }} ></div>
    );

}

export default Cube;