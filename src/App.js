import React from "react"
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CustomPage from "./pages/CustomPage";

function App() {

    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CustomPage />}/>
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
