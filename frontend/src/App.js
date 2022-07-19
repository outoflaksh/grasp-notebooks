import "./styles/index.css"
import { NotebookProvider } from "./contexts/notebookContext";
import Workplace from "./pages/workplace";
import Nav from "./components/Nav";
import { MenuProvider } from "./contexts/menuContext";


function App() {

    return (
        <NotebookProvider>
            <MenuProvider>
                <Nav />
                <Workplace />
            </MenuProvider>
        </NotebookProvider>
    );
}

export default App;