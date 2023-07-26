import ACTION_TYPE_SIDEBAR from "../actions-type/actions-type-sidebar";

export const saveHidden = (payload) => ({
  type: ACTION_TYPE_SIDEBAR.ISHIDDEN,
  payload,
});