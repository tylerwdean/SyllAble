import { useContext } from "react"
import FormContext from "../../Contexts/FormContext"

function CourseInformationForm() {

    const { courseInformation, setCourseInformation } = useContext(FormContext)

    const updateCourseInformation = (fieldName, newValue) => {
        setCourseInformation((prev) => ({ ...prev, [fieldName]: newValue }))
    }

    return (
        <>
            <div className="form-group">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6 text-center mb-1">
                        <label htmlFor="courseCode">Course Code and Title: </label>
                        <input className="form-control"
                            type="text"
                            id="courseCode"
                            name="courseCode"
                            placeholder="Enter course code and title"
                            value={courseInformation.courseCode}
                            onChange={(e) => {
                                updateCourseInformation("courseCode", e.target.value)
                            }} />
                    </div>
                    <div className="col-3"></div>
                </div>
                <h4 className="mb-3">Course Information</h4>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="professorName">Professor Name: </label>
                        <input type="text"
                            className="form-control"
                            name="professorName"
                            id="professorName"
                            placeholder="Enter your name"
                            value={courseInformation.professorName}
                            onChange={(e) => {
                                updateCourseInformation("professorName", e.target.value)
                            }} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="semester">Semester: </label>
                        <input type="text"
                            className="form-control"
                            name="semester"
                            id="semester"
                            placeholder="Enter the current semester"
                            value={courseInformation.semester}
                            onChange={(e) => {
                                updateCourseInformation("semester", e.target.value)
                            }} />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="office">Office: </label>
                        <input className="form-control"
                            type="text" name="office"
                            id="office"
                            placeholder="Enter your office"
                            value={courseInformation.office}
                            onChange={(e) => {
                                updateCourseInformation("office", e.target.value)
                            }} />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="classroom">Classroom: </label>
                        <input className="form-control"
                            type="text"
                            id="classroom"
                            name="classroom"
                            placeholder="Enter the classroom"
                            value={courseInformation.classroom}
                            onChange={(e) => {
                                updateCourseInformation("classroom", e.target.value)
                            }} />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="officeHours">Office Hours: </label>
                        <input className="form-control"
                            type="text"
                            name="officeHours"
                            id="officeHours"
                            placeholder="Enter your office hours"
                            value={courseInformation.officeHours}
                            onChange={(e) => {
                                updateCourseInformation("officeHours", e.target.value)
                            }} />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="classDays">Class Day(s): </label>
                        <input className="form-control"
                            type="text"
                            id="classDays"
                            name="classDays"
                            placeholder="Enter the class day(s)"
                            value={courseInformation.classDays}
                            onChange={(e) => {
                                updateCourseInformation("classDays", e.target.value)
                            }} />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="phone">Phone: </label>
                        <input className="form-control"
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={courseInformation.phone}
                            onChange={(e) => {
                                updateCourseInformation("phone", e.target.value)
                            }} />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="classTimes">Class Time: </label>
                        <input className="form-control"
                            type="text"
                            id="classTimes"
                            name="classTimes"
                            placeholder="Enter the class time"
                            value={courseInformation.classTimes}
                            onChange={(e) => {
                                updateCourseInformation("classTimes", e.target.value)
                            }} />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="email">Email: </label>
                        <input className="form-control"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={courseInformation.email}
                            onChange={(e) => {
                                updateCourseInformation("email", e.target.value)
                            }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseInformationForm