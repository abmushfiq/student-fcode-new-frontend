export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const FETCH_STUDENTS = "FETCH_STUDENTS";
export const FETCH_STUDENTS_SUCCESS = "FETCH_STUDENTS_SUCCESS";

export const SET_STUDENTS = "SET_STUDENTS";
export const ADD_STUDENT = "ADD_STUDENT";
export const DELETE_STUDENT = "DELETE_STUDENT";
export const UPDATE_STUDENT = "UPDATE_STUDENT";


export const fetchStudents = () => ({
  type:FETCH_STUDENTS,
});

export const setStudents = (students) => ({
  type: SET_STUDENTS,
  payload: students,
});

export const addStudent = (student) => ({
  type: ADD_STUDENT,
  payload: student,
});

export const deleteStudent = (student) => ({
  type: DELETE_STUDENT,
  payload: student,
});

export const updateStudent = (student) => ({
  type: UPDATE_STUDENT,
  payload: student,
});

