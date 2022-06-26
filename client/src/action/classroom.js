import api from "../api";

export const ACTION_TYPES = {
  CREATE_CLS: "CREATE_CLS",
  UPDATE_CLS: "UPDATE_CLS",
  DELETE_CLS: "DELETE_CLS",
  FETCH_ALL_START_CLS: "FETCH_ALL_START_CLS",
  FETCH_ALL_CLS: "FETCH_ALL_CLS",
};

export const ftechAllStart = () => ({
  type: ACTION_TYPES.FETCH_ALL_START_CLS,
});

export const ftechAll = () => (dispatch) => {
  api
    .ClassRoom()
    .fetchAll()
    .then((response) => {
      console.log(response);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL_CLS,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
  //get api request
};

export const create = (data, onSuccess) => (dispatch) => {
  api
    .ClassRoom()
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE_CLS,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
export const update = (id, data, onSuccess) => (dispatch) => {
  api
    .ClassRoom()
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_CLS,
        payload: { id, ...data },
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
export const Delete = (id, onSuccess) => (dispatch) => {
  api
    .ClassRoom()
    .delete(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE_CLS,
        payload: id,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
