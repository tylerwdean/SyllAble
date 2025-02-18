import React from 'react'
import style from './Form.module.css'

function Form() {
    return (
        <>
            <h2>Course Information Form</h2>
            <form className={style.form}>
                <label className={style.courseCode}>Course Code: <input type="text" name="courseCode" value="CSC 310 - Programming Languages" /></label>
                <fieldset className={style.headerInfo}>
                    <legend>Course Information</legend>
                    <div className={style.professorInfo}>
                        <label>Professor Name: <input type="text" name="professorName" value="Dcn. Stephen Frezza" /></label>
                        <label>Office: <input type="text" name="office" value="CTT G06" /></label>
                        <label>Office Hours: <input type="text" name="officeHours" value="MF 10-12, R 2-3" /></label>
                        <label>Phone: <input type="text" name="phone" value="740-283-6287" /></label>
                        <label>Email: <input type="email" name="email" value="tabrown@franciscan.edu" /></label>
                    </div>

                    <div className={style.classInfo}>
                        <label>Semester: <input type="text" name="semester" value="Spring 2025" /></label>
                        <label>Classroom: <input type="text" name="classroom" value="CTT G03" /></label>
                        <label>Class Days: <input type="text" name="classDays" value="TR" /></label>
                        <label>Class Times: <input type="text" name="classTimes" value="12:45-2:00PM" /></label>
                    </div>
                </fieldset>
                <fieldset>
                    <label>Course Description:</label>
                    <textarea name="courseDescription" rows="5">Examines the basic concepts of programming languages: programming language processors, elementary and structured data types, subprograms, sequence control, data control, storage management, syntax and translation, and programming environments. The student will also study three different programming languages and write a short project in each.</textarea>
                </fieldset>
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