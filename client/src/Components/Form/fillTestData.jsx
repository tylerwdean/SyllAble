const fillTestData = (
  courseInformation,
  setCourseInformation,
  setParagraphs
) => {
  setCourseInformation({
    ...courseInformation,
    professor_name: "Dcn. Stephen Frezza",
    office: "CTT G06",
    office_hours: "MF 10-12, R 2-3",
    phone: "740-283-6287",
    email: "tabrown@franciscan.edu",
    semester: "Spring 2025",
    classroom: "CTT G03",
    class_days: "TR",
    class_times: "12:45-2:00PM",
  });

  setParagraphs([
    {
      id: 1,
      style: "bullet",
      title: "Required Resources",
      content: [
        "Laptop that can run Windows (If you don't have one, the school can provide one for you)",
        "Happy Attitude",
        "Brain that is willing to learn",
      ],
    },
    {
      id: 2,
      style: "text",
      title: "Assessment Overview",
      content:
        "This class will start with most of your grades coming from exercises that you and peers solve before a deadline.  Later, around halfway through the course we move to less frequent exercise sets (which will become conceptual rather than problems-based) and shift more toward projects.",
    },
    {
      id: 3,
      style: "text",
      title: "Pre-Class Preparation",
      content:
        "Occasionally, there will be short assignments or videos for you to watch before class, along with an associated bit of work you need to do.  These will help your understanding of what is covered during class.  For those Pre-Class Prep assignments you need to produce something for, please submit your work to the associated assignment on Canvas before the start of class.  While these assignments are not technically graded, they are formative and helpful… and they tend to be pretty quick.\n\nThese are not formally graded because they are irregularly assigned.  I don’t want you to lose points because one “pops up” when you least expect it.",
    },
    {
      id: 4,
      style: "table",
      title: "",
      rows: [
        ["A", "93+"],
        ["A-", "90-93"],
        ["B+", "87-90"],
        ["B", "83-87"],
        ["B-", "80-83"],
      ],
    },
    {
      id: 5,
      style: "table",
      title: "",
      rows: [
        [
          "Week 1",
          "In this course we will just discuss the syllabus and nothing else really until we get to the second week. This is meant to give you time to start living out the college life, learning to make your own food if you live off campus, and just be a chill first week.",
        ],
        ["Week 2", "Diving into the beginning of the course"],
        ["Week 3", "Learning how to be a man"],
        ["Week 4", "Do your homework, I'll assign a lot of it this week"],
        ["Week 5", "First midterm"],
      ],
    },
  ]);
};

export default fillTestData;
