import { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as stdActions from "../../action/students";

import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { createAPIEndpoint } from "../../api";
import { toast } from "react-toastify";
import AllocationList from "./AllocationList";

const StdAllocationForm = (props) => {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChangetoNumberStd,
    resetFormControls,
  } = props;

  const [currentId, setCurrentId] = useState(0);
  const [allocationListVisibility, setAllocationListVisibility] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await props.fetchAllStudentsStart();
      await props.fetchAllStudents();
    };
    fetchData();
  }, []);

  useEffect(() => {
    setValues({
      ...values,
    });
  }, [JSON.stringify(values.allocationStdDetails)]);

  useEffect(() => {
    if (currentId === 0) resetFormControls();
    else {
      createAPIEndpoint()
        .fetchById(currentId)
        .then((res) => {
          setValues(res.data);
          setErrors({});
        })
        .catch((err) => console.log(err));
    }
  }, [currentId]);

  //   validate form
  //   const validate = (fieldValues = values) => {
  //     let temp = { ...errors };
  //     if ("studentId" in fieldValues) {
  //       temp.studentId = fieldValues.studentId ? "" : "This field is required";
  //     }
  //     setErrors({
  //       ...temp,
  //     });
  //     if (fieldValues === values) {
  //       return Object.values(temp).every((x) => x === "");
  //     }
  //   };

  const validateForm = () => {
    let temp = { ...errors };
    temp.studentId = values.studentId !== 0 ? "" : "This field is required.";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  // reset form
  const resetForm = () => {
    resetFormControls();
    setCurrentId(0);
  };

  //   submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (values.allocationStdId === 0) {
        createAPIEndpoint()
          .create(values)
          .then((res) => {
            resetFormControls();
            toast.success("inserted successfully");
          })
          .catch((err) => console.log(err));
      } else {
        createAPIEndpoint()
          .update(values.allocationStdId, values)
          .then((res) => {
            setCurrentId(0);
            toast.success("updated successfully");
          })
          .catch((err) => console.log(err));
      }
    }
  };
  console.log(allocationListVisibility);
  return (
    <>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="studentId">Students</Label>
              <Input
                id="studentId"
                name="studentId"
                value={values.studentId}
                onChange={handleInputChangetoNumberStd}
                type="select"
                {...(errors.studentId && { invalid: true })}
              >
                {props.studentsListStart ? (
                  <option value="" disabled>
                    Loading...
                  </option>
                ) : (
                  <option value="" disabled>
                    Select A Student
                  </option>
                )}

                {props.studentsList.map((data, index) => {
                  return (
                    <option value={data.studentId} key={index}>
                      {data.firstName}
                    </option>
                  );
                })}
              </Input>
              {errors.studentId && (
                <FormFeedback>{errors.studentId}</FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Button type="submit" color="primary" block>
              {currentId === 0 ? "Insert" : "Update"}
            </Button>
          </Col>
          <Col md={4}>
            <Button color="danger" block onClick={resetForm}>
              Reset
            </Button>
          </Col>
          <Col md={4}>
            <Button
              color="success"
              block
              // onClick={() => {
              //   setAllocationListVisibility(true);
              // }}
              onClick={function noRefCheck() {
                setAllocationListVisibility(true);
              }}
            >
              Allocations
            </Button>
          </Col>
        </Row>
      </Form>
      <Modal
        fullscreen="lg"
        size="xl"
        isOpen={allocationListVisibility ? true : false}
      >
        <ModalHeader
          toggle={function noRefCheck() {
            setAllocationListVisibility(false);
          }}
        >
          List of allocations
        </ModalHeader>
        <ModalBody>
          <AllocationList
            {...{
              setCurrentId,
              setAllocationListVisibility,
              resetFormControls,
            }}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  studentsList: state.std.stdlist,
  studentsListStart: state.std.stdloading,
});

const mapActionToProps = {
  fetchAllStudentsStart: stdActions.ftechAllStart,
  fetchAllStudents: stdActions.ftechAll,
};

export default connect(mapStateToProps, mapActionToProps)(StdAllocationForm);
