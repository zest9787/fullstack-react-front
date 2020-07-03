export const loginRequest = data => ({type: 'LOGIN_REQUEST', data});
export const loginSuccess = data => ({type: 'LOGIN_SUCCESS', data});
export const loginFailure = data => ({type: 'LOGIN_FAILURE', data});
export const logout = () => ({type:'LOGOUT_SUCCESS'});
