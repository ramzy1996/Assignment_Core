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
import * as tchActions from "../../action/teachers";
import { toast } from "react-toastify";

const initialFieldValues = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
};

const TeachersForm = (props) => {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues) {
      temp.firstName = fieldValues.firstName ? "" : "This field is required";
    }
    if ("lastName" in fieldValues) {
      temp.lastName = fieldValues.lastName ? "" : "This field is required";
    }
    if ("mobile" in fieldValues) {
      temp.mobile = fieldValues.mobile ? "" : "This field is required";
    }

    if ("email" in fieldValues) {
      temp.email = /^$|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
      temp.email = fieldValues.email ? "" : "This field is requireds";
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
      if (props.currentId === 0)
        props.createTeachers(values, () => {
          toast.success("inserted successfully");
        });
      else
        props.updateTeachers(props.currentId, values, () => {
          toast.success("updated successfully");
        });
    }
    resetForm();
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.TeachersList.find((x) => x.teacherId === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="firstName">FirstName</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={values.firstName}
              onChange={handleInputChange}
              {...(errors.firstName && { invalid: true })}
            />
            {errors.firstName && (
              <FormFeedback>{errors.firstName}</FormFeedback>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="lastName">LastName</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={values.lastName}
              onChange={handleInputChange}
              {...(errors.lastName && { invalid: true })}
            />
            {errors.lastName && <FormFeedback>{errors.lastName}</FormFeedback>}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="mobile">Mobile</Label>
            <Input
              id="mobile"
              name="mobile"
              placeholder="Mobile"
              value={values.mobile}
              onChange={handleInputChange}
              {...(errors.mobile && { invalid: true })}
            />
            {errors.mobile && <FormFeedback>{errors.mobile}</FormFeedback>}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleInputChange}
              {...(errors.email && { invalid: true })}
            />
            {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
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
  TeachersList: state.tch.tchlist,
});

const mapActionToProps = {
  createTeachers: tchActions.create,
  updateTeachers: tchActions.update,
};

export default connect(mapStateToProps, mapActionToProps)(TeachersForm);
