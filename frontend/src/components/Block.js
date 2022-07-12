import { useRef, useState } from "react";
import "../styles/block.css"
import runCodeIcon from "../assets/runCode.png"

function Block() {
    const codeBlockContent = useRef();

    function runCode(){
        let content = codeBlockContent.current.innerHTML;
        let sanitizedCode = content.replace( /(<([^>]+)>)/ig, '');
        console.log(sanitizedCode);
    }

    return (
        <div className="code-block">
            <div className="code-block-info">
                <button className="run-code-button" onClick={runCode}><img src={runCodeIcon}/></button>
            </div>
            <pre className="code-block-content" contentEditable="true" ref={codeBlockContent} spellCheck="false">
            </pre>

        </div>
    );
}

export default Block;