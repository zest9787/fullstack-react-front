const initialState = {
  isLoggedIn: false,
  token: localStorage.getItem("token"),
  userInfo: JSON.parse(localStorage.getItem('userInfo'))
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
      return {
        ...state,
        isLoggedIn: false,
        token: "",
      };
    default:
      return state;
  }
};

export default userReducer;
