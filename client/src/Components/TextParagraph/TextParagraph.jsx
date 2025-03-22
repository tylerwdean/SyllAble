import { useContext } from "react";
import FormContext from "../../Contexts/FormContext";

const TextParagraph = (props) => {

    //grabs the paragraphs object and the function to update it
    const { paragraphs, setParagraphs } = useContext(FormContext)

    const currentParagraph = paragraphs.find((para) => para.id === props.id)

    const setTitle = (newTitle) => {

        //iterates through the paragraphs, updates the paragraph with the right id to have new title value
        const updatedParagraph = paragraphs.map((para) => {
            return para.id === props.id ? { ...para, title: newTitle } : para
        })

        setParagraphs(updatedParagraph)
    }

    const setContent = (newContent) => {
        const updatedParagraphs = paragraphs.map((para) => {
            return para.id === props.id ? { ...para, content: newContent } : para
        })

        setParagraphs(updatedParagraphs)
    }

    return (
        <>
            <hr />
            <input type="text"
                className="form-control form-control-lg mb-3"
                name={props.id + "-title"}
                id={props.id + '-title'}
                value={currentParagraph?.title || ""}  //filters for the right paragraph and gets the title element
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title" />
            <textarea className="form-control auto-textarea"
                placeholder="Start writing your paragraph..."
                value={currentParagraph?.content || ""}
                onChange={(e) => setContent(e.target.value)}
                rows={4} // Minimum row height
                id={props.id + '-textarea'} />
            <button className="btn btn-danger col-3 offset-9 mt-3" type="button" onClick={props.deleteParagraph}>Delete Paragraph</button>
        </>
    )
}

export default TextParagraph

//JMJ