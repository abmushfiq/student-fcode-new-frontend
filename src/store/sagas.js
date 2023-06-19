import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_STUDENTS,
  FETCH_STUDENTS_SUCCESS,
  SET_STUDENTS,
  ADD_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
} from "../actions/actions.js";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://node-test-alb-1907402654.us-east-1.elb.amazonaws.com",
});

async function studentsFetch() {
  const response = await instance.get("/");
  return response.data;
}

async function addNewStudent(student) {
  const response = await instance.post("/students", student, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

async function updateStudent(student) {
  const response = await instance.put(`/students/${student.id}`, student, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

async function deleteStudent(studentId) {
  const response = await instance.delete(`/students/${studentId}`);
  return response.data;
}


function* fetchStudents() {
  try {
    const students = yield call(studentsFetch);
    yield put({ type: SET_STUDENTS, payload: students });
  } catch (error) {
    console.error(error);
  }
}

function* addStudent(action) {
  try {
    const student = yield call(addNewStudent, action.payload);
    yield put({ type: FETCH_STUDENTS_SUCCESS, payload: student });
  } catch (error) {
    console.error(error);
  }
}

function* deleteStudentSaga(action) {
  try {
    const student = yield call(deleteStudent, action.payload);
    yield put({ type: DELETE_STUDENT, payload: student });
  } catch (error) {
    console.error(error);
  }
}

function* updateStudentSaga(action) {
  try {
    const student = yield call(updateStudent, action.payload);
    yield put({ type: FETCH_STUDENTS_SUCCESS, payload: student });
  } catch (error) {
    console.error(error);
  }
}


export default function* rootSaga() {
  yield takeLatest(FETCH_STUDENTS, fetchStudents);
  yield takeLatest(ADD_STUDENT, addStudent);
  yield takeLatest(DELETE_STUDENT, deleteStudentSaga);
  yield takeLatest(UPDATE_STUDENT, updateStudentSaga);

}
