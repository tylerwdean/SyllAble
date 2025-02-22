function CourseInformationForm() {
    return (
        <>
            <div className="container mb-3">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6 text-center mb-1">
                        <label className="form-label">Course Code: </label>
                        <input className="form-control" type="text" name="courseCode" value="CSC 310 - Programming Languages" />
                    </div>
                    <div className="col-3"></div>
                </div>
                <h2 className="display-6 mb-3">Course Information</h2>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label" for="professorName">Professor Name: </label>
                        <input type="text" className="form-control" name="professorName" value="Dcn. Stephen Frezza" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label class="form-label">Semester: </label>
                        <input className="form-control" type="text" name="semester" value="Spring 2025" />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label class="form-label">Office: </label>
                        <input className="form-control" type="text" name="office" value="CTT G06" />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label class="form-label">Classroom: </label>
                        <input className="form-control" type="text" name="classroom" value="CTT G03" />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label class="form-label">Office Hours: </label>
                        <input className="form-control" type="text" name="officeHours" value="MF 10-12, R 2-3" />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label class="form-label">Class Day(s): </label>
                        <input className="form-control" type="text" name="classDays" value="TR" />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label class="form-label">Phone: </label>
                        <input className="form-control" type="text" name="phone" value="740-283-6287" />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label class="form-label">Class Time: </label>
                        <input className="form-control" type="text" name="classTimes" value="12:45-2" />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label class="form-label">Email: </label>
                        <input className="form-control" type="email" name="email" value="tabrown@franciscan.edu" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseInformationForm