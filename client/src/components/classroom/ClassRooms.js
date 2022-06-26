import { Table, ButtonGroup, Button, Spinner, Container } from "reactstrap";
import { connect } from "react-redux";
import * as clsActions from "../../action/classroom";
import { useEffect, useState } from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import StudentForm from "./ClassRoomForm";
import { toast } from "react-toastify";

const ClassRooms = (props) => {
  const [currentId, setCurrentId] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      await props.fetchAllclassroomsStart();
      await props.fetchAllclassrooms();
    };
    fetchData();
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteClassRoom(id, () => toast.success("deleted successfully"));
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
            <th>#Id</th>
            <th>ClassRoom Name</th>
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
          {props.classroomsList.map((data, index) => {
            console.log(data);
            return (
              <tr key={index}>
                <td>{data.classroomId}</td>
                <td>{data.classRoomName}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      color="primary"
                      outline
                      size=""
                      onClick={() => {
                        setCurrentId(data.classroomId);
                      }}
                    >
                      <HiOutlinePencilAlt />
                    </Button>
                    <Button
                      color="danger"
                      outline
                      size=""
                      onClick={() => {
                        onDelete(data.classroomId);
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
  classroomsList: state.cls.clslist,
  classRoomsListStart: state.cls.clsloading,
});

const mapActionToProps = {
  fetchAllclassrooms: clsActions.ftechAll,
  fetchAllclassroomsStart: clsActions.ftechAllStart,
  deleteClassRoom: clsActions.Delete,
};

export default connect(mapStateToProps, mapActionToProps)(ClassRooms);
