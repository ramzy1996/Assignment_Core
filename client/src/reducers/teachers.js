import { ACTION_TYPES } from "../action/teachers";

const initialState = {
  tchlist: [],
  tchloading: false,
};

export const teachers = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_START_TCH:
      return {
        ...state,
        tchloading: true,
      };
    case ACTION_TYPES.FETCH_ALL_TCH:
      return {
        ...state,
        tchlist: [...action.payload],
        tchloading: false,
      };
    case ACTION_TYPES.CREATE_TCH:
      return {
        ...state,
        tchlist: [...state.tchlist, action.payload],
      };
    case ACTION_TYPES.UPDATE_TCH:
      return {
        ...state,
        tchlist: state.tchlist.map((x) =>
          x.teacherId === action.payload.id ? action.payload : x
        ),
      };
    case ACTION_TYPES.DELETE_TCH:
      return {
        ...state,
        tchlist: state.tchlist.filter((x) => x.teacherId !== action.payload),
      };
    default:
      return state;
  }
};
