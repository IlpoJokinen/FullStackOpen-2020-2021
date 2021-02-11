import React from 'react';
import { CoursePart } from './types';
import { assertNever } from './utils';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
        case "Fundamentals":
            return (
                <div>
                    <p>
                        <strong>{part.name}</strong>
                    </p>
                    {part.description && (
                        <p>
                            <em>{part.description}</em>
                        </p>
                    )}
                    <p>
                        Exercises: <strong>{part.exerciseCount}</strong>
                    </p>
                    <hr />
                </div>
            );
        case "Using props to pass data":
            return (
                <div>
                    <p>
                        <strong>{part.name}</strong>
                    </p>
                    <p>
                        Exercises: <strong>{part.exerciseCount}</strong>
                    </p>
                    <p>
                        Group Projects: <strong>{part.groupProjectCount}</strong>
                    </p>
                    <hr />
                </div>
            );
        case "Deeper type usage":
            return (
                <div>
                    <p>
                        <strong>{part.name}</strong>
                    </p>
                    {part.description && (
                        <p>
                            <em>{part.description}</em>
                        </p>
                    )}
                    <p>
                        Exercises: <strong>{part.exerciseCount}</strong>
                    </p>
                    <p>
                        Submission Link:{" "}
                        <a href={part.exerciseSubmissionLink}>
                            {part.exerciseSubmissionLink}
                        </a>
                    </p>
                    <hr />
                </div>
            );
        case "Penetration testing":
            return (
                <div>
                    <p>
                        <strong>{part.name}</strong>
                    </p>
                    {part.description && (
                        <p>
                            <em>{part.description}</em>
                        </p>
                    )}
                    <p>
                        Exercises: <strong>{part.exerciseCount}</strong>
                    </p>
                    <p>
                        Total of students participated: <strong>{part.totalOfStudents}</strong>
                    </p>
                    <p>
                        Top students: <ul>
                            {part.namesOfTopStudents.map((name, i) => (
                                <li key={i}>{name}</li>
                            ))}
                        </ul>
                    </p>
                </div>
            )
        default:
            return assertNever(part);
    }
};

export default Part;