import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../actions/actions";

function Students() {
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();
  return (
    <div>
      <div>Students</div>
      <button
        onClick={() => {
          dispatch(fetchStudents());
        }}
      >
        Fetch students
      </button>
      {students.map((student) => {
        return <div key={student.id}>{student.name}</div>;
      })}
    </div>
  );
}

export default Students;
