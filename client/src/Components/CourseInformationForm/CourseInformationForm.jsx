import style from './CourseInformationForm.module.css'

function CourseInformationForm() {
    return (
        <>
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
        </>
    )
}

export default CourseInformationForm