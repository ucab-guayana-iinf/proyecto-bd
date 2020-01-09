import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../actions';

export const openModal = (payload) => ({
  type: OPEN_MODAL,
  payload,
})

export const closeModal = (payload) => ({
  type: CLOSE_MODAL,
  payload,
})

export const modalActions = { openModal, closeModal };
