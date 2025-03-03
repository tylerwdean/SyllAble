import '../AutoExpandTextarea/AutoExpandTextarea.jsx'
import AutoExpandTextarea from '../AutoExpandTextarea/AutoExpandTextarea.jsx'

function CourseDescription() {
    return (
        <>
            <hr />
            <div className="mb-3">
                <h4>
                    Course Description
                    <small className='text-muted'> (This is set based on the course code)</small>
                </h4>
                <textarea className="auto-textarea form-control"
                    readOnly
                    rows={4} // Minimum row height
                    value="Examines the basic concepts of programming languages: programming language processors, elementary and structured data types, subprograms, sequence control, data control, storage management, syntax and translation, and programming environments. The student will also study three different programming languages and write a short project in each." />
            </div>
        </>
    )
}

export default CourseDescription