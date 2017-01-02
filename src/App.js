/** A very simple DIY example of REACT usage.
 * 
 */

import React, { Component } from 'react';
import './App.css';

const IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const LIST_OF_WORDS = IPSUM.split(/\s/);

/** An element where you can type in the beginning of a word.
 * Emits the characters you enter one at a time.
 * Holds no state of its own - you must provide the text you want
 * to be displayed for each render.
 */
function WordFragmentInput(props) {
  return (
    <div>
      <label>Filter:</label>
      <input
        type="text"
        value={props.textToDisplay}
        placeholder={props.placeHolderText}
        onChange={props.changeSubscriber} />
    </div>
  );
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

/** An element that shows a toggle-page link and emits it being
 * clicked.
 */
function TogglePageLink(props) {
  return (<a href='#' onClick={props.clickSubscriber}>Toggle Page</a>);
}

/** Renders the main page, and is responsible for the state and interpretation
 * of word filtering.
 */
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterString: ""
    };
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
      <div>
        <WordFragmentInput
          textToDisplay={this.state.filterString}
          changeSubscriber={this.handleFilterTextChanged}
          placeHolderText='Start typing...'
          />
        <WordList listOfWords={this.filteredWords()} />
        <TogglePageLink clickSubscriber={this.props.handleTogglePage} />
      </div>
    );
  }
}

/** A trivial element that can be rendered as a whole page instead of the main one.
 * Exists only to exercise conditional rendering of alternative views.
 * Shows only the link to toggle the view back to the main page.
 */
function AlternativePage(props) {
  return (<a href='#' onClick={props.handleTogglePage}>Toggle Page</a>);
}

/** The top level element that aggregates the choice of two pages and owns
 * the state for which page is selected.
  */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onMainPage: true
    };
    this.handleTogglePage = this.handleTogglePage.bind(this);
  }

  handleTogglePage(evt) {
    const toggle = !this.state.onMainPage;
    this.setState({ onMainPage: toggle });
  }

  /** The entry point render method. */
  render() {
    if (this.state.onMainPage) {
      return (
        <MainPage handleTogglePage={this.handleTogglePage} />
      );
    }
    else {
      return (<AlternativePage handleTogglePage={this.handleTogglePage} />);
    }
  }
}

export default App;
