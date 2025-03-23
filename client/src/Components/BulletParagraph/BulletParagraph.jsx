import React, { useContext } from 'react'
import FormContext from '../../Contexts/FormContext'

function BulletParagraph(props) {

    const { paragraphs, setParagraphs } = useContext(FormContext)

    const currentParagraph = paragraphs.find((para) => para.id === props.id)
    let currentBullets = currentParagraph.content

    const updateTitle = (newTitle) => {
        console.log("Changing title to: ", newTitle)
        const updatedParagraphs = paragraphs.map((para) => {
            return para.id === props.id ? { ...para, title: newTitle } : para
        })

        setParagraphs(updatedParagraphs)
    }

    //creates a new bullet with text and a count
    const addBullet = () => {
        console.log("Adding bullet")
        currentBullets = [...currentBullets, ""]
        const updatedParagraphs = paragraphs.map((para) => {
            return para.id === props.id ? { ...para, content: currentBullets } : para
        })
        setParagraphs(updatedParagraphs)
    }

    //updates the bullet point to the new point based on the index given
    function updateBullet(index, newPoint) {
        console.log("Updating a bullet point: ", newPoint)
        currentBullets[index] = newPoint
        const updatedParagraphs = paragraphs.map((para) => {
            return para.id === props.id ? { ...para, content: currentBullets } : para
        })
        setParagraphs(updatedParagraphs)
    }

    //filters where the index is the deleted index, called by the button next to the form to be deleted 
    const removeBullet = (index) => {
        console.log("Removing bullet")
        currentBullets = currentBullets.filter((point, count) => index !== count)
        const updatedParagraphs = paragraphs.map((para) => {
            return para.id === props.id ? { ...para, content: currentBullets } : para
        })
        setParagraphs(updatedParagraphs)
    }

    return (
        <>
            <hr />
            <input type="text"
                name={props.id + "-title"}
                id={props.id + "-title"}
                className='form-control form-control-lg mb-3'
                placeholder='Enter title'
                value={currentParagraph.title}
                onChange={(e) => updateTitle(e.target.value)} />


            <ul className='list-group'>
                {currentBullets.map((point, index) => (
                    <li key={props.id + "-li-" + index} className='list-group-item'>
                        <div className="input-group">
                            <input type="text"
                                name={props.id + "-" + index}
                                value={currentBullets[index]}
                                placeholder={`Bullet point ${index + 1}`}
                                className="form-control"
                                onChange={(e) => updateBullet(index, e.target.value)} />
                            <div className="input-group-append"><button type="button" className='btn btn-danger' onClick={(e) => {
                                e.preventDefault();
                                removeBullet(index)}}>-</button></div>
                        </div>
                    </li>
                ))}
            </ul>

            <button type="button" className="btn btn-primary mt-3 col-3" onClick={addBullet}>Add bullet point</button>
            <button type='button' className='btn btn-danger mt-3 col-3 offset-6' onClick={props.deleteParagraph}>Delete Paragraph</button>
        </>
    )
}

export default BulletParagraph