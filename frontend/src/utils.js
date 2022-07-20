export function sqlizeData(data) {
    let columns = [];
    for (let column in data[0]) columns.push(column);
    let matrix = [[...columns]];
    data.shift();
    for (let r of data) {
        let row = [];
        for (let col_name of columns) row.push(r[col_name]);
        matrix.push(row);
    }
    return matrix;
}

export function unescapeHTML(escapedHTML) {
    return escapedHTML
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
}

export async function executeQuery(code) {
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
