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
import * as clsActions from "../../action/classroom";
import { toast } from "react-toastify";

const initialFieldValues = {
  classRoomName: "",
};

const ClassRoomForm = (props) => {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("classRoomName" in fieldValues) {
      temp.classRoomName = fieldValues.classRoomName
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
        props.createClassRoom(values, () => {
          toast.success("inserted successfully");
        });
      else
        props.updateClassRoom(props.currentId, values, () => {
          toast.success("updated successfully");
        });
    }
    resetForm();
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.classRoomList.find((x) => x.classroomId === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="classRoomName">ClassRoomName</Label>
            <Input
              id="classRoomName"
              name="classRoomName"
              placeholder="Class Room Name"
              value={values.classRoomName}
              onChange={handleInputChange}
              {...(errors.classRoomName && { invalid: true })}
            />
            {errors.classRoomName && (
              <FormFeedback>{errors.classRoomName}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Button type="submit" color="primary" block>
            Submit
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
  classRoomList: state.cls.clslist,
});

const mapActionToProps = {
  createClassRoom: clsActions.create,
  updateClassRoom: clsActions.update,
};

export default connect(mapStateToProps, mapActionToProps)(ClassRoomForm);
