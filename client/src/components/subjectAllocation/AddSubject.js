import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import api from "../../api";

const AddSubject = (props) => {
  const { values, setValues } = props;
  let subjects = values.allocationSubDetails;
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
      allocationSubId: values.allocationSubId,
      allocationSubDetailId: 0,
      subjectId: subject.subjectId,
      subjectName: subject.subjectName,
    };
    setValues({
      ...values,
      allocationSubDetails: [...values.allocationSubDetails, x],
    });
  };

  return (
    <Table hover>
      <tbody>
        {searchList.map((item, idx) => {
          console.log(item);
          return (
            <tr
              style={{ cursor: "pointer" }}
              key={idx}
              onClick={(e) => addSubject(item)}
            >
              <th>{item.subjectName}</th>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default AddSubject;
