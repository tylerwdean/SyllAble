import React, {useContext, useState} from "react";
import FormContext from "../../Contexts/FormContext";

const TableParagraph = (props) => {
    const [paragraphs, setParagraphs] = useContext(FormContext);

    const currentParagraph = paragraphs.find((para) => para.id === props.id);

    const setTitle = (newTitle) => {
        const updatedParagraph = paragraphs.map((para) => para.id === props.id ? {...para, title: newTitle} : para);
        setParagraphs(updatedParagraph);
    }
    return (
        <>
            <input type="text" 
            className="form-control" 
            placeholder="Title (Optional)" 
            value={currentParagraph?.title || ""} 
            onChange={setTitle(e.target.value)}/> 
        </>
    )
}

export default TableParagraph;