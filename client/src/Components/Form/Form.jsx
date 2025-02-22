import React from 'react'
import CourseInformationForm from '../CourseInformationForm/CourseInformationForm.jsx'
import CourseDescription from '../CourseDescription/CourseDescription.jsx'

function Form() {
    return (
        <>
            <h2 className='display-4 text-center my-4'>Syllabus Editor</h2>
            <form className="needs-validaton container" >
                <CourseInformationForm />
                <CourseDescription />
                <fieldset>
                    <input type="text" name="bullet1Title" value="Required Resources" />
                    <ul>
                        <li><input type="text" name="requiredResources[]" value="Laptop that can run Windows" /></li>
                        <li><input type="text" name="requiredResources[]" value="Happy Attitude" /></li>
                        <li><input type="text" name="requiredResources[]" value="Brain that is willing to learn" /></li>
                    </ul>
                </fieldset>

                <fieldset>
                    <input type="text" name="para1Title" value="Assessment Overview" />
                    <textarea name="paragraph[0][content]" rows="4">This class will start with most of your grades coming from exercises that you and peers solve before a deadline. Later, around halfway through the course we move to less frequent exercise sets (which will become conceptual rather than problems-based) and shift more toward projects.</textarea>
                </fieldset>
                <fieldset>
                    <input type="text" name="para2Title" value="Pre-Class Preparation" />
                    <textarea name="paragraph[1][content]" rows="6">Occasionally, there will be short assignments or videos for you to watch before class, along with an associated bit of work you need to do. These will help your understanding of what is covered during class...</textarea>
                </fieldset>

                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Form