import api from "../api";

export const ACTION_TYPES = {
  CREATE_TCH: "CREATE_TCH",
  UPDATE_TCH: "UPDATE_TCH",
  DELETE_TCH: "DELETE_TCH",
  FETCH_ALL_START_TCH: "FETCH_ALL_START_TCH",
  FETCH_ALL_TCH: "FETCH_ALL_TCH",
};

export const ftechAllStart = () => ({
  type: ACTION_TYPES.FETCH_ALL_START_TCH,
});

export const ftechAll = () => (dispatch) => {
  api
    .Teachers()
    .fetchAll()
    .then((response) => {
      console.log(response);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL_TCH,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
  //get api request
};

export const create = (data, onSuccess) => (dispatch) => {
  api
    .Teachers()
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE_TCH,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
export const update = (id, data, onSuccess) => (dispatch) => {
  api
    .Teachers()
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_TCH,
        payload: { id, ...data },
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
export const Delete = (id, onSuccess) => (dispatch) => {
  api
    .Teachers()
    .delete(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE_TCH,
        payload: id,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
