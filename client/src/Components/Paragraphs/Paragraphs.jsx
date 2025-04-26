import React, { useContext, useEffect } from "react";
import BulletParagraph from '../BulletParagraph/BulletParagraph.jsx'
import TextParagraph from '../TextParagraph/TextParagraph.jsx'
import FormContext from "../../Contexts/FormContext.jsx";
import TableParagraph from "../TableParagraph/TableParagraph.jsx";

const Paragraphs = ({submit}) => {

    //paragraphs will be identified by their index in this object. They have three types, table, text, and bullet. Table is yet to be implemented
    //paragraphs is an array of objects, each object will be identified by the paragraph style and will contain the relevent information based on that. 
    const { setParagraphs, paragraphs } = useContext(FormContext)

    //create a paragraph based on the selected style
    const createParagraph = (style) => {
        let newPara = {}
        if (style == "bullet") {
            newPara = {
                id: Date.now(),
                style,
                title: "",
                content: [""]
            }
        } else if (style == "text") {
            newPara = {
                id: Date.now(),
                style,
                title: "",
                content: ""
            }
        } else if (style == "table") {
            newPara = {
                id: Date.now(),
                style,
                title: "",
                rows: [[""]]
            }
        }

        //update the context with the new paragraphs
        setParagraphs(prevParagraphs => [...prevParagraphs, newPara])
    }

    const deleteParagraph = (id) => {
        setParagraphs(prevParagraphs => prevParagraphs.filter((para) => id != para.id))
    }

    return (
        <>
            {/* For each paragraph, display the right form style*/}
            {paragraphs.map((para) => {

                if (para.style == 'bullet') {
                    return (
                        <BulletParagraph key={para.id} id={para.id} deleteParagraph={() => deleteParagraph(para.id)} />
                    )
                } else if (para.style == 'text') {
                    return (
                        <TextParagraph key={para.id} id={para.id} deleteParagraph={() => deleteParagraph(para.id)} />
                    )
                } else if (para.style == 'table') {
                    return (
                        <TableParagraph key={para.id} id={para.id} deleteParagraph={() => deleteParagraph(para.id)}/>
                    )
                }
            })}

            <hr />
            <div className="row mx-1 mt-5 mb-3">
                
                {/* Designed with bootstrap, creates a dropdown and based on what's selected creates the right paragraph */}
                <div className="dropdown col-md-4 offset-md-4 order-md-2 mb-3 mb-md-0 px-0">
                    <button className="btn btn-warning dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Create Paragraph
                    </button>
                    <ul className="dropdown-menu w-100">
                        <li><a href="#submit-btn" className="dropdown-item" onClick={(e) => {
                            createParagraph("bullet")
                        }}>Bullet Paragraph</a></li>
                        <li><a href="#submit-btn" className="dropdown-item" onClick={(e) => {
                            createParagraph("text")
                        }}>Text Paragraph</a></li>
                        <li><a href="#submit-btn" className="dropdown-item" onClick={(e) => {
                            createParagraph("table")
                        }}>Table Paragraph</a></li>
                    </ul>
                </div>

                <button className="btn btn-success col-md-4 order-md-1 " type="submit" id="submit-btn" onClick={submit}>Submit</button>
            </div>
        </>
    )
}

export default Paragraphs

//JMJ