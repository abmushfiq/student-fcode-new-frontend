import { combineReducers } from "redux";
import {
  SET_PRODUCTS,
  SET_STUDENTS,
  ADD_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
} from "../actions/actions";

const initialState = {
  students: [],
};



const studentsReducer = (state = initialState.students, action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return action.payload;
    case ADD_STUDENT:
      return [...state, action.payload];
    case DELETE_STUDENT:
      return state.filter((student) => student.id !== action.payload.id);
    case UPDATE_STUDENT:
      return state.map((student) => {
        if (student.id === action.payload.id) {
          return action.payload;
        }
        return student;
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  students: studentsReducer,
});

export default rootReducer;
