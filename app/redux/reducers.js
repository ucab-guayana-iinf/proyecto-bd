import { combineReducers } from 'redux';
import { History } from 'history';
import modal from './modal/modal.reducer';

export default function createRootReducer(history) {
  return combineReducers({
    modal
  });
}
