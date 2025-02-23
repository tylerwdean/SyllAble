import { useState } from "react";
import AutoExpandTextarea from "../AutoExpandTextarea/AutoExpandTextarea";

const TextParagraph = (props) => {

    const id = props.id
    const [title, setTitle] = useState("")

    return (
        <>
            <input type="text" className="form-control form-control-lg mb-3" name={id + "-title"} id={id + '-title'} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
            <AutoExpandTextarea placeholder="Start writing your paragraph..." text={props.text} id={id + '-textarea'} />
            <button className="btn btn-danger col-3 offset-9 mt-3" type="button" onClick={props.deleteParagraph}>Delete Paragraph</button>
        </>
    )
}

export default TextParagraph