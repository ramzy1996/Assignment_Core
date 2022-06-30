import { HiOutlineTrash } from "react-icons/hi";
import { Table } from "reactstrap";

const AddedSubject = (props) => {
  const { values, setValues } = props;

  let subjects = values.allocationSubDetails;

  const removeSubjects = (index, id) => {
    // debugger;
    let x = { ...values };
    x.allocationSubDetails = x.allocationSubDetails.filter(
      (_, i) => i !== index
    );
    if (id !== 0) x.deletedItemIds += id + ",";
    setValues({ ...x });
  };
  return (
    <Table hover>
      <tbody>
        {subjects.length === 0 ? (
          <tr>
            <td>Please select lenguages</td>
          </tr>
        ) : (
          subjects.map((item, idx) => {
            console.log(item);
            return (
              <tr key={idx}>
                <th>{item.subjectName}</th>
                <td
                  width={"15%"}
                  className="btn-primary text-center"
                  style={{ cursor: "pointer" }}
                  onClick={(e) =>
                    removeSubjects(idx, item.allocationSubDetailId)
                  }
                >
                  <HiOutlineTrash color="red" />
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </Table>
  );
};

export default AddedSubject;
