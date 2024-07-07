import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Cube from "../MiniCube/MiniCube";
import { useState } from "react";
import "./MainPage.css";

async function wait(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
}

const createCubes = (numCols, numRows) => {
    const finalRes = [];
    for (let i = 0; i < numRows; i++) {
        let cols = [];
        for (let j = 0; j < numCols; j++) {
            cols.push(<Cube x={j} y={i} />);
        }
        finalRes.push(<Row >{cols}</Row>);

    }

    return finalRes;
}


const find = (vis, id) => {
    for (let i = 0; i < vis.length; i++) {
        if (vis[i] == id) {
            return true;
        }
    }
    return false;
}


const MainPage = () => {

    const [numCols, setNumCols] = React.useState(10);
    const [numRows, setNumRows] = React.useState(10);

    const [startArr, setStartArr] = useState([]);
    const [goalArr, setGoalArr] = useState([]);
    const [blockArr, setBlockArr] = useState([]);

    let [counter, setCounter] = useState(0);


    const [waiting, setWaiting] = useState(0.1);

    const getStart = () => {

        const start = document.getElementsByClassName("start");
        const goal = document.getElementsByClassName("goal");
        const block = document.getElementsByClassName("block");

        for (let i = 0; i < start.length; i++) {
            startArr.push(start[i].id);
        }

        for (let i = 0; i < goal.length; i++) {
            goalArr.push(goal[i].id);
        }

        for (let i = 0; i < block.length; i++) {
            blockArr.push(block[i].id);
        }


    }

    const bfs = async () => {
        getStart();
        const q1 = [];
        for (let i = 0; i < startArr.length; i++) {
            q1.push(startArr[i]);
        }

        const vis = [];

        while (q1.length != 0) {

            const sz = q1.length;

            for (let i = 0; i < sz; i++) {

                const id = q1.shift();
                const s = id.split(".");

                const r = Number(s[0]);
                const c = Number(s[1]);

                if (c >= numRows || r >= numCols || r < 0 || c < 0 || document.getElementById(id) == null || document.getElementById(id).classList.contains("block") || find(vis, id)) {
                    continue;
                }

                vis.push(id);
                const ele = document.getElementById(id);
                if (ele.classList.contains("goal")) {
                    alert("Found Goal");
                    return true;
                }

                ele.style.backgroundColor = '#22c077';
                counter++;
                setCounter(counter);
                await wait(waiting)


                const up = (r - 1) + "." + c;
                const down = (r + 1) + "." + c;
                const left = r + "." + (c - 1);
                const right = r + "." + (c + 1);

                q1.push(up);
                q1.push(down);
                q1.push(left);
                q1.push(right);
            }

        }
        return false;
    }


    const dfs = () => {
        getStart();
        let found = false;
        const s1 = [];
        for (let i = 0; i < startArr.length; i++) {
            s1.push(startArr[i]);
        }
        const vis = [];
        const dfs1 = async (r, c, id) => {
            if (r < 0 || c < 0 || r >= numCols || c >= numRows || document.getElementById(id) == null || document.getElementById(id).classList.contains("block") || find(vis, id)) {
                return;
            }
            vis.push(id);
            const ele = document.getElementById(id);
            ele.style.backgroundColor = "#22c077";

            counter++;
            setCounter(counter);
            await wait(waiting)

            if (ele.classList.contains("goal")) {
                alert("Found Goal");
                found = true;
                return;
            }
            if (!found) await dfs1(r, c + 1, (r) + '.' + (c + 1));
            if (!found) await dfs1(r, c - 1, (r) + '.' + (c - 1));
            if (!found) await dfs1(r + 1, c, (r + 1) + '.' + (c));
            if (!found) await dfs1(r - 1, c, (r - 1) + '.' + (c));

            return;
        }

        for (let i = 0; i < s1.length; i++) {
            const id = s1[i];
            const s = id.split(".");
            const r = Number(s[0]);
            const c = Number(s[1]);
            dfs1(r, c, id);
        }
        return found;

    }

    const randomCreation = () => {
        const create = () => {
            const [rg, cg] = [Math.floor(Math.random() * numCols), Math.floor(Math.random() * numRows)];
            return [rg, cg];
        }


        const vis = [];
        const randomCreationNumber = Math.floor(numRows * numCols / 3);

        const [rs, cs] = [Math.floor(Math.random() * numCols), Math.floor(Math.random() * numRows)];
        vis.push(rs + "." + cs);
        let [rg, cg] = create();
        while (vis.includes(rg + "." + cg)) {
            [rg, cg] = create();
        }
        vis.push(rg + "." + cg);

        const start = document.getElementById(rs + "." + cs);
        start.classList.add("start");
        const goal = document.getElementById(rg + "." + cg);
        goal.classList.add("goal");

        let i = 2;

        while (i < randomCreationNumber) {
            let [r, c] = create();
            while (vis.includes(r + "." + c)) {
                [r, c] = create();
            }
            vis.push(r + "." + c);
            const ele = document.getElementById(r + "." + c);
            ele.classList.add("block");
            i++;

        }

    }

    const [cubes, setCubes] = useState(null);

    return (
            <div className="bg-dark text-white vh-100 d-flex flex-column">
                {/* Top Row: Input Section */}
                <Container className="p-3">
                    <Row className="justify-content-center text-center align-items-center">
                        <Col xs={12} md={4} className="mb-3">
                            {cubes}
                        </Col>
                        <Col xs={12} md={4} className="mb-3 d-flex justify-content-center">
                            <div className="w-75">
                                <Row className="mb-3">
                                    <Col xs={12} className="text-center">
                                        <label htmlFor="numRows" className="form-label">Number of Rows</label>
                                    </Col>
                                    <Col xs={12}>
                                        <input type="number" className="form-control bg-dark text-white" id="numRows" value={numRows} onChange={(e) => setNumRows(e.target.value)} min={1} max={12} />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col xs={12} className="text-center">
                                        <label htmlFor="numCols" className="form-label">Number of Columns</label>
                                    </Col>
                                    <Col xs={12}>
                                        <input type="number" className="form-control bg-dark text-white" id="numCols" value={numCols} onChange={(e) => setNumCols(e.target.value)} min={1} max={12} />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col xs={12} className="text-center">
                                        <label htmlFor="waiting" className="form-label">Waiting Time</label>
                                    </Col>
                                    <Col xs={12}>
                                        <input type="number" className="form-control bg-dark text-white" id="waiting" value={waiting} onChange={(e) => setWaiting(e.target.value)} min={0.1} max={3} step={0.1} />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={12} md={4} className="mb-3 d-flex justify-content-center align-items-center">
                            <Row className="flex-column">
                                <Col xs={12} className="text-center mb-2">
                                    <Button variant="primary" onClick={() => { setCubes(createCubes(numCols, numRows)) }}>Create</Button>
                                </Col>
                                <Col xs={12} className="text-center mb-2">
                                    <Button variant="primary" onClick={() => { bfs(); }}>Breadth-First Search</Button>
                                </Col>
                                <Col xs={12} className="text-center mb-2">
                                    <Button variant="primary" onClick={() => { dfs(); }}>Depth-First Search</Button>
                                </Col>
                                <Col xs={12} className="text-center">
                                    <Button variant="primary" onClick={() => { randomCreation(); }}>Random Creation</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

                {/* Move Counter */}
                <div className="p-3">
                    <Row className="justify-content-center">
                        <Col xs={12} className="text-center">
                            <h1 className="mt-2 mb-0 text-white">moves: {counter}</h1>
                        </Col>
                    </Row>
                </div>
            </div>



    );

}

export default MainPage;