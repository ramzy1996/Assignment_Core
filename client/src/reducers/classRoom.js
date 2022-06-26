import { ACTION_TYPES } from "../action/classroom";

const initialState = {
  clslist: [],
  clsloading: false,
};

export const classRoom = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_START_CLS:
      return {
        ...state,
        clsloading: true,
      };
    case ACTION_TYPES.FETCH_ALL_CLS:
      return {
        ...state,
        clslist: [...action.payload],
        clsloading: false,
      };
    case ACTION_TYPES.CREATE_CLS:
      return {
        ...state,
        clslist: [...state.clslist, action.payload],
      };
    case ACTION_TYPES.UPDATE_CLS:
      return {
        ...state,
        clslist: state.clslist.map((x) =>
          x.classroomId === action.payload.id ? action.payload : x
        ),
      };
    case ACTION_TYPES.DELETE_CLS:
      return {
        ...state,
        clslist: state.clslist.filter((x) => x.classroomId !== action.payload),
      };
    default:
      return state;
  }
};
