import { useContext, useEffect, useState } from "react";
import FormContext from "../../Contexts/FormContext";

const TextParagraph = (props) => {

    //grabs the paragraphs object and the function to update it
    const { paragraphs, setParagraphs } = useContext(FormContext)
    const { currentParagraph, setCurrentParagraph } = useState(paragraphs.filter((para) => para.id === props.id)[0])

    const setTitle = (newTitle) => {

        //iterates through the paragraphs, updates the paragraph with the right id to have new title value
        let updatedParagraph = paragraphs.map((para) => {
            para.id === props.id ? { ...para, title: newTitle } : para
        })

        setParagraphs(updatedParagraph)
    }

    useEffect(() => {
        setCurrentParagraph(paragraphs.filter((para) => para.id === props.id)[0])
    }, [paragraphs])



    return (
        <>
            <input type="text" className="form-control form-control-lg mb-3" name={props.id + "-title"} id={props.id + '-title'} value={currentParagraph.title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
            <textarea placeholder="Start writing your paragraph..." value={props.text} id={props.id + '-textarea'} />
            <button className="btn btn-danger col-3 offset-9 mt-3" type="button" onClick={props.deleteParagraph}>Delete Paragraph</button>
        </>
    )
}

export default TextParagraph

//JMJ