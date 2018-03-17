import { combineReducers } from 'redux'
import {LOGIN, LOGIN_RECEIVE, RECEIVE_PERSON_GROUP, REQUEST_PERSON_GROUP, SELECT_PERSON_GROUP} from '../actions';

const initialState={
    personGroupItems: new Array(0),
    // {
    //     id: {
    //         isFetching: false,
    //         didInvalidate: false,
    //         persons: new Array(0),
    //         lastUpdated: 1439478405547,
    //     }
    // }
    selectedPersonGroup: null,
    page: null,
    count: null,
    isFetching: false,
}

function personGroups(state=initialState, action){
    switch(action.type){
        case REQUEST_PERSON_GROUP:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_PERSON_GROUP:
            return {
                ...state,
                page: action.page,
                isFetching: false,
                personGroupItems: action.results.map((pg)=>{
                    return(
                        {
                            ...pg,
                            isSelected: false,
                            receivedAt: action.receivedAt
                        }
                    )
                })
            }
        case SELECT_PERSON_GROUP:
            return {
                ...state,
                selectedPersonGroup: action.persongroup,
                personGroupItems: state.personGroupItems.map((pg, index)=>{
                    return(
                        {
                            ...pg,
                            isSelected: index===action.persongroup
                        }
                    )
                })
            }
        default:
            return state
    }
} 

const loginInitialState = {
    auth_token: null,
    username: null,
    pass: null,
}

function login(state=loginInitialState, action){
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                username: action.username
            }
        case LOGIN_RECEIVE:
            return {
                ...state,
                auth_token: action.auth_token
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    login,
    personGroups
  })

export default rootReducer;