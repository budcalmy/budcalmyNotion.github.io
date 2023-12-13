
const DEFAULT_STATE = {
    data: [],
    pagData: [],
    count: 0,
    loading: false,
    errors: null,
}

export const notesReducer = (state = DEFAULT_STATE, action) =>{
    switch(action.type) {
        case "NOTES/ERROR":
            return {
                data: [],
                padData: [],
                count: 0,
                loading: false,
                errors: action.payload
            }
        case "NOTES/LOAD":
            return {
                data: [],
                padData: [],
                count: 0,
                error: null,
                loading: true,
            }
        case "NOTES/SET":
            return {
                ...state,
                loading: false,
                data: action.payload,
                count: action.payload.length,
                pagData: action.payload.slice(0, 3)
            }
        case "NOTES/PAGINATION":
            return {
                ...state,
                pagData: action.payload
            }
        default:
            return state;
    }
}