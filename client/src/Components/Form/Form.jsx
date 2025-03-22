import React, { useState } from 'react'
import axios from 'axios'
import CourseInformationForm from '../CourseInformationForm/CourseInformationForm.jsx'
import CourseDescription from '../CourseDescription/CourseDescription.jsx'
import Paragraphs from '../Paragraphs/Paragraphs.jsx'
import FormContext from '../../Contexts/FormContext.jsx'

const postFormToServer = async (data) => {
    try {
        // Send the data as JSON using Axios
        const response = await axios.post("/submit-form", data, {
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'blob' // Ensure the response is treated as a binary blob
        });

        // Handle the file download
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Syllabus.docx"; // Suggested filename
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        console.log("File downloaded successfully");

    } catch (error) {
        console.error('Error: ', error);
    }
};

function Form() {

    const [courseInformation, setCourseInformation] = useState({
        courseCode: "",
        professorName: "",
        office: "",
        officeHours: "",
        phone: "",
        email: "",
        semester: "",
        classroom: "",
        classDays: "",
        classTimes: "",

    })
    const courseDescription = "Examines the basic concepts of programming languages: programming language processors, elementary and structured data types, subprograms, sequence control, data control, storage management, syntax and translation, and programming environments. The student will also study three different programming languages and write a short project in each."
    const [paragraphs, setParagraphs] = useState([])

    const fillTestData = () => {
        setCourseInformation({
            courseCode: "CSC 310 - Programming Languages",
            professorName: "Dcn. Stephen Frezza",
            office: "CTT G06",
            officeHours: "MF 10-12, R 2-3",
            phone: "740-283-6287",
            email: "tabrown@franciscan.edu",
            semester: "Spring 2025",
            classroom: "CTT G03",
            classDays: "TR",
            classTimes: "12:45-2:00PM"
        })

        setParagraphs(
            [
                {
                    id: 1,
                    style: "bullet",
                    title: "Required Resources",
                    content: [
                        "Laptop that can run Windows (If you don't have one, the school can provide one for you)",
                        "Happy Attitude",
                        "Brain that is willing to learn"
                    ]
                },
                {
                    id: 2,
                    style: "text",
                    title: "Assessment Overview",
                    content: "This class will start with most of your grades coming from exercises that you and peers solve before a deadline.  Later, around halfway through the course we move to less frequent exercise sets (which will become conceptual rather than problems-based) and shift more toward projects."
                },
                {
                    id: 3,
                    style: "text",
                    title: "Pre-Class Preparation",
                    content: "Occasionally, there will be short assignments or videos for you to watch before class, along with an associated bit of work you need to do.  These will help your understanding of what is covered during class.  For those Pre-Class Prep assignments you need to produce something for, please submit your work to the associated assignment on Canvas before the start of class.  While these assignments are not technically graded, they are formative and helpful… and they tend to be pretty quick.\n\nThese are not formally graded because they are irregularly assigned.  I don’t want you to lose points because one “pops up” when you least expect it."
                },
                {
                    id: 4,
                    style: "table",
                    title: "",
                    rows: [
                        [
                            "A",
                            "93+"
                        ],
                        [
                            "A-",
                            "90-93"
                        ],
                        [
                            "B+",
                            "87-90"
                        ],
                        [
                            "B",
                            "83-87"
                        ],
                        [
                            "B-",
                            "80-83"
                        ]
                    ]
                },
                {
                    id: 5,
                    style: "table",
                    title: "",
                    rows: [
                        [
                            "Week 1",
                            "In this course we will just discuss the syllabus and nothing else really until we get to the second week. This is meant to give you time to start living out the college life, learning to make your own food if you live off campus, and just be a chill first week."
                        ],
                        [
                            "Week 2",
                            "Diving into the beginning of the course"
                        ],
                        [
                            "Week 3",
                            "Learning how to be a man"
                        ],
                        [
                            "Week 4",
                            "Do your homework, I'll assign a lot of it this week"
                        ],
                        [
                            "Week 5",
                            "First midterm"
                        ]
                    ]
                }
            ]
        )
    }

    const submit = async (e) => {
        e.preventDefault()

        //gather all the info together into the final json
        const syllabusJson = { ...courseInformation, courseDescription, paragraphs }

        console.log(syllabusJson)
        //POST the json to the server
        await postFormToServer(syllabusJson)
    }

    return (
        <>
            <FormContext.Provider value={{ courseInformation, setCourseInformation, courseDescription, paragraphs, setParagraphs }}>
                <h2 className='text-center my-4'>Syllabus Editor</h2>
                <button className="btn btn-secondary mt-1 mb-1 col-2 offset-5" onClick={fillTestData}>Dev Button</button>
                <form onSubmit={submit}>
                    <div className='container-fluid col-lg-8 col-md-10 col-sm-12'>
                        <CourseInformationForm />
                        <CourseDescription />
                        <Paragraphs />

                        <button className="btn btn-primary mt-3 mb-3 col-4" type="submit" id="submit-btn">Submit</button>
                    </div>
                </form>
            </FormContext.Provider>
        </>
    )
}

export default Form

//JMJ