import React, { useState } from 'react'
import CourseInformationForm from '../CourseInformationForm/CourseInformationForm.jsx'
import CourseDescription from '../CourseDescription/CourseDescription.jsx'
import Paragraphs from '../Paragraphs/Paragraphs.jsx'
import FormContext from '../../Contexts/FormContext.jsx'

function Form() {

    const [courseInformation, setCourseInformation] = useState({})
    const courseDescription = "Examines the basic concepts of programming languages: programming language processors, elementary and structured data types, subprograms, sequence control, data control, storage management, syntax and translation, and programming environments. The student will also study three different programming languages and write a short project in each."
    const [paragraphs, setParagraphs] = useState([])


    return (
        <>
            <FormContext.Provider value={{ courseInformation, setCourseInformation, courseDescription, paragraphs, setParagraphs }}>
                <h2 className='text-center my-4'>Syllabus Editor</h2>
                <hr className='col-10 offset-1' />
                <form>
                    <div className='container-fluid col-lg-8 col-md-10 col-sm-12'>
                        <CourseInformationForm />
                        <hr />
                        <CourseDescription />
                        <hr />
                        <Paragraphs />

                        <button className="btn btn-primary mt-3 mb-3 col-4" type="submit" id="submit-btn">Submit</button>
                    </div>
                </form>
            </FormContext.Provider>
        </>
    )
}

export default Form

//JMJ