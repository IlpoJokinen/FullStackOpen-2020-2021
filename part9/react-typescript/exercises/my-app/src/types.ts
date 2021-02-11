export interface CoursePartBase {
    id: string;
    name: string;
    exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
    description: string;
}

interface CoursePartOne extends CoursePartBaseWithDescription {
    name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
    name: 'Using props to pass data';
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseWithDescription {
    name: 'Penetration testing';
    totalOfStudents: number;
    namesOfTopStudents: string[];
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;