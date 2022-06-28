import { useEffect, useState } from "react";
import { Card, CardBody, CardText } from "reactstrap";
import api from "../../api";

const AddSubject = (props) => {
  const { values, setValues } = props;
  let subjects = values.allocationStdDetails;
  const [sub, setSub] = useState([]);
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    api
      .Subjects()
      .fetchAll()
      .then((res) => {
        setSub(res.data);
        setSearchList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let x = [...sub];
    x = x.filter((y) => {
      return subjects.every((item) => item.subjectId !== y.subjectId);
    });
    setSearchList(x);
  }, [subjects]);

  const addSubject = (subject) => {
    let x = {
      allocationStdId: values.allocationStdId,
      allocationStdDetailId: 0,
      subjectId: subject.subjectId,
      subjectName: subject.subjectName,
    };
    setValues({
      ...values,
      allocationStdDetails: [...values.allocationStdDetails, x],
    });
  };

  return (
    <Card>
      {searchList.map((item, idx) => {
        console.log(item);
        return (
          <>
            <CardBody
              style={{ cursor: "pointer" }}
              key={idx}
              onClick={(e) => addSubject(item)}
            >
              <CardText>{item.subjectName}</CardText>
            </CardBody>
            <hr />
          </>
        );
      })}
    </Card>
  );
};

export default AddSubject;
