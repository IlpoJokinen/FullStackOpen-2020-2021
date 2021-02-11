import React from 'react';

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
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

const Content = ({parts}) => {
  console.log(parts)
    let rows = () => parts.map((part, i) =>
      <Part key = {i} name = {part.name} exercises = {part.exercises}/>
    )
    return (
        <div>
            {rows()}
        </div>
    )
}

const Total = ({total}) => {
    console.log('total: ', total)
    
    const getSum = total.reduce((sum, part) => {
      return part.exercises + sum
    }, 0)
    return (
        <div>
            <b>total of {getSum} exercises</b>
        </div>
    )
}

const Course = ({course}) => {
      console.log(course)
      return (
          <div>
              <Header course = {course.name} />
              <Content parts = {course.parts} />
              <Total total = {course.parts} />
          </div>
      )
}

export default Course