import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
export const NotebookContext = createContext();

export function NotebookProvider({ children }) {
    const [notebook, setNotebook] = useState([
        {
            code: "",
            output: "",
            outputStatus: false,
            id: uuidv4(),
        },
    ]);
    const [notebookId, setNotebookId] = useState(uuidv4());

    const savedName = localStorage.getItem("notebookName");

    const [notebookName, setNotebookName] = useState(
        savedName ? savedName : "untitled1"
    );

    function copyNotebook(notebook) {
        let newNotebook = [];
        for (let block of notebook) {
            let newBlock = {
                code: block.code,
                output: block.output,
                outputStatus: block.outputStatus,
                id: block.id,
            };
            newNotebook.push(newBlock);
        }
        return newNotebook;
    }

    function setBlock(blockId, block) {
        let newNotebook = copyNotebook(notebook);
        newNotebook[blockId] = block;
        setNotebook(newNotebook);
    }

    return (
        <NotebookContext.Provider
            value={{
                notebook,
                setBlock,
                setNotebook,
                copyNotebook,
                notebookName,
                setNotebookName,
                notebookId,
                setNotebookId,
            }}
        >
            {children}
        </NotebookContext.Provider>
    );
}
