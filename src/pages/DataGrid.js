import * as React from "react";
import moment from 'moment';
import {
  Grid,
  GridColumn,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents, addStudent,deleteStudent,updateStudent } from "../actions/actions";
import { Button } from "@progress/kendo-react-buttons";
const CustomCell = (props) => {
  return props.tdProps ? (
    <td
      {...props.tdProps}
      style={{
        ...props.tdProps.style,
        backgroundColor: props.color,
      }}
    >
      {props.children}{" "}
    </td>
  ) : null;
};
const MYInputCustomCell = (props) => <CustomCell {...props} color="" />;
const MYNumericCustomCell = (props) => <CustomCell {...props} color="" />;
const MyBooleanCustomCell = (props) => <CustomCell {...props} color="" />;
const MyDateCustomCell = (props) => {
  return (
    <CustomCell {...props} color=""/>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const students = useSelector((state) => state.students);

  React.useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  React.useEffect(() => {
    setData(students);
  }, [students]);

  const enterInsert = () => {
    const dataItem = {
      inEdit: true,
    };
    const newStudents = [dataItem, ...data];
    update(newStudents, dataItem);
    setData(newStudents);
  };

  const enterEdit = (dataItem) => {
    update(data, dataItem).inEdit = true;
    setData([...data]);
  };

  const save = (dataItem) => {
    // dispatch(addStudent(newStudent));
    dataItem.inEdit = undefined;
    dataItem.id = dataItem.id || Math.floor(Math.random() * 100);
    update(students, dataItem);
    const isExist = students.find((p) => p.id === dataItem.id);
    if(isExist){
      dispatch(updateStudent(dataItem));
    }
    setData([...data]);
  };

  const cancel = (dataItem) => {
    if (dataItem.id) {
      const originalItem = students.find((p) => p.id === dataItem.id);
      update(data, originalItem);
    } else {
      update(data, dataItem, !dataItem.id);
    }
    setData([...data]);
  };

  const remove = (dataItem) => {
    dataItem.inEdit = undefined;
    update(data, dataItem, true);
    update(students, dataItem, true);
    setData([...data]);
  };

  const itemChange = (event) => {
    const value = event.value;
    const name = event.field;
    if (!name) {
      return;
    }
    const updatedData = [...data];
    const item = update(updatedData, event.dataItem);
    item[name] = value;
    setData(updatedData);
  };

  const update = (data, item, remove) => {
    let updated;
    const index = data.findIndex(
      (p) => p === item || (item.id && p.id === item.id)
    );
    if (remove) {
      data.splice(index, 1);
      dispatch(deleteStudent(item.id))
      return
    }
    // existing student
    if (index >= 0) {
      updated = {
        ...item,
        id: item.id,
        date_of_birth: moment(item.date_of_birth).toDate(),
        student_name: item.student_name,
        mobile_number: item.mobile_number,
        

      };
      data[index] = updated;
    }
    
    // new student
    else {
      let id = 1;
      data.forEach((p) => {
        id = Math.max(parseInt(p.id) + 1, id);
      });
      updated = {
        ...item,
        id: id,
        date_of_birth: moment(item.date_of_birth).toDate(),
        student_name: item.student_name,
        mobile_number: item.mobile_number,
        registration_number: id,
      };
      dispatch(addStudent(updated));
      data.unshift(updated);
    }
    return data[index];
  };

  const CommandCell = (props) => {
    return !props.dataItem.inEdit ? (
      <td
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
      }}
      >
        <Button
          className="k-primary k-Button k-grid-edit-command"
          onClick={() => enterEdit(props.dataItem)}
          style={{backgroundColor:"red",color:"white"}}
        >
          Edit{" "}
        </Button>{" "}
        <Button
          className="k-Button k-grid-remove-command"
          onClick={() => remove(props.dataItem)}
        >
          Remove{" "}
        </Button>{" "}
      </td>
    ) : (
      <td>
        <Button
          onClick={() => save(props.dataItem)}
          themeColor={"primary"}
        >
          {props.dataItem.id ? "Update" : "Add"}{" "}
        </Button>{" "}
        <Button
          className="k-Button k-grid-cancel-command"
          onClick={() => cancel(props.dataItem)}
          themeColor={"primary"}
          fillMode="flat"
        >
          {props.dataItem.id ? "Cancel" : "Discard changes"}{" "}
        </Button>{" "}
      </td>
    );
  };

  return (
    <div style={{
      backgroundColor: "#f4f4f4",
    }}>
      <Grid
        style={{
          height: "100vh",
          padding: "1rem",
          borderRadius: "0.5rem",
          backgroundColor: "#f4f4f4",
        }}
        data={data}
        onItemChange={itemChange}
        editField="inEdit"
        cells={{
          edit: {
            text: MYInputCustomCell,
            numeric: MYNumericCustomCell,
            boolean: MyBooleanCustomCell,
            date: MyDateCustomCell,
          },
        }}
      >
        <GridToolbar>
          <Button className="k-Button k-primary" onClick={enterInsert}>
            Add new{" "}
          </Button>{" "}
          {data.filter((p) => p.inEdit).length > 0 && (
            <Button
              className="k-Button"
              onClick={() => setData(students.slice())}
            >
              Cancel current changes{" "}
            </Button>
          )}{" "}
        </GridToolbar>
        <GridColumn field="id" title="ID" editable={false} />
        <GridColumn field="student_name" title="Name" editor="text" />
        <GridColumn field="gender" title="Gender" editor="text" />
        <GridColumn field="address" title="Address" editor="text" />
        <GridColumn field="mobile_number" title="Mobile No" editor="text" />
        <GridColumn
          field="date_of_birth"
          title="Date Of Birth"
          editor="date"
          format="{0:d}"
          // cell={(props) => {
          //   const date = moment(props.dataItem.date_of_birth).toDate();
          //   return moment(date).format('YYYY-MM-DD');
          // }}
          
          editable={true}
        />
        <GridColumn field="age" title="Age" editor="numeric" />
        <GridColumn cell={CommandCell} width="200px" />
      </Grid>{" "}
    </div>
  );
};

export default App;
