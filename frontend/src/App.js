import "./styles/index.css"
import { NotebookProvider } from "./contexts";
import Workplace from "./pages/workplace";


function App() {

    return (
        <NotebookProvider>
            <Workplace />
        </NotebookProvider>
    );
}

export default App;