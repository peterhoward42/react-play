// This shows the conceptual underpinnings of redux, using simple, plain javascript
// without actually using redux at all.

// Derived from the docs here: http://redux.js.org/docs/introduction/CoreConcepts.html

// Consider this to be the state of a kitchen

let kitchen = {
    electrical: {
        kettleOn: true,
        toasterOn: false,
    },
    dishes: {
        inSink: false,
        available: true,
    },
    occupiedBy: ['peter', 'ali'],
}

// We define some action verbs; things you can do to the kitchen
// Custom is to describe them in past tense I believe.

const TURNED_KETTLE_OFF = 'turn kettle off'
const TURNED_KETTLE_ON = 'turn kettle on'
const TURNED_ALL_ELECTRICAL_OFF = 'turn all electrical off'
const SOMEONE_LEFT_THE_KITCHEN = 'someone left the kitchen'

// Now we define some formal ACTIONS

// Note the type field is mandatory if you want to use the real Redux.

const action_turned_kettle_off = { type: TURNED_KETTLE_OFF }
const action_turned_all_electrical_off = { type: TURNED_ALL_ELECTRICAL_OFF }
const action_someone_left_the_kitchen = { type: SOMEONE_LEFT_THE_KITCHEN, who: 'peter' } // Carries payload nouns

// And we write reducers - pure functions that interpret actions for a chunk of the state.
// By definition these deal with the value for one of the state's keys.
// They take as their first argument, the current value for that piece of state, with
// a default value provided for when that is undefined.
// They take as their second argument, an action, that may or not be relevant,
// but which when relevant provides (somehow) the wished-for, new state.
// They must not mutate the current state object.
// They are obliged to return the new state object, which can either be
// a reference to the existing, unchanged state, or a completely new state
// object. This one refers to the value for the electrical.kettleOn state.

function turnedKettleOnOrOff(state = false, action) {
    switch (action.type) {
        case TURNED_KETTLE_OFF:
            return false
            break
        case TURNED_KETTLE_ON:
            return true
            break
        case TURNED_ALL_ELECTRICAL_OFF:
            return true
            break
        default:
            return state
    }
}

// We compose reducers for higher levels in the state hierarchy, but aggregating the
// results from reducers for the children. Consider a reducer for the entire electrical object.
// Note this one provides an empty default value, not being a leaf node.
function turnElectricalsOnOrOff(state = {}, action) {
    return {
        kettleOn: turnKettleOnOrOff(state.kettleOn, action),
        toasterOn: turnToasterOnOrOff(state.toasterOn, action),
    }
}

// And we could repeat the process to work our way up to the root of the state object.
function updateKitchen(state = {}, action) {
    return {
        electrical: turnElectricalsOnOrOff(state.electrical, action),
        dishes: updateDishes(state.dishes, action),
        occupiedBy: updateOccupiedBy(state.occupiedBy, action),
    }
}

// Redux has a helper function to do this for you...
// But I think it requires that the reducers for each key have the same name as the key...
// It's wonderfull magic that requires only that you provide  the names of the keys.

const updateKitchen = combineReducers({
    electrical,
    dishes,
    occupiedBy
})

// Consider actions

// Actions are immutable, so we normally use action creator functions to provide parameterisation

function someoneLeavesTheKitchen(whoLeft) {
    // The action we create is an immutable thing, constructed with the parameter.
    return {
        type: SOMEONE_LEFT_THE_KITCHEN,
        who: whoLeft,
    }
}

// Now we start using the real redux.

// Our states (as they move through time) live in the redux store,
// and to stimualte state transitions, we 'dispatch' actions to the
// store using redux global functions.
// We skipped creating the store in this example.

dispatch(someoneLeavesTheKitchen('fred'))

// Or create a 'bound' version - thus. A bound version is a version that does the dispatch for you.
const boundSomeoneLeavesTheKitchen = (whoLeft) => dispatch(someoneLeavesTheKitchen('fred'))

// Ways redux makes things simpler

// First of all, use an immutability helper library such as https://github.com/kolodny/immutability-helper

// Now thinking about the store.

// To recap the store is the single owner of the complete state tree, including
// each new version of it.

// You initialise it with your top level reducer - which is sufficient to initialise the
// data within because the reducers are able to create default values when none is defined.

let store = createStore(topLevelReducer) // the docs name the top level reducer as the theFooApp

// Or you can re-hydrate the initial state from something you serialized
let store = createStore(topLevelReducer, initialState)

// We can now send it update mandates by dispatching actions to it.
// Or ask about the current state using getState()
// Next we'll look at how you can registers observers to state changes using the subscribe call.

// Register a listener to any state changes
let unsubscribeFn = store.subscribe(() => {
    store.getState() // do something with it
})

// then when done with responding to published events...
unscribeFn()

// Now consider connecting this lot to a React app

// We (are encouraged) to split our react components into two buckets - containers vs presenational
// The former are dumb renderers, and are oblivious to React, should have not state, read only from props, write only via injected callbacks.
// The latter are coupled to react. They subscribe to events, dispatch actions to the store and are where calls to rendering methods get done.
// The latter are usuall auto generated by connect(). Which (presumably) is where the re-rendering gets stimulated?

// A container component wraps one presentational component.
// It will need to be able to map changes it observes in state to new values for the props it provides to renderers.
// This is a sufficiently pervasive pattern, that React-Redux does the boiler plate for you and requires you only to/
// provide a function that is willing to map state items to prop items, and one that is willing to generate callbacks to
// inject into the props to wire up the action emitters.

const mapStateToProps = (state) => {
    return {
        aKeyInThePropsObject: myFunctionOf(accessWhateverIsNeededInTheStateHere)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        callbackKey: (callbackArgument) => {
            dispatch(callOneOfYourActionCreators(callbackArgument));
        }
    }
}

// Now with these two functions to hand, we can build the container component automatically
const myContainerComponent = connect(mapStateToProps, mapDispatchToProps)(PresentationObject)

// But how propagate the store to all the container components?
// Use the special <Provider> component at the root of your view hierarcy.

// More advanced topics

// Read about async data fetches. In a nutshell you treat the lifecycle of the request as having <N> states - each modelled in their own right.





export { kitchen }
