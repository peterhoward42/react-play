import React, { Component } from 'react';
import './App.css';

const IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const LIST_OF_WORDS = IPSUM.split(/\s/);

/** An element where you can input the beginning of a word.
 * Emits the characters you enter one at a time.
 * Holds no state of its own - you must provide the text you want
 * to be displayed for each render.
 */
class WordFragmentInput extends React.Component {
  constructor(props) {
    super(props);
    this.changeSubscriber = props.changeSubscriber;
    this.placeHolderText = props.placeHolderText;
  }

  render() {
    let textToDisplay = this.props.textToDisplay;
    return (
      <div>
        <label>Filter:</label>
        <input type="text" value={textToDisplay} placeholder={this.placeHolderText} onChange={this.changeSubscriber} />
      </div>
    );
  }
}

/** An element that displays one line of text. */
function WordRow(props) {
  return (<div>{props.word}</div>);
}

/** An element that displays a sequence of lines of text. */
function WordList(props) {
  let counter = 0;
  const listElements = props.listOfWords.map((word) =>
    <WordRow word={word} key={counter++} />
  );
  return <div>{listElements}</div>
}

/** The top level element that aggregates the main blocks of the UI.
 * Also owns the active filter string state, and its interpretation.
  */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { filterString: "" }
    this.handleFilterTextChanged = this.handleFilterTextChanged.bind(this);
  }

  /** A method that interprets the current state of the word filter, to provide
   * a list of filtered words.
   */
  filteredWords() {
    const filterString = this.state.filterString;
    if (filterString === "") {
      return LIST_OF_WORDS;
    }
    return LIST_OF_WORDS.filter((word) => { return word.startsWith(filterString) });
  }

  /** A handler that subscribes to changes to the filter text from a lower level UI
   * component, and actions them.
   */
  handleFilterTextChanged(evt) {
    this.setState({ filterString: evt.target.value });
  }

  render() {
    return (
      <div className="App">
        <WordFragmentInput
          textToDisplay={this.state.filterString}
          changeSubscriber={this.handleFilterTextChanged}
          placeHolderText='Start typing...'
          />
        <WordList listOfWords={this.filteredWords()} />
      </div>
    );
  }


}



export default App;
