import { useContext } from "react";
import FormContext from "../../Contexts/FormContext";

function CourseInformationForm() {
  const { courseInformation, setCourseInformation } = useContext(FormContext);

  const updateCourseInformation = (fieldName, newValue) => {
    setCourseInformation((prev) => ({ ...prev, [fieldName]: newValue }));
  };

  return (
    <>
      <div className="form-group">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 text-center mb-1">
            <label htmlFor="course_code">Course Code and Title: </label>
            <input
              className="form-control"
              type="text"
              id="course_code"
              name="course_code"
              placeholder="Course code and title"
              value={
                courseInformation.course_code +
                " - " +
                courseInformation.course_title
              }
              readOnly
            />
          </div>
          <div className="col-3"></div>
        </div>
        <h4 className="mb-3">Course Information</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="professor_name">Professor Name: </label>
            <input
              type="text"
              className="form-control"
              name="professor_name"
              id="professor_name"
              placeholder="Enter your name"
              value={courseInformation.professor_name}
              onChange={(e) => {
                updateCourseInformation("professor_name", e.target.value);
              }}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="semester">Semester: </label>
            <input
              type="text"
              className="form-control"
              name="semester"
              id="semester"
              placeholder="Enter the current semester"
              value={courseInformation.semester}
              onChange={(e) => {
                updateCourseInformation("semester", e.target.value);
              }}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="office">Office: </label>
            <input
              className="form-control"
              type="text"
              name="office"
              id="office"
              placeholder="Enter your office"
              value={courseInformation.office}
              onChange={(e) => {
                updateCourseInformation("office", e.target.value);
              }}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="classroom">Classroom: </label>
            <input
              className="form-control"
              type="text"
              id="classroom"
              name="classroom"
              placeholder="Enter the classroom"
              value={courseInformation.classroom}
              onChange={(e) => {
                updateCourseInformation("classroom", e.target.value);
              }}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="office_hours">Office Hours: </label>
            <input
              className="form-control"
              type="text"
              name="office_hours"
              id="office_hours"
              placeholder="Enter your office hours"
              value={courseInformation.office_hours}
              onChange={(e) => {
                updateCourseInformation("office_hours", e.target.value);
              }}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="class_days">Class Day(s): </label>
            <input
              className="form-control"
              type="text"
              id="class_days"
              name="class_days"
              placeholder="Enter the class day(s)"
              value={courseInformation.class_days}
              onChange={(e) => {
                updateCourseInformation("class_days", e.target.value);
              }}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="phone">Phone: </label>
            <input
              className="form-control"
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={courseInformation.phone}
              onChange={(e) => {
                updateCourseInformation("phone", e.target.value);
              }}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="class_times">Class Time: </label>
            <input
              className="form-control"
              type="text"
              id="class_times"
              name="class_times"
              placeholder="Enter the class time"
              value={courseInformation.class_times}
              onChange={(e) => {
                updateCourseInformation("class_times", e.target.value);
              }}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="email">Email: </label>
            <input
              className="form-control"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={courseInformation.email}
              onChange={(e) => {
                updateCourseInformation("email", e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseInformationForm;
