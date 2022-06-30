import { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as tchActions from "../../action/teachers";

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
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { toast } from "react-toastify";
import AllocationList from "./AllocationList";

const TchAllocationForm = (props) => {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChangetoNumberTch,
    resetFormControls,
  } = props;

  const [currentId, setCurrentId] = useState(0);
  const [allocationListVisibility, setAllocationListVisibility] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await props.fetchAllTeachersStart();
      await props.fetchAllTeachers();
    };
    fetchData();
  }, []);

  useEffect(() => {
    setValues({
      ...values,
    });
  }, [JSON.stringify(values.allocationSubDetails)]);

  useEffect(() => {
    if (currentId === 0) resetFormControls();
    else {
      createAPIEndpoint(ENDPIONTS.ALLOCATION_SUBJECT)
        .fetchById(currentId)
        .then((res) => {
          setValues(res.data);
          setErrors({});
        })
        .catch((err) => console.log(err));
    }
  }, [currentId]);

  const validateForm = () => {
    let temp = { ...errors };
    temp.teacherId = values.teacherId !== 0 ? "" : "This field is required.";
    setErrors({ ...temp });
    temp.allocationSubDetails =
      values.allocationSubDetails.length !== 0 ? "" : "This field is required.";
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
      if (values.allocationSubId === 0) {
        createAPIEndpoint(ENDPIONTS.ALLOCATION_SUBJECT)
          .create(values)
          .then((res) => {
            resetFormControls();
            console.log(values);
            toast.success("inserted successfully");
          })
          .catch((err) => console.log(err));
      } else {
        createAPIEndpoint(ENDPIONTS.ALLOCATION_SUBJECT)
          .update(values.allocationSubId, values)
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
              <Label for="teacherId">Teachers</Label>
              <Input
                id="teacherId"
                name="teacherId"
                value={values.teacherId}
                onChange={handleInputChangetoNumberTch}
                type="select"
                {...(errors.teacherId && { invalid: true })}
              >
                {props.teachersListStart ? (
                  <option value="" disabled>
                    Loading...
                  </option>
                ) : (
                  <option value="" disabled>
                    Select A Teacher
                  </option>
                )}

                {props.teachersList.map((data, index) => {
                  return (
                    <option value={data.teacherId} key={index}>
                      {data.firstName}
                    </option>
                  );
                })}
              </Input>
              {errors.teacherId && (
                <FormFeedback>{errors.teacherId}</FormFeedback>
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
  teachersList: state.tch.tchlist,
  teachersListStart: state.tch.tchloading,
});

const mapActionToProps = {
  fetchAllTeachersStart: tchActions.ftechAllStart,
  fetchAllTeachers: tchActions.ftechAll,
};

export default connect(mapStateToProps, mapActionToProps)(TchAllocationForm);
