import useForm from "../../hooks/useForm";
import { Col, Container, Row } from "reactstrap";
import TchAllocationForm from "./TchAllocationForm";
import AddSubject from "./AddSubject";
import AddedSubject from "./AddedSubject";

const initialFieldValues = () => ({
  allocationSubId: 0,
  teacherId: "",
  deletedItemIds: "",
  allocationSubDetails: [],
});
const SubjectAllocation = () => {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
    handleInputChangetoNumber,
    handleInputChangetoNumberTch,
  } = useForm(initialFieldValues);
  return (
    <Container className="bg-light border my-3">
      <TchAllocationForm
        {...{
          values,
          setValues,
          errors,
          setErrors,
          handleInputChange,
          resetFormControls,
          handleInputChangetoNumber,
          handleInputChangetoNumberTch,
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

export default SubjectAllocation;
