import { useContext, useEffect, useRef, useState } from "react";
import "../styles/block.css";
import runCodeIcon from "../assets/runCode.png";
import OutputTable from "./OutputTable";
import { NotebookContext } from "../contexts";

function sqlizeData(data) {
  let columns = [];
  for (let column in data[0]) {
    columns.push(column);
  }
  let matrix = [[...columns]];
  data.shift();
  for (let r of data) {
    let row = [];
    for (let col_name of columns) {
      row.push(r[col_name]);
    }
    matrix.push(row);
  }
  return matrix;
}

function unescapeHTML(escapedHTML) {
  return escapedHTML
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

async function executeQuery(code) {
  const requestBody = JSON.stringify({ query: code });
  const response = await fetch("http://localhost:8000/run/", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  });
  const data = await response.json();
  return data;
}

function Block({ blockId, blockIdx }) {
  const codeBlockContent = useRef();
  const block = useRef();
  const {
    notebook,
    setBlock,
    copyNotebook,
    setNotebook,
    blockCounter,
    setBlockCounter,
  } = useContext(NotebookContext);

  useEffect(() => {
    block.current.addEventListener("mouseover", () => {
      let optns = block.current.querySelectorAll(".block-optn");
      optns.forEach((element) => {
        element.classList.remove("hide");
      });
    });
    block.current.addEventListener("mouseleave", () => {
      let optns = block.current.querySelectorAll(".block-optn");
      optns.forEach((element) => {
        element.classList.add("hide");
      });
    });
  }, []);

  async function runCode() {
    clearOutput();
    let code = codeBlockContent.current.innerHTML;
    let sanitizedCode = unescapeHTML(code.replace(/(<([^>]+)>)/gi, ""));
    let data = await executeQuery(sanitizedCode);
    let newOutput = "";
    if (data.status) {
      newOutput = sqlizeData(data.result);
      let newBlock = {
        code: sanitizedCode,
        output: newOutput,
        outputStatus: true,
        id: blockId,
      };
      setBlock(blockIdx, newBlock);
    } else {
      newOutput = data.result[0];
      let newBlock = {
        code: sanitizedCode,
        output: newOutput,
        outputStatus: false,
        id: blockId,
      };
      setBlock(blockIdx, newBlock);
    }
  }
  function clearOutput() {
    let code = codeBlockContent.current.innerHTML;
    let sanitizedCode = unescapeHTML(code.replace(/(<([^>]+)>)/gi, ""));
    let newBlock = {
      code: sanitizedCode,
      output: "",
      outputStatus: false,
      id: blockId,
    };
    setBlock(blockIdx, newBlock);
  }
  function addBlockBelow() {
    let newNotebook = copyNotebook(notebook);
    let newBlock = {
      code: "",
      output: "",
      outputStatus: false,
      id: blockCounter + 1,
    };
    setBlockCounter(blockCounter + 1);
    newNotebook.splice(blockIdx + 1, 0, newBlock);
    setNotebook(newNotebook);
  }
  function removeBlock() {
    let newNotebook = copyNotebook(notebook);
    newNotebook.splice(blockIdx, 1);
    setNotebook(newNotebook);
  }
  return (
    <div className="block" ref={block}>
      <div className="code-block">
        <div className="code-block-info">
          <button className="run-code-button" onClick={runCode}>
            <img src={runCodeIcon} />
          </button>
        </div>
        <div
          className="code-block-content"
          contentEditable="true"
          ref={codeBlockContent}
          spellCheck="false"
        />
      </div>
      {(() => {
        if (notebook[blockIdx].output.length > 0)
          return (
            <div
              className={
                "output-block" +
                " " +
                (notebook[blockIdx].outputStatus
                  ? "output-success"
                  : "output-error")
              }
            >
              <div className="output-block-info">
                <span className="clear-output" onClick={clearOutput}>
                  [ CLEAR ]
                </span>
              </div>
              {(() => {
                if (notebook[blockIdx].outputStatus)
                  return (
                    <OutputTable data={notebook[blockIdx].output}></OutputTable>
                  );
                else
                  return (
                    <div className="output-text">
                      {notebook[blockIdx].output}
                    </div>
                  );
              })()}
            </div>
          );
        else return null;
      })()}
      <div className="block-optn-wrapper">
        <button className="block-optn hide" onClick={addBlockBelow}>
          Insert Block
        </button>
        <button className="block-optn hide" onClick={removeBlock}>
          Delete Block
        </button>
      </div>
    </div>
  );
}

export default Block;
