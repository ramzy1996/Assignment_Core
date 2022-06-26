import api from "../api";

export const ACTION_TYPES = {
  CREATE_STD: "CREATE_STD",
  UPDATE_STD: "UPDATE_STD",
  DELETE_STD: "DELETE_STD",
  FETCH_ALL_START_STD: "FETCH_ALL_START_STD",
  FETCH_ALL_STD: "FETCH_ALL_STD",
};

export const ftechAllStart = () => ({
  type: ACTION_TYPES.FETCH_ALL_START_STD,
});

const formData = (data) => ({
  ...data,
  age: parseInt(data.age ? data.age : 0),
});

export const ftechAll = () => (dispatch) => {
  api
    .Students()
    .fetchAll()
    .then((response) => {
      console.log(response);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL_STD,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
  //get api request
};

export const create = (data, onSuccess) => (dispatch) => {
  data = formData(data);
  api
    .Students()
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE_STD,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
export const update = (id, data, onSuccess) => (dispatch) => {
  data = formData(data);
  api
    .Students()
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_STD,
        payload: { id, ...data },
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
export const Delete = (id, onSuccess) => (dispatch) => {
  api
    .Students()
    .delete(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE_STD,
        payload: id,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
