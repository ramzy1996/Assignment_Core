import api from "../api";

export const ACTION_TYPES = {
  CREATE_SBJ: "CREATE_SBJ",
  UPDATE_SBJ: "UPDATE_SBJ",
  DELETE_SBJ: "DELETE_SBJ",
  FETCH_ALL_START_SBJ: "FETCH_ALL_START_SBJ",
  FETCH_ALL_SBJ: "FETCH_ALL_SBJ",
};

export const ftechAllStart = () => ({
  type: ACTION_TYPES.FETCH_ALL_START_SBJ,
});

export const ftechAll = () => (dispatch) => {
  api
    .Subjects()
    .fetchAll()
    .then((response) => {
      console.log(response);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL_SBJ,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
  //get api request
};

export const create = (data, onSuccess) => (dispatch) => {
  api
    .Subjects()
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE_SBJ,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
export const update = (id, data, onSuccess) => (dispatch) => {
  api
    .Subjects()
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_SBJ,
        payload: { id, ...data },
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
export const Delete = (id, onSuccess) => (dispatch) => {
  api
    .Subjects()
    .delete(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE_SBJ,
        payload: id,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
