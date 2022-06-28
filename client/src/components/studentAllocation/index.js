import useForm from "../../hooks/useForm";
import { Col, Container, FormGroup, Label, Row } from "reactstrap";
import StdAllocationForm from "./StdAllocationForm";
import AddSubject from "./AddSubject";
import AddedSubject from "./AddedSubject";

const initialFieldValues = () => ({
  allocationStdId: 0,
  studentId: "",
  deletedItemIds: "",
  allocationStdDetails: [],
});
const StudentAllocation = () => {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
    handleInputChangetoNumber,
    handleInputChangetoNumberStd,
  } = useForm(initialFieldValues);
  return (
    <Container className="bg-light border my-3">
      <StdAllocationForm
        {...{
          values,
          setValues,
          errors,
          setErrors,
          handleInputChange,
          resetFormControls,
          handleInputChangetoNumber,
          handleInputChangetoNumberStd,
        }}
      />
      <br />
      <Row>
        <Col md={6}>
          <AddSubject
            {...{
              values,
              setValues,
            }}
          />
        </Col>
        <Col md={6}>
          <AddedSubject
            {...{
              values,
              setValues,
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default StudentAllocation;
