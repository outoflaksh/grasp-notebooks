import "./styles/index.css";
import { NotebookProvider } from "./contexts/notebookContext";
import Workplace from "./pages/workplace";
import Nav from "./components/Nav";
import { MenuProvider } from "./contexts/menuContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/authContext";
import NotebookView from "./pages/NotebookView";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <AuthProvider>
            <NotebookProvider>
                <MenuProvider>
                    <BrowserRouter>
                        <Nav />
                        <Routes>
                            <Route path="" element={<Login />} />
                            <Route path="workplace" element={<Workplace />} />
                            <Route path="nb/:id" element={<NotebookView />} />
                            <Route path="dashboard" element={<Dashboard />} />
                        </Routes>
                    </BrowserRouter>
                </MenuProvider>
            </NotebookProvider>
        </AuthProvider>
    );
}

export default App;
