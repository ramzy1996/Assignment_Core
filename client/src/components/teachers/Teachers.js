import { Table, ButtonGroup, Button, Spinner, Container } from "reactstrap";
import { connect } from "react-redux";
import * as tchActions from "../../action/teachers";
import { useEffect, useState } from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import TeachersForm from "./TeachersForm";

const Teachers = (props) => {
  const [currentId, setCurrentId] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      await props.fetchAllTeachersStart();
      await props.fetchAllTeachers();
    };
    fetchData();
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteTeachers(id, () => toast.success("deleted successfully"));
  };

  return (
    <Container fluid="sm">
      <Container className="my-5">
        <TeachersForm
          teachersList={props.teachersList}
          teachersListStart={props.teachersListStart}
          {...{ currentId, setCurrentId }}
        />
      </Container>

      <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact No.</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {props.teachersListStart && (
            <tr>
              <th colSpan={5} className="text-center">
                <Spinner>Loading...</Spinner>
              </th>
            </tr>
          )}
          {props.teachersList.map((data, index) => {
            console.log(data);
            return (
              <tr key={index}>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.mobile}</td>
                <td>{data.email}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      color="primary"
                      outline
                      size=""
                      onClick={() => {
                        setCurrentId(data.teacherId);
                      }}
                    >
                      <HiOutlinePencilAlt />
                    </Button>
                    <Button
                      color="danger"
                      outline
                      size=""
                      onClick={() => {
                        onDelete(data.teacherId);
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
  teachersList: state.tch.tchlist,
  teachersListStart: state.tch.tchloading,
});

const mapActionToProps = {
  fetchAllTeachersStart: tchActions.ftechAllStart,
  fetchAllTeachers: tchActions.ftechAll,

  deleteTeachers: tchActions.Delete,
};

export default connect(mapStateToProps, mapActionToProps)(Teachers);
