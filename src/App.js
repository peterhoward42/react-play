import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class WordFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <label>Filter:</label>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }
}


function WordRow(props) {
  return (<div>{props.word}</div>);
}

function WordList(props) {
  const listElements = props.listOfWords.map((word) =>
    <WordRow word={word} />
  );
  return <div>{listElements}</div>
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <WordFilter />
        <WordList listOfWords={LIST_OF_WORDS} />
      </div>
    );
  }
}

const IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const LIST_OF_WORDS = IPSUM.split(/\s/);

export default App;
