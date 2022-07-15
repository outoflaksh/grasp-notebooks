import Block from "./components/Block";
import "./styles/index.css"
import Notebook from "./components/Notebook";
import { NotebookProvider } from "./contexts";


function App() {
    return (
            <NotebookProvider>
            <div className="main">
                <Notebook/>
            </div>
            </NotebookProvider>
    );
}

export default App;