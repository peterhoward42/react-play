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

// We define some actions; things you can do to the kitchen

const TURN_KETTLE_OFF = 'turn kettle off'
const TURN_KETTLE_ON = 'turn kettle on'
const TURN_ALL_ELECTRICAL_OFF = 'turn all electrical off'
const SOMEONE_LEFT_THE_KITCHEN = 'someone left the kitchen'

const action_kettle_off = { type: TURN_KETTLE_OFF }
const action_turn_all_electrical_off = { type: TURN_ALL_ELECTRICAL_OFF }
const action_someone_left_the_kitchen = { type: SOMEONE_LEFT_THE_KITCHEN, who: 'peter' }

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

function turnKettleOnOrOff(state = false, action) {
    switch (action.type) {
        case TURN_KETTLE_OFF:
            return false
            break
        case TURN_KETTLE_ON:
            return true
            break
        case TURN_ALL_ELECTRICAL_OFF:
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
        kettleOn: turnKettleOnOrOff(state.kettleOn),
        toasterOn: turnToasterOnOrOff(state.toasterOn), 
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

export { kitchen }
