import { useState } from "react";
import AutoExpandTextarea from "../AutoExpandTextarea/AutoExpandTextarea";

const Paragraph = () => {

    const [title, setTitle] = useState("")

    return (
        <>
            <input type="text" className="form-control form-control-lg mb-3" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
            <AutoExpandTextarea placeholder="Start writing your paragraph..." />
        </>
    )
}

export default Paragraph