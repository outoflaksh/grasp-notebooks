import "../styles/outputTable.css"

function OutputTable({ data }) {
    let headingArr = data[0];
    let bodyArr = [...data];
    bodyArr.shift();
    return (
        <table className="output-table">
            <thead>
                <tr>
                    {headingArr.map(col => <td key={col}>{col}</td>)}
                </tr>
            </thead>
            <tbody>
                {bodyArr.map(row =>
                    <tr key={"row".concat(row[0])}>
                        {row.map(el => <td key={"col".concat(el)}>{el}</td>)}
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default OutputTable;