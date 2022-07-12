function CodeLine({codeLines, idx}){
    function handleChange(){
        console.log("here lol");
    }
    return <mark>{codeLines[idx]}</mark>
}

export default CodeLine;