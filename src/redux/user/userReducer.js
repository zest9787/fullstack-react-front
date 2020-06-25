const initialState = {
  isLoggedIn: false,
  token: localStorage.getItem("token"),
  username: "",
  userid: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        token: action.data.token,
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
