import React, { useState, useEffect } from 'react'
import Paragraphs from '../Paragraphs/Paragraphs'

function BulletParagraph(props) {

    const id = props.id
    const [title, setTitle] = useState("")
    //holds the different bullet points (strings) and the data for them
    const [bullets, setBullets] = useState([""])

    const updateTitle = (e) => { setTitle(e.target.value) }

    //creates a new bullet with text and a count
    const addBullet = () => {
        setBullets(prevState => [...prevState, ""])
    }

    //updates the bullet point to the new point based on the index given
    function updateBullet(index, newPoint) {
        const points = [...bullets]
        points[index] = newPoint
        setBullets(points)
    }

    //filters where the index is the deleted index, called by the button next to the form to be deleted 
    const removeButton = (index) => {
        const deleted = bullets.filter((point, count) => index !== count)
        setBullets(deleted)
    }

    return (
        <>

            <input type="text"
                name={id + "-title"}
                id={id + "-title"}
                className='form-control form-control-lg mb-3'
                placeholder='Enter title'
                value={title}
                onChange={(e) => updateTitle(e)} />


            <ul className='list-group'>
                {bullets.map((point, index) => (
                    <li key={id + "-li-" + index} className='list-group-item'>
                        <div className="input-group">
                            <input type="text"
                                name={id + "-" + index}
                                value={point}
                                placeholder={`Bullet point ${index + 1}`}
                                className="form-control"
                                onChange={(e) => updateBullet(index, e.target.value)} />
                            <div className="input-group-append"><button type="button" className='btn btn-danger' onClick={() => removeButton(index)}>-</button></div>
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