import React from "react";
import { Container, Navbar } from "react-bootstrap";


export default function NavBar() {
    return (
        <>

            <Navbar className="bg-dark text-white shadow">
                <Container className=" justify-content-center">
                    <Navbar.Brand className="text-white fw-bold fst-italic fs-3 " href="#home"><h1>Maze Solver</h1></Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}