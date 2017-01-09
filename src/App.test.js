// Illustrates some examples of testing using Jest

// See also v good tutorial on TDD for react using enzyme here:
// http://thereignn.ghost.io/a-step-by-step-tdd-approach-on-testing-react-components-using-enzyme/

import React from 'react';
import ReactDOM from 'react-dom';
import { App, MainPage, AlternativePage, WordRow } from './App';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';


// Start with plan js testing, i.e. not react specific

describe('Testing plain js', () => {
  it('can divide', function () {
    expect(12 / 4).toEqual(3)
  })
  it('can square', function () {
    expect(8 * 8).toEqual(64)
  })
})


describe('Exercise a class method', () => {
  it('filters the words correctly', function () {
    let mainPage = new MainPage()
    mainPage.state = {
      filterString: "s"
    };
    const words = mainPage.filteredWords()
    const sampledWord = words[3];
    expect(sampledWord).toEqual('sunt')
  })
})

// Play around with expect (jest provides its own expect function)

it('The expectation object provides a mirror set of inverted tests', () => {
  expect(42).toBe(42)
  expect(99).not.toBe(42)
})

it('Tries out the toHaveLength test', () => {
  expect('012345789').toHaveLength(9)
})

it('Tries out toBeInstanceOf', function () {
  let mainPage = new MainPage()
  expect(mainPage).toBeInstanceOf(MainPage)
})

it('Tries out (mock function) toHaveBeenCalled', function () {
  // Meaningless with explicit call like this, but used when the
  // a function is passed into something as a callback.
  let mockFn = jest.fn() // A mock function
  mockFn()
  expect(mockFn).toHaveBeenCalled()
})

it('Tries out (mock function) toHaveBeenCalledWith', function () {
  // Similar to toHaveBeenCalled, but checks a call happened with arguments>
  // equal to those given (=== equality).
  let mockFn = jest.fn()
  const objectA = { count: 3 }
  const sameAsObjectA = { count: 3 }
  mockFn(objectA)
  expect(mockFn).toHaveBeenCalledWith(sameAsObjectA)
})

// These full rendering tests I think are let you inspect the DOM created in
// depth and detail.
it('Exercises ReactDOM.render() to show a standard HTML element can be rendered without crashing', () => {
  const wrapper = document.createElement('div');
  const element = <p>foo</p>
  ReactDOM.render(element, wrapper);
})

// These shallow rendering tests I think are let you inspect the DOM created in
// depth and detail.
it('Exercises ReactDOM.render() to show a standard HTML element can be rendered without crashing', () => {
  const wrapper = document.createElement('div');
  const element = <p>foo</p>
  ReactDOM.render(element, wrapper);
})

it('Exercises shallow.render() to render a component without needing a context, to show that it is not dependent on its children', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find(MainPage)).toHaveLength(1)
})

// Basic snapshot test demo

it('Shows a very simple example of snapshot', () => {
  const tree = renderer.create(
    <App/>
  ).toJSON() // seems this version of toJSON() gives the tree some functions too?
  expect(tree).toMatchSnapshot()
  // stimulate change in state - tutorial says to do this by calling tree.props but cannot see how tree which is json can have a method, surely they maean component not tree?
  expect(tree).toMatchSnapshot()
})





