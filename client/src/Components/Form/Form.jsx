import React from 'react'
import CourseInformationForm from '../CourseInformationForm/CourseInformationForm.jsx'
import CourseDescription from '../CourseDescription/CourseDescription.jsx'
import BulletParagraph from '../BulletParagraph/BulletParagraph.jsx'
import Paragraph from '../TextParagraph/TextParagraph.jsx'

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
                    <BulletParagraph />
                    <hr />
                    <Paragraph text="This class will start with most of your grades coming from exercises that you and peers solve before a deadline. Later, around halfway through the course we move to less frequent exercise sets (which will become conceptual rather than problems-based) and shift more toward projects." />
                    <hr />
                    <Paragraph text="Occasionally, there will be short assignments or videos for you to watch before class, along with an associated bit of work you need to do. These will help your understanding of what is covered during class..." />

                    <button className="btn btn-primary mt-3 mb-3 col-4" type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}

export default Form