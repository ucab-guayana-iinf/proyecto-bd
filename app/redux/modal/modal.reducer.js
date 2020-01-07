import { ReactElement } from 'react';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../actions';

const initialState = {
  open: false,
  content: null,
};

export const modal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        open: true,
        content: action.payload.content,
        allowClose: action.payload.allowClose,
      };
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
}
