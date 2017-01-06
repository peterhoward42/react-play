// Illustrates some examples of testing using Jest

import React from 'react';
import ReactDOM from 'react-dom';
import { App, MainPage, WordRow } from './App';

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




/*

.toHaveLength(number) #

Use .toHaveLength to check that an object has a .length property and it is set to a certain numeric value.
This is especially useful for checking arrays or strings size.
expect([1, 2, 3]).toHaveLength(3);
expect('abc').toHaveLength(3);
expect('').not.toHaveLength(5);




.toBeDefined() #

Use .toBeDefined to check that a variable is not undefined. For example, if you just want to check that a function fetchNewFlavorIdea() returns something, you can write:
describe('fetching new flavor ideas', () => {
  it('returns something', () => {
    expect(fetchNewFlavorIdea()).toBeDefined();
  });
});




toBeInstanceOf(Class) #

Use .toBeInstanceOf(Class) to check that an object is an instance of a class. This matcher uses instanceof underneath.
class A {}

expect(new A()).toBeInstanceOf(A);
expect(() => {}).toBeInstanceOf(Function);
expect(new A()).toBeInstanceOf(Function); // throws





.toHaveBeenCalled() #

Use .toHaveBeenCalled to ensure that a mock function got called.
For example, let's say you have a drinkAll(drink, flavor) function that takes a drink function and applies it to all available beverages. You might want to check that drink gets called for 'lemon', but not for 'octopus', because 'octopus' flavor is really weird and why would anything be octopus-flavored? You can do that with this test suite:
describe('drinkAll', () => {
  it('drinks something lemon-flavored', () => {
    let drink = jest.fn();
    drinkAll(drink, 'lemon');
    expect(drink).toHaveBeenCalled();
  });

  it('does not drink something octopus-flavored', () => {
    let drink = jest.fn();
    drinkAll(drink, 'octopus');
    expect(drink).not.toHaveBeenCalled();
  });
});






.toHaveBeenCalledWith(arg1, arg2, ...) #

Use .toHaveBeenCalledWith to ensure that a mock function was called with specific arguments.
For example, let's say that you can register a beverage with a register function, and applyToAll(f) should apply the function f to all registered beverages. To make sure this works, you could write:
describe('beverage registration', () => {
  it('applies correctly to orange La Croix', () => {
    let beverage = new LaCroix('orange');
    register(beverage);
    let f = jest.fn();
    applyToAll(f);
    expect(f).toHaveBeenCalledWith(beverage);
  });
});






import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders welcome message', () => {
  const wrapper = shallow(<App />);
  const welcome = <h2>Welcome to React</h2>;
  // expect(wrapper.contains(welcome)).to.equal(true);
  expect(wrapper.contains(welcome)).toEqual(true);
});




/ Link.react.js
import React from 'react';

const STATUS = {
  NORMAL: 'normal',
  HOVERED: 'hovered',
};

export default class Link extends React.Component {

  constructor(props) {
    super(props);

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      class: STATUS.NORMAL,
    };
  }

  _onMouseEnter() {
    this.setState({class: STATUS.HOVERED});
  }

  _onMouseLeave() {
    this.setState({class: STATUS.NORMAL});
  }

  render() {
    return (
      <a
        className={this.state.class}
        href={this.props.page || '#'}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}>
        {this.props.children}
      </a>
    );
  }

}




Snapshot testing was introduced in Jest 14.0. More information on how it works and why we built it can be found on the release blog post.
Let's build a small intro component with a few views and text components and some styles.
// Intro.js
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class Intro extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          This is a React Native snapshot test.
        </Text>
      </View>
    );
  }
}
Now let's use React's test renderer and Jest's snapshot feature to interact with the component and capture the rendered output and create a snapshot file:
// __tests__/Intro-test.js
import 'react-native';
import React from 'react';
import Intro from '../Intro';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Intro />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});







Now let's use React's test renderer and Jest's snapshot feature to interact with the component and capture the rendered output and create a snapshot file:
// Link.react-test.js
import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});



Let's implement a simple checkbox which swaps between two labels:
// CheckboxWithLabel.js

import React from 'react';

export default class CheckboxWithLabel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isChecked: false};

    // bind manually because React class components don't auto-bind
    // http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({isChecked: !this.state.isChecked});
  }

  render() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
      </label>
    );
  }
}
We use Enzyme's shallow renderer in this example.
// __tests__/CheckboxWithLabel-test.js

import React from 'react';
import {shallow} from 'enzyme';
import CheckboxWithLabel from '../CheckboxWithLabel';

it('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const checkbox = shallow(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />
  );

  expect(checkbox.text()).toEqual('Off');

  checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');
});




Use .toThrow to test that a function throws when it is called. For example, if we want to test that drinkFlavor('octopus') throws, because octopus flavor is too disgusting to drink, we could write:
describe('drinking flavors', () => {
  it('throws on octopus', () => {
    expect(() => {
      drinkFlavor('octopus');
    }).toThrow();
  });
});
If you want to test that a specific error gets thrown, use .toThrowError.
.toThrowError(error) #

Use .toThrowError to test that a function throws a specific error when it is called. The argument can be a string for the error message, a class for the error, or a regex that should match the error. For example, let's say you have a drinkFlavor function that throws whenever the flavor is 'octopus', and is coded like this:
function drinkFlavor(flavor) {
  if (flavor == 'octopus') {
    throw new DisgustingFlavorError('yuck, octopus flavor');
  }
  // Do some other stuff
}
We could test this error gets thrown in several ways:
describe('drinking flavors', () => {
  it('throws on octopus', () => {
    function drinkOctopus() {
      drinkFlavor('octopus');
    }
    // Test the exact error message
    expect(drinkOctopus).toThrowError('yuck, octopus flavor');

    // Test that the error message says "yuck" somewhere
    expect(drinkOctopus).toThrowError(/yuck/);

    // Test that we get a DisgustingFlavorError
    expect(drinkOctopus).toThrowError(DisgustingFlavorError);
  });
});



*/

it('React component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
})

