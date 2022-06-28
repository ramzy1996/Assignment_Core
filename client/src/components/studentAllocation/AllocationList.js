import { useEffect, useState } from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import { Button, ButtonGroup, Table } from "reactstrap";
import { createAPIEndpoint } from "../../api";

const AllocationList = (props) => {
  const { setCurrentId, setAllocationListVisibility, resetFormControls } =
    props;

  const [allocationList, setAllocationList] = useState([]);

  useEffect(() => {
    createAPIEndpoint()
      .fetchAll()
      .then((res) => {
        setAllocationList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const showForUpdate = (id) => {
    setCurrentId(id);
    setAllocationListVisibility(false);
  };

  const deleteList = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      createAPIEndpoint()
        .delete(id)
        .then((res) => {
          setAllocationListVisibility(false);
          setCurrentId(0);
          resetFormControls();
          toast.success("deleted successfully");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Student Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {allocationList.map((item, idx) => {
          console.log(item);
          return (
            <tr key={idx}>
              <th scope="row">{idx}</th>
              <td>{item.student.firstName}</td>
              <td>
                <ButtonGroup>
                  <Button
                    color="primary"
                    outline
                    size=""
                    onClick={(e) => {
                      showForUpdate(item.allocationStdId);
                    }}
                  >
                    <HiOutlinePencilAlt />
                  </Button>
                  <Button
                    color="danger"
                    outline
                    size=""
                    onClick={(e) => {
                      deleteList(item.allocationStdId);
                    }}
                  >
                    <HiOutlineTrash />
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default AllocationList;
