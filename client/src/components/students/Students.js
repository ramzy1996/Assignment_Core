import { Table, ButtonGroup, Button, Spinner, Container } from "reactstrap";
import { connect } from "react-redux";
import * as stdActions from "../../action/students";
import * as clsActions from "../../action/classroom";
import { useEffect, useState } from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import StudentForm from "./StudentForm";
import { toast } from "react-toastify";

const Students = (props) => {
  const [currentId, setCurrentId] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      await props.fetchAllStudentsStart();
      await props.fetchAllStudents();

      await props.fetchAllclassroomsStart();
      await props.fetchAllclassrooms();
    };
    fetchData();
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteStudents(id, () => toast.success("deleted successfully"));
  };

  return (
    <Container fluid="sm">
      <Container className="my-5">
        <StudentForm
          classRoomsListStart={props.classRoomsListStart}
          classroomsList={props.classroomsList}
          {...{ currentId, setCurrentId }}
        />
      </Container>

      <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact Person</th>
            <th>Contact No.</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Age</th>
            {/* <th>ClassRoom</th> */}
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {props.studentsListStart && (
            <tr>
              <th colSpan={5} className="text-center">
                <Spinner>Loading...</Spinner>
              </th>
            </tr>
          )}
          {props.studentsList.map((data, index) => {
            console.log(data);
            return (
              <tr key={index}>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.contactPerson}</td>
                <td>{data.mobile}</td>
                <td>{data.email}</td>
                <td>{data.dateOfBirth}</td>
                <td>{data.age}</td>
                {/* <td>{data.classroom.classRoomName}</td> */}
                <td>
                  <ButtonGroup>
                    <Button
                      color="primary"
                      outline
                      size=""
                      onClick={() => {
                        setCurrentId(data.studentId);
                      }}
                    >
                      <HiOutlinePencilAlt />
                    </Button>
                    <Button
                      color="danger"
                      outline
                      size=""
                      onClick={() => {
                        onDelete(data.studentId);
                      }}
                    >
                      <HiOutlineTrash />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  studentsList: state.std.stdlist,
  studentsListStart: state.std.stdloading,

  classroomsList: state.cls.clslist,
  classRoomsListStart: state.cls.clsloading,
});

const mapActionToProps = {
  fetchAllStudentsStart: stdActions.ftechAllStart,
  fetchAllStudents: stdActions.ftechAll,

  fetchAllclassrooms: clsActions.ftechAll,
  fetchAllclassroomsStart: clsActions.ftechAllStart,
  deleteStudents: stdActions.Delete,
};

export default connect(mapStateToProps, mapActionToProps)(Students);
