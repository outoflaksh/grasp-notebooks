import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import Notebook from "../components/Notebook";
import { NotebookContext } from "../contexts/notebookContext";

const NotebookView = () => {
    const { id } = useParams();
    const {
        notebook,
        setNotebook,
        copyNotebook,
        notebookName,
        setNotebookName,
    } = useContext(NotebookContext);

    useEffect(()=>{
        
    },[id]);
    
    return <div className="main">
        <Notebook editable={false}/>
    </div>
}

export default NotebookView;