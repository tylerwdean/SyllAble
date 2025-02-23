import React from 'react'
import CourseInformationForm from '../CourseInformationForm/CourseInformationForm.jsx'
import CourseDescription from '../CourseDescription/CourseDescription.jsx'
import BulletParagraph from '../BulletParagraph/BulletParagraph.jsx'
import TextParagraph from '../TextParagraph/TextParagraph.jsx'
import Paragraphs from '../Paragraphs/Paragraphs.jsx'

function Form() {
    return (
        <>
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
        </>
    )
}

export default Form