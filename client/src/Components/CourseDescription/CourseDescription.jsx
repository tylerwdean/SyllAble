function CourseDescription({ course_description }) {
  return (
    <>
      <hr />
      <div className="mb-3">
        <h4>
          Course Description
          <small className="text-muted">
            {" "}
            (This is set based on the course code)
          </small>
        </h4>
        <textarea
          className="auto-textarea form-control"
          readOnly
          rows={4} // Minimum row height
          value={course_description}
        />
      </div>
    </>
  );
}

export default CourseDescription;
