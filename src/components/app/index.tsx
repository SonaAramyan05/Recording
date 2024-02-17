import React, { FC } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home } from "../home";

const App: FC = () => {
    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li>
                        <Link to={"/home"}>Home</Link>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<div>Error</div>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
