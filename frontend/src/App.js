import "./styles/index.css"
import { NotebookProvider } from "./contexts/notebookContext";
import Workplace from "./pages/workplace";
import Nav from "./components/Nav";
import { MenuProvider } from "./contexts/menuContext";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";


function App() {

    return (
        <NotebookProvider>
            <MenuProvider>
                <Nav />
                <BrowserRouter>
                <Routes>
                    <Route path="workplace" element={<Workplace />}/>
                    <Route path="login" element={<Login/>}/>
                </Routes>
                </BrowserRouter>
            </MenuProvider>
        </NotebookProvider>
    );
}

export default App;