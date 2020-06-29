const initialState = {
  isLoggedIn: false,
  token: localStorage.getItem("token"),
  username: "",
  userid: "",
  email: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log('action.data user_name: ', action.data.user_name);
      console.log('action.data user_id: ', action.data.user_id);
      console.log('action.data user_email: ', action.data.user_email);
      return {
        ...state,
        isLoggedIn: true,
        token: action.data.token,
        username: action.data.user_name,
        userid:  action.data.user_id,
        email: action.data.user_email
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
