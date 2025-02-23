import React, { useState } from "react";
import BulletParagraph from '../BulletParagraph/BulletParagraph.jsx'
import TextParagraph from '../TextParagraph/TextParagraph.jsx'

const Paragraphs = () => {

    //paragraphs will be identified by their index in this object. They have three types, table, text, and bullet. Table is yet to be implemented
    //paragraphs is an array of objects, each object will be identified by the paragraph style and will contain the relevent information based on that. 
    const [paragraphs, setParagraphs] = useState([{ style: "text", id: 1 }, { style: "bullet", id: 2 }])


    //create a paragraph
    const createParagraph = (style) => {
        let newPara = {}
        if (style == "bullet") {
            newPara = {
                id: Date.now(),
                style
            }
        } else if (style == "text") {
            newPara = {
                id: Date.now(),
                style
            }
        }

        setParagraphs(prevParagraphs => [...prevParagraphs, newPara])
    }

    const deleteParagraph = (id) => {
        setParagraphs(prevParagraphs => prevParagraphs.filter((para) => id != para.id))
    }

    return (
        <>
            {paragraphs.map((para) => {

                if (para.style == 'bullet') {
                    return (
                        <React.Fragment key={para.id}>
                            <BulletParagraph id={para.id} deleteParagraph={() => deleteParagraph(para.id)} />
                            <hr />
                        </React.Fragment>)
                } else {
                    return (
                        <React.Fragment key={para.id}>
                            <TextParagraph id={para.id} deleteParagraph={() => deleteParagraph(para.id)} />
                            <hr />
                        </React.Fragment>
                    )
                }
            })}

            <hr />
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Create Paragraph
                </button>
                <ul className="dropdown-menu">
                    <li><a href="#submit-btn" className="dropdown-item" onClick={(e) => {
                        createParagraph("bullet")
                    }}>Bullet Paragraph</a></li>
                    <li><a href="#submit-btn" className="dropdown-item" onClick={(e) => {
                        createParagraph("text")
                    }}>Text Paragraph</a></li>
                </ul>
            </div>

        </>
    )
}

export default Paragraphs

//JMJ