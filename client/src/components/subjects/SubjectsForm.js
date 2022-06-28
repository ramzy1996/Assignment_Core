import useForm from "../../hooks/useForm";
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { useEffect } from "react";
import { connect } from "react-redux";
import * as sbjActions from "../../action/subjects";
import { toast } from "react-toastify";

const initialFieldValues = {
  subjectName: "",
};

const SubjectsForm = (props) => {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("subjectName" in fieldValues) {
      temp.subjectName = fieldValues.subjectName
        ? ""
        : "This field is required";
    }
    setErrors({
      ...temp,
    });
    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === "");
    }
  };
  const { values, setValues, handleInputChange, setErrors, errors, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Values", values);
      if (props.currentId === 0)
        props.createSubject(values, () => {
          toast.success("inserted successfully");
        });
      else
        props.updateSubject(props.currentId, values, () => {
          toast.success("updated successfully");
        });
      resetForm();
    }
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.subjectList.find((x) => x.subjectId === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="subjectName">Subject Name</Label>
            <Input
              id="subjectName"
              name="subjectName"
              placeholder="Subject Name"
              value={values.subjectName}
              onChange={handleInputChange}
              {...(errors.subjectName && { invalid: true })}
            />
            {errors.subjectName && (
              <FormFeedback>{errors.subjectName}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Button type="submit" color="primary" block>
            {props.currentId === 0 ? "Insert" : "Update"}
          </Button>
        </Col>
        <Col md={6}>
          <Button color="danger" block onClick={resetForm}>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  subjectList: state.sbj.sbjlist,
});

const mapActionToProps = {
  createSubject: sbjActions.create,
  updateSubject: sbjActions.update,
};

export default connect(mapStateToProps, mapActionToProps)(SubjectsForm);
