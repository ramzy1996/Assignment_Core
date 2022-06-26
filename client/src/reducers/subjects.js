import { ACTION_TYPES } from "../action/subjects";

const initialState = {
  sbjlist: [],
  sbjloading: false,
};

export const subject = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_START_SBJ:
      return {
        ...state,
        sbjloading: true,
      };
    case ACTION_TYPES.FETCH_ALL_SBJ:
      return {
        ...state,
        sbjlist: [...action.payload],
        sbjloading: false,
      };
    case ACTION_TYPES.CREATE_SBJ:
      return {
        ...state,
        sbjlist: [...state.sbjlist, action.payload],
      };
    case ACTION_TYPES.UPDATE_SBJ:
      return {
        ...state,
        sbjlist: state.sbjlist.map((x) =>
          x.subjectId === action.payload.id ? action.payload : x
        ),
      };
    case ACTION_TYPES.DELETE_SBJ:
      return {
        ...state,
        sbjlist: state.sbjlist.filter((x) => x.subjectId !== action.payload),
      };
    default:
      return state;
  }
};
