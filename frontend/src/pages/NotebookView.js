import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import Notebook from "../components/Notebook";
import { NotebookContext } from "../contexts/notebookContext";
import { v4 as uuidv4 } from "uuid";
import { useMenu, setMenuItems } from "../hooks";
import { MenuContext } from "../contexts/menuContext";

const NotebookView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        notebook,
        setNotebook,
        copyNotebook,
        notebookName,
        setNotebookName,
    } = useContext(NotebookContext);
    const {setMenuItems} = useContext(MenuContext);
    useEffect(()=>{
        setMenuItems([<span key="nb-name">{notebookName}</span>]);
    },[notebookName]);


    useEffect(() => {
        fetch(`http://localhost:8000/nb/${id}`, {

        }).then((data) => {
            // console.log(data.status);
            if (data.status == 404) {
                navigate("");

                return {
                    name:"untitled1",
                    data: [
                        {
                            code: "",
                            output: "",
                            outputStatus: false,
                            id: uuidv4(),
                        },
                    ]
                };
            }
            return data.json();
        }).then((data) => {
            const newNotebook = data.data;
            setNotebookName(data.name);
            console.log(newNotebook);
            setNotebook(newNotebook);
        });
    }, [id]);

    return <div className="main">
        <Notebook editable={false} />
    </div>
}

export default NotebookView;