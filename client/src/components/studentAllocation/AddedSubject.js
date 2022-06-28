import { HiOutlineTrash } from "react-icons/hi";
import { Card, CardBody, CardText, Col, Row } from "reactstrap";

const AddedSubject = (props) => {
  const { values, setValues } = props;

  let subjects = values.allocationStdDetails;

  const removeSubjects = (index, id) => {
    // debugger;
    let x = { ...values };
    x.allocationStdDetails = x.allocationStdDetails.filter(
      (_, i) => i !== index
    );
    if (id !== 0) x.deletedItemIds += id + ",";
    setValues({ ...x });
  };
  return (
    <Card>
      {subjects.length === 0 ? (
        <>
          <CardBody>
            <CardText>Please select lenguages</CardText>
          </CardBody>
          <hr />
        </>
      ) : (
        subjects.map((item, idx) => (
          <>
            <CardBody style={{ cursor: "pointer" }} key={idx}>
              <Row>
                <Col md={10}>
                  <CardText>{item.subjectName}</CardText>
                </Col>
                <Col md={2}>
                  <HiOutlineTrash
                    onClick={(e) =>
                      removeSubjects(idx, item.allocationStdDetailId)
                    }
                  />
                </Col>
              </Row>
            </CardBody>
            <hr />
          </>
        ))
      )}
    </Card>
  );
};

export default AddedSubject;
