export function userReducer(
  state = { email: "something", token: "123" },
  action
) {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload;
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
}
