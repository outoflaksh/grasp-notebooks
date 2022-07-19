import { createContext, useContext, useState, useEffect } from "react";
import Block from "./components/Block";

export const NotebookContext = createContext();





export function NotebookProvider({ children }) {
    const [notebook, setNotebook] = useState([{
        code: "",
        output: "",
        outputStatus: false,
        id: 0,
    }]);
    const [blockCounter, setBlockCounter] = useState(0);

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
        return newNotebook
    }

    function setBlock(blockId, block) {
        let newNotebook = copyNotebook(notebook);
        newNotebook[blockId] = block
        setNotebook(newNotebook);
    }

    return <NotebookContext.Provider value={{
        notebook, setBlock, setNotebook, copyNotebook, blockCounter, setBlockCounter
    }}>
        {children}
    </NotebookContext.Provider>
}
