const userInfo = JSON.parse(localStorage.getItem('userInfo'));
const initialState = {
  isLoggedIn: userInfo ? true : false,
  token: localStorage.getItem("token"),
  userInfo: userInfo ? userInfo : {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log('token : ', action.data.token);
      console.log('data : ', action.data);
      localStorage.setItem("token", action.data.token);
      localStorage.setItem("userInfo", JSON.stringify(action.data));
      return {
        ...state,
        isLoggedIn: true,
        token: action.data.token,
        userInfo: action.data,
      };
    case "LOGIN_FAILURE":
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      return {
        ...state,
        isLoggedIn: false,
        token: "",
        userInfo: ''
      };
    case "LOGOUT_SUCCESS":
       localStorage.removeItem('token');
       localStorage.removeItem('userInfo');
       return {
        ...state, isLoggedIn: false, token: '', userInfo: ''
      }  
    default:
      return state;
  }
};

export default userReducer;
