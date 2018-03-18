import 'whatwg-fetch';
import $ from 'jquery';
export const LOAD_PERSON_GROUPS = "LOAD_PERSON_GROUPS";
export const SELECT_PERSON_GROUP = 'SELECT_PERSON_GROUP';
export const INVALIDATE_PERSON_GROUP = "INVALIDATE_PERSON_GROUP";
export const REQUEST_PERSON_GROUP = "REQUEST_PERSON_GROUP";
export const RECEIVE_PERSON_GROUP = "RECEIVE_PERSON_GROUP";
export const SELECT_PERSON = "SELECT_PERSON";

export function receivePersonGroup(page, results){
    return {
        type: RECEIVE_PERSON_GROUP,
        page,
        results,
        receivedAt: Date.now()
    }
}
export function requestPersonGroup(page, search){
    return {
        type: REQUEST_PERSON_GROUP,
        page,
        search
    }
}
export function fetchPersonGroup(page, search, auth_token) {
    return dispatch => {
      dispatch(requestPersonGroup(page, search))
      let url = "https://www.backend.trigger.tessact.com/api/v1/persongroups/?" + $.param({page: page, search: search})
      return fetch(url,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Token "+auth_token
        },
      }).then(response => response.json())
        .then(json => dispatch(receivePersonGroup(page, json.results)))
    }
}
export function invalidatePersonGroup(persongroup){
    return {
        type: INVALIDATE_PERSON_GROUP,
        persongroup
    }
}
export function selectPersonGroup(persongroup) {
  return {
    type: SELECT_PERSON_GROUP,
    persongroup
  }
}
export function selectPerson(person){
    return {
        type: SELECT_PERSON,
        person
    }
}
