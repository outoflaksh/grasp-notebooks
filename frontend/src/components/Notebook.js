import { useContext } from "react";
import { NotebookContext } from "../contexts";
import "../styles/notebook.css";
import Block from "./Block";




function Notebook() {
    let { notebook, setNotebook, copyNotebook } = useContext(NotebookContext);
    function addBlockBelow(blockId){
        let newNotebook = copyNotebook(notebook);
        newNotebook.splice(blockId+1, 0, {code:"",output:"",outputStatus:false});
        setNotebook(newNotebook);
    }
    return (
        <div className="notebook">
            {
                notebook.map((block, blockId) => {
                    return (
                        <div className="block-wrapper" key={"block-wrapper" + blockId}>
                            <Block blockId={blockId} key={"block" + blockId} />
                            <button onClick={()=>addBlockBelow(blockId)}>add block</button>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Notebook;