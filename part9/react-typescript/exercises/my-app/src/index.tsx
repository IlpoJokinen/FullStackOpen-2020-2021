import React from "react";
import ReactDOM from "react-dom";
import Header from './Header';
import Content from './Content';
import Total from './Total';
import { CoursePart } from './types';
import { uid } from 'react-uid';

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      id: uid({}),
      name: "Fundamentals",
      exerciseCount: 10,
      description: 'This is awesome course part'
    },
    {
      id: uid({}),
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      id: uid({}),
      name: "Deeper type usage",
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev'
    },
    {
      id: uid({}),
      name: "Penetration testing",
      exerciseCount: 8,
      description: 'Amazing course by Tero Karvinen!',
      namesOfTopStudents: [
        "John Snow",
        "Tyrion Lannister",
        "Robb Stark",
        "Jorah Mormont"
      ],
      totalOfStudents: 1450
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));