import { ACTION_TYPES } from "../action/students";

const initialState = {
  stdlist: [],
  stdloading: false,
};

export const students = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_START_STD:
      return {
        ...state,
        stdloading: true,
      };
    case ACTION_TYPES.FETCH_ALL_STD:
      return {
        ...state,
        stdlist: [...action.payload],
        stdloading: false,
      };
    case ACTION_TYPES.CREATE_STD:
      return {
        ...state,
        stdlist: [...state.stdlist, action.payload],
      };
    case ACTION_TYPES.UPDATE_STD:
      return {
        ...state,
        stdlist: state.stdlist.map((x) =>
          x.studentId === action.payload.id ? action.payload : x
        ),
      };
    case ACTION_TYPES.DELETE_STD:
      return {
        ...state,
        stdlist: state.stdlist.filter((x) => x.studentId !== action.payload),
      };
    default:
      return state;
  }
};
