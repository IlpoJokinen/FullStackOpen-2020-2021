import React from 'react';
import ReactDOM from 'react-dom';

interface WelcomeProps {
  name: string;
}

// THIS
const Welcome: React.FC<WelcomeProps> = props => {
  return <h1>Hello, {props.name}</h1>;
};

// OR  THIS
/*  
  const Welcome: React.FC<{ name: string }> = ({ name }) => (
    <h1>Hello, {name}</h1>
  );
*/

const element = <Welcome name="Sara" />;

ReactDOM.render(element,
  document.getElementById('root')
);
