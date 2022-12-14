import { IActions, State } from "../interfaces";

export const initialState: State = {
  name: "",
  brand: null,
  model: "",
  category: null,
  code: "",
  description: "",
};

export const actions: IActions = {
  fieldsChanged: "FIELDS_CHANGED",
  changeForm: "CHANGE_FORM",
  selectChanged: "SELECT_CHANGED",
  submittedForm: "SUBMITTED_FORM",
  reset: "RESET",
};

export function reducer(state: State, action: any) {
  switch (action.type) {
    case actions.selectChanged: {
      return {
        ...state,
        [action.fieldName]: {
          value: action.payload.value,
          label: action.payload.label,
        },
      };
    }
    case actions.fieldsChanged: {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case actions.submittedForm: {
      return {
        ...state,
        code: action.payload,
      };
    }
    case actions.reset: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
