import "./styles/index.css"
import { NotebookProvider } from "./contexts/notebookContext";
import Workplace from "./pages/workplace";
import Nav from "./components/Nav";


function App() {

    return (
        <NotebookProvider>
            <Nav />
            <Workplace />
        </NotebookProvider>
    );
}

export default App;