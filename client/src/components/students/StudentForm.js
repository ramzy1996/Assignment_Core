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
import * as stdActions from "../../action/students";
import * as clsActions from "../../action/classroom";
import { toast } from "react-toastify";

const initialFieldValues = {
  firstName: "",
  lastName: "",
  contactPerson: "",
  mobile: "",
  email: "",
  dateOfBirth: "",
  age: "",
  classroomId: "",
};

const StudentForm = (props) => {
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
    if ("dateOfBirth" in fieldValues) {
      temp.dateOfBirth = fieldValues.dateOfBirth
        ? ""
        : "This field is required";
    }
    if ("classroomId" in fieldValues) {
      temp.classroomId = fieldValues.classroomId
        ? ""
        : "This field is required";
    }
    if ("contactPerson" in fieldValues) {
      temp.contactPerson = fieldValues.contactPerson
        ? ""
        : "This field is required";
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
  const {
    values,
    setValues,
    handleInputChange,
    handleInputChangetoNumber,
    handleInputChangetoNumberAge,
    handleInputChangetoDOB,
    setErrors,
    errors,
    resetForm,
  } = useForm(initialFieldValues, validate, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Values", values);
      if (props.currentId === 0)
        props.createStudent(values, () => {
          toast.success("inserted successfully");
        });
      else
        props.updateStudent(props.currentId, values, () => {
          toast.success("updated successfully");
        });
    }
    resetForm();
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.studentList.find((x) => x.studentId === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  const calculate_age = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    console.log(age_now);
    document.getElementById("age").value = age_now;
    values.age = age_now;
    return age_now;
  };

  const handleInputBlur = () => {
    var val = values.dateOfBirth;
    calculate_age(val);
    console.log(val);
  };

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
            <Label for="contactPerson">ContactPerson</Label>
            <Input
              id="contactPerson"
              name="contactPerson"
              placeholder="Contact Person"
              value={values.contactPerson}
              onChange={handleInputChange}
              {...(errors.contactPerson && { invalid: true })}
            />
            {errors.contactPerson && (
              <FormFeedback>{errors.contactPerson}</FormFeedback>
            )}
          </FormGroup>
        </Col>
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
      </Row>
      <Row>
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
        <Col md={6}>
          <FormGroup>
            <Label for="dateOfBirth">dateOfBirth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              placeholder="DateOfBirth"
              value={values.dateOfBirth}
              onChange={handleInputChangetoDOB}
              onBlur={handleInputBlur}
              type="date"
              {...(errors.dateOfBirth && { invalid: true })}
            />
            {errors.dateOfBirth && (
              <FormFeedback>{errors.dateOfBirth}</FormFeedback>
            )}
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="age">Age</Label>
            <Input
              id="age"
              name="age"
              placeholder="Age"
              value={values.age}
              onChange={handleInputChangetoNumberAge}
              readOnly
              type="number"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="classroomId">Classroom</Label>
            <Input
              id="classroomId"
              name="classroomId"
              value={values.classroomId}
              onChange={handleInputChangetoNumber}
              type="select"
              {...(errors.classroomId && { invalid: true })}
            >
              {props.classRoomsListStart ? (
                <option value="" disabled>
                  Loading...
                </option>
              ) : (
                <option value="" disabled>
                  Select Classroom
                </option>
              )}

              {props.classroomsList.map((data, index) => (
                <option value={data.classroomId} key={index}>
                  {data.classRoomName}
                </option>
              ))}
            </Input>
            {errors.classroomId && (
              <FormFeedback>{errors.classroomId}</FormFeedback>
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
  studentList: state.std.stdlist,
});

const mapActionToProps = {
  createStudent: stdActions.create,
  updateStudent: stdActions.update,
};

export default connect(mapStateToProps, mapActionToProps)(StudentForm);
