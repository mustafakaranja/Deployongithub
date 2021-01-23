const INITIAL_STATE = {
  isSignedIn: null,
  UserProfile: {
    userId: null,
    UserEmail: null,
    UserImage: null,
    UserName: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: true,
        UserProfile: action.payload,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignedIn: false,
        UserProfile: {
          userId: null,
          UserEmail: null,
          UserImage: null,
        },
      };
    default:
      return state;
  }
};
