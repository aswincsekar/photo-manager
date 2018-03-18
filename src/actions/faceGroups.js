import 'whatwg-fetch';
import $ from 'jquery';
export const REQUEST_FACE_GROUPS = "REQUEST_FACE_GROUPS";
export function requestFaceGroups(persongroup, person){
    return {
        type: REQUEST_FACE_GROUPS,
        person
    }
}

export const RECEIVE_FACE_GROUPS = "RECEIVE_FACE_GROUPS";
export function receiveFaceGroups(page, results, person){
    return {
        type: RECEIVE_FACE_GROUPS,
        page,
        results,
        person,
        receivedAt: Date.now()
    }
}

export function fetchFaceGroups(page, person, auth_token){
    return dispatch => {
        dispatch(requestFaceGroups(page, person))
        let url = "https://www.backend.trigger.tessact.com/api/v1/facegroups/?" + $.param({page: page, person: person})
        return fetch(url, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token "+auth_token
            },
        }).then(response => response.json())
          .then(json => dispatch(receiveFaceGroups(page, json.results, person)))
      }
}

export function shouldFetchFaceGroups(state, person){
    const faceGroups = state.faceGroupsForPerson;
    if (Object.keys(faceGroups).length === 0 && faceGroups.constructor === Object){
        console.log("1")
        return true
    }else if (!faceGroups) {
        console.log("2")
        return true
    } else if (faceGroups.isFetching) {
        console.log("3")
        return false
    }else if (person in faceGroups){
        console.log("5")
        return false
    }else {
        console.log("4")
        return true
    }
}

export function fetchFaceGroupsIfNeeded(person){
    return (dispatch, getState) => {
        if (shouldFetchFaceGroups(getState(), person)) {
          // Dispatch a thunk from thunk!
          return dispatch(fetchFaceGroups(1, person, getState().login.auth_token))
        } else {
          // Let the calling code know there's nothing to wait for.
          console.log("No Face group request");
          return Promise.resolve()
        }
      }
    
}

export const REQUEST_FACES = "REQUEST_FACES";
export function requestFaces(page, person){
    return {
        type: REQUEST_FACES,
        page, 
        person
    }
}

export const RECEIVE_FACES = "RECEIVE_FACES";
export function receiveFaces(page, person, results){
    return {
        type: RECEIVE_FACES,
        page, 
        person,
        results,
        receivedAt: Date.now()
    }
}

export function fetchFaces(page, person, auth_token){
    return dispatch => {
        dispatch(requestFaces(page, person))
        let url = "https://www.backend.trigger.tessact.com/api/v1/faces/?" + $.param({page: page, face_group__person: person})
        return fetch(url, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token "+auth_token
            },
        }).then(response => response.json())
          .then(json => dispatch(receiveFaces(page, person, json.results)))
      }
}


export function shouldFetchFaces(state, person){
    const faces = state.facesForPerson;
    console.log(faces);
    console.log(person);
    if (Object.keys(faces).length === 0 && faces.constructor === Object){
        console.log("1")
        return true
    }else if (!faces) {
        console.log("2")
        return true
    } else if (faces.isFetching) {
        console.log("3")
        return false
    }else if (person in faces){
        console.log("5")
        return false
    }else {
        console.log("4")
        return true
    }
}

export function fetchFacesIfNeeded(person){
    return (dispatch, getState) => {
        if (shouldFetchFaces(getState(), person)) {
          // Dispatch a thunk from thunk!
          return dispatch(fetchFaces(1, person, getState().login.auth_token))
        } else {
          // Let the calling code know there's nothing to wait for.
          console.log("No Face request");
          return Promise.resolve()
        }
      }
    
}

export const REQUEST_TOGGLE_FACE_SELECTION = "REQUEST_TOGGLE_FACE_SELECTION";
export function requestToggleFaceSelection(person, face){
    return {
        type: REQUEST_TOGGLE_FACE_SELECTION,
        person,
        face
    }
}

export const RECEIVE_TOGGLE_FACE_SELECTION = "RECEIVE_TOGGLE_FACE_SELECTION";
export function receiveToggleFaceSelection(person, face, results){
    console.log(results);
    return {
        type: RECEIVE_TOGGLE_FACE_SELECTION,
        person,
        face,
        results,
        receivedAt: Date.now()
    }
}

export function toggleFaceSelection(face, person, state){
    const auth_token = state.login.auth_token;
    const faceObj = state.facesForPerson[person].facesItems.find((fc)=>{return fc.id===face})
    return dispatch => {
        dispatch(requestToggleFaceSelection(person, face))
        let url = "https://www.backend.trigger.tessact.com/api/v1/faces/"+face+"/"
        return fetch(url, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token "+auth_token
            },
            body: JSON.stringify(
                {
                    ...faceObj,
                    selected: !faceObj.selected
                }
            )
        }).then(response => {
            return response.json()
        })
          .then(json => dispatch(receiveToggleFaceSelection(person, face, json)))
      }
}

export function shouldToggleFaceSelection(state, person, face){
    const faces = state.facesForPerson[person].facesItems;
    const faceObj = faces.find((fc)=>{return fc.id===face})
    if(faceObj.isUpdating){
        return false;
    }else{
        return true
    }
}

export function toggleFaceSelectionIfNeeded(person, face){
    return (dispatch, getState) => {
        if (shouldToggleFaceSelection(getState(), person, face)) {
          // Dispatch a thunk from thunk!
        //   console.log("toggle face selection");
          return dispatch(toggleFaceSelection(face, person, getState()))
            // return Promise.resolve()
        } else {
          // Let the calling code know there's nothing to wait for.
          console.log("No Face update");
          return Promise.resolve()
        }
      }
}

export const REQUEST_MORE_FACES = "REQUEST_MORE_FACES";
export function requestMoreFaces(page, person){
    return {
        type: REQUEST_MORE_FACES,
        page, 
        person
    }
}

export const RECEIVE_MORE_FACES = "RECEIVE_MORE_FACES";
export function receiveMoreFaces(page, person, results){
    return {
        type: RECEIVE_MORE_FACES,
        page, 
        person,
        results,
        receivedAt: Date.now()
    }
}

export const RECEIVE_MORE_FACES_FAILED = "RECEIVE_MORE_FACES_FAILED";
export function receiveMoreFacesFailed(page, person){
    return {
        type: RECEIVE_MORE_FACES_FAILED,
        page, 
        person,
        receivedAt: Date.now()
    }
}

export function loadMoreFaces(page, person, auth_token){
    return dispatch => {
        dispatch(requestMoreFaces(page, person))
        let url = "https://www.backend.trigger.tessact.com/api/v1/faces/?" + $.param({page: page, face_group__person: person})
        return fetch(url, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': "Token "+auth_token
            },
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then(json => dispatch(receiveMoreFaces(page, person, json.results)))
          .catch((err)=>{
            console.log(err);
            dispatch(receiveMoreFacesFailed(page,person))
          })
      }
}


export function shouldFetchMoreFaces(state, person){
    const faces = state.facesForPerson;
    console.log(faces);
    console.log(person);
    if (Object.keys(faces).length === 0 && faces.constructor === Object){
        return true
    }else if (!faces) {
        return true
    } else if (faces.isFetching) {
        return false
    }else {
        return true
    }
}

export function fetchMoreFacesIfNeeded(page, person){
    return (dispatch, getState) => {
        if (shouldFetchMoreFaces(getState(), person)) {
          // Dispatch a thunk from thunk!
          return dispatch(loadMoreFaces(page, person, getState().login.auth_token))
        } else {
          // Let the calling code know there's nothing to wait for.
          console.log("No More Face request");
          return Promise.resolve()
        }
      }
    
}