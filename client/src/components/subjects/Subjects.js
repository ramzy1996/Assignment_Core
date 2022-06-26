import { Table, ButtonGroup, Button, Spinner, Container } from "reactstrap";
import { connect } from "react-redux";
import * as sbjActions from "../../action/subjects";
import { useEffect, useState } from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import SubjectsForm from "./SubjectsForm";

const Subjects = (props) => {
  const [currentId, setCurrentId] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      await props.fetchAllSubjectsStart();
      await props.fetchAllSubjects();
    };
    fetchData();
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteSubjects(id, () => toast.success("deleted successfully"));
  };

  return (
    <Container fluid="sm">
      <Container className="my-5">
        <SubjectsForm
          subjectsListStart={props.subjectsListStart}
          subjectsList={props.subjectsList}
          {...{ currentId, setCurrentId }}
        />
      </Container>

      <Table>
        <thead>
          <tr>
            <th>#Id</th>
            <th>Subject Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {props.subjectsListStart && (
            <tr>
              <th colSpan={5} className="text-center">
                <Spinner>Loading...</Spinner>
              </th>
            </tr>
          )}
          {props.subjectsList.map((data, index) => {
            console.log(data);
            return (
              <tr key={index}>
                <td>{data.subjectId}</td>
                <td>{data.subjectName}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      color="primary"
                      outline
                      size=""
                      onClick={() => {
                        setCurrentId(data.subjectId);
                      }}
                    >
                      <HiOutlinePencilAlt />
                    </Button>
                    <Button
                      color="danger"
                      outline
                      size=""
                      onClick={() => {
                        onDelete(data.subjectId);
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
  subjectsList: state.sbj.sbjlist,
  subjectsListStart: state.sbj.sbjloading,
});

const mapActionToProps = {
  fetchAllSubjects: sbjActions.ftechAll,
  fetchAllSubjectsStart: sbjActions.ftechAllStart,
  deleteSubjects: sbjActions.Delete,
};

export default connect(mapStateToProps, mapActionToProps)(Subjects);
