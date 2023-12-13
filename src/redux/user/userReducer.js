const DEFAULT_STATE = {
    info: null,
    loading: false,
    errors: null,
  };
  
export const userReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case "USER/ERROR":
        return {
          info: null,
          loading: false,
          errors: action.payload
        }
      case "USER/LOADING/SET":
        return {
          ...state,
          loading: true,
          errors: null,
        };
      case "USER/SET":
        return {
          info: action.payload,
          loading: false,
          errors: null,
        };
      default:
        return state;
    }
  }