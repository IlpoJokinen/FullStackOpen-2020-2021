import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    console.log(props)
    return (
        <div>
            <h4>{props.course}</h4>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.name}{' ' + props.exercises}</p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part name = {props.parts[0].name} exercises = {props.parts[0].exercises}/>
            <Part name = {props.parts[1].name} exercises = {props.parts[1].exercises}/>
            <Part name = {props.parts[2].name} exercises = {props.parts[2].exercises}/>
        </div>
    )
}

const Total = (props) => {
    let sum = props.total[0].exercises + props.total[1].exercises + props.total[2].exercises
    return (
        <div>
            <p>Total amount of exercises<strong>{" " + sum}</strong></p>
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return (
        <div>
          <Header course = {course.name} />
          <Content parts = {course.parts}/>
          <Total total = {course.parts}/>
        </div>
      )
}



ReactDOM.render(<App />, document.getElementById('root'));

