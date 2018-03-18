import { combineReducers } from 'redux'
import {LOGIN, LOGIN_RECEIVE, RECEIVE_PERSON_GROUP, REQUEST_PERSON_GROUP, SELECT_PERSON_GROUP} from '../actions';
import { SELECT_PERSON, REQUEST_FACE_GROUPS, RECEIVE_FACE_GROUPS, REQUEST_FACES, RECEIVE_FACES, RECEIVE_TOGGLE_FACE_SELECTION, REQUEST_TOGGLE_FACE_SELECTION, REQUEST_MORE_FACES, RECEIVE_MORE_FACES, RECEIVE_MORE_FACES_FAILED } from '../actions';

function facesForPerson(state={}, action){
    switch(action.type){
        case REQUEST_FACES:
            return {
                ...state,
                isFetching: true,
                [action.person]: {
                    facesItems: new Array(0)
                }
            }
        case RECEIVE_FACES:
            return {
                ...state,
                isFetching: false,
                [action.person] : {
                    page: action.page,
                    facesItems: action.results.map((fa)=>{
                        return(
                            {   
                                ...fa,
                                receivedAt: action.receivedAt,
                                isUpdating: false,
                            }
                        )
                    })
                }
            }
        case REQUEST_TOGGLE_FACE_SELECTION:
            return {
                ...state,
                [action.person] : {
                    ...state[action.person],
                    facesItems: state[action.person].facesItems.map((fa)=>{
                        return(
                            {   
                                ...fa,
                                isUpdating: fa.id===action.face,
                            }
                        )
                    })
                }
            }
        case RECEIVE_TOGGLE_FACE_SELECTION:
            return {
                ...state,
                [action.person] : {
                    ...state[action.person],
                    facesItems: state[action.person].facesItems.map((fa)=>{
                        if(fa.id===action.face){
                            return(
                                {   
                                    ...fa,
                                    isUpdating: false,
                                    ...action.results,
                                    receivedAt: action.receivedAt,
                                }
                            )
                        }else{
                            return fa
                        }
                        
                    })
                }
            }
        case REQUEST_MORE_FACES:
            return {
                ...state,
                [action.person] : {
                    ...state[action.person],
                    isFetching: true,
                    page: action.page
                }
            }
        case RECEIVE_MORE_FACES:
            return {
                ...state,
                isFetching: false,
                [action.person] : {
                    page: action.page,
                    facesItems: [
                        ...state[action.person].facesItems,
                        ...action.results.map((fa)=>{
                            return(
                                {   
                                    ...fa,
                                    receivedAt: action.receivedAt,
                                    isUpdating: false,
                                }
                            )
                        })
                    ]
                }
            }
        case RECEIVE_MORE_FACES_FAILED:
            return {
                ...state,
                [action.person] : {
                    ...state[action.person],
                    isFetching: false,
                    page: action.page - 1
                }
            }
        default:
            return state
    }
}

function faceGroupsForPerson(state={}, action){
    switch(action.type){
        case REQUEST_FACE_GROUPS:
            return {
                ...state,
                isFetching: true,
                [action.person]: {
                    faceGroupItems: new Array(0)
                }
            }
        case RECEIVE_FACE_GROUPS:
            return {
                ...state,
                isFetching: false,
                [action.person] : {
                    page: action.page,
                    faceGroupItems: action.results.map((fg)=>{
                        return(
                            {   
                                ...fg,
                                receivedAt: action.receivedAt
                            }
                        )
                    })
                }
            }
        default:
            return state
    }
}

const initialState={
    personGroupItems: new Array(0),
    // {
    //     id: {
    //         isFetching: false,
    //         didInvalidate: false,
    //         persons: new Array(0),
    //         lastUpdated: 1439478405547,
    //         selectedPerson: 0,
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
                personGroupItems: action.results.map((pg, index)=>{
                    return(
                        {
                            ...pg,
                            isSelected: index===0,
                            receivedAt: action.receivedAt,
                            persons: pg.persons.map((pr,index)=>{
                                return {
                                    ...pr,
                                    isSelected: index===0,
                                }
                            }),
                            selectedPerson: pg.persons[0].id,
                        }
                    )
                }),
                selectedPersonGroup: action.results[0].id
            }
        case SELECT_PERSON_GROUP:
            return {
                ...state,
                selectedPersonGroup: action.persongroup,
                personGroupItems: state.personGroupItems.map((pg, index)=>{
                    return(
                        {
                            ...pg,
                            isSelected: pg.id===action.persongroup
                        }
                    )
                })
            }
        case SELECT_PERSON:
            return {
                ...state,
                personGroupItems: state.personGroupItems.map((pg,index)=>{
                    if(pg.isSelected){
                        return {
                            ...pg,
                            selectedPerson: action.person,
                            persons: pg.persons.map((pr,index)=>{
                                return {
                                    ...pr,
                                    isSelected: pr.id===action.person
                                }
                            })
                        }

                    }else{
                        return pg
                    }
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
    personGroups,
    faceGroupsForPerson,
    facesForPerson
  })

export default rootReducer;