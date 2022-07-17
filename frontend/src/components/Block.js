import { useContext, useRef, useState } from "react";
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

function Block({ blockId }) {
  const codeBlockContent = useRef();
  const { notebook, setBlock } = useContext(NotebookContext);

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
      };
      setBlock(blockId, newBlock);
    } else {
      newOutput = data.result[0];
      let newBlock = {
        code: sanitizedCode,
        output: newOutput,
        outputStatus: false,
      };
      setBlock(blockId, newBlock);
    }
  }
  function clearOutput() {
    let code = codeBlockContent.current.innerHTML;
    let sanitizedCode = unescapeHTML(code.replace(/(<([^>]+)>)/gi, ""));
    let newBlock = {
      code: sanitizedCode,
      output: "",
      outputStatus: false,
    };
    setBlock(blockId, newBlock);
  }
  return (
    <div className="block">
      <div className="code-block">
        <div className="code-block-info">
          <button className="run-code-button" onClick={runCode}>
            <img src={runCodeIcon} />
          </button>
        </div>
        <pre
          className="code-block-content"
          contentEditable="true"
          ref={codeBlockContent}
          spellCheck="false"
        />
      </div>
      {(() => {
        if (notebook[blockId].output.length > 0)
          return (
            <div
              className={
                "output-block" +
                " " +
                (notebook[blockId].outputStatus
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
                if (notebook[blockId].outputStatus)
                  return (
                    <OutputTable data={notebook[blockId].output}></OutputTable>
                  );
                else
                  return (
                    <div className="output-text">
                      {notebook[blockId].output}
                    </div>
                  );
              })()}
            </div>
          );
        else return null;
      })()}
    </div>
  );
}

export default Block;
