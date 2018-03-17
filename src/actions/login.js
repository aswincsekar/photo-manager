import 'whatwg-fetch';
export const LOGIN = "LOGIN";
export const LOGIN_RECEIVE = "LOGIN_RECEIVE";

export function login(username, pass){
    return {
        type: LOGIN,
        username,
        pass
    }
}
export function loginReceive(auth_token){
    return {
        type: LOGIN_RECEIVE,
        auth_token
    }
}
export function fetchToken(username, pass) {
    return dispatch => {
      dispatch(login(username, pass))
      return fetch(`https://www.backend.trigger.tessact.com/auth/login/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: pass,
        })
      })
        .then(response => response.json())
        .then(json => dispatch(loginReceive(json.auth_token)))
    }
}