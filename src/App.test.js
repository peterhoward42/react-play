import React from 'react';
import ReactDOM from 'react-dom';
import { App, MainPage } from './App';


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
    const mainPage = new MainPage()
    const words = mainPage.filteredWords()
    const nWords = words.length
  })
})

describe('Exercising the rendering of a React element', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  })
})

