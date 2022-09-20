import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Form } from '../../types/state';

const initialState: Form = {
  isFormDisabled: false,
};

export const formState = createSlice({
  name: NameSpace.Form,
  initialState,
  reducers: {
    setFormDisabled: (state, action) => {
      state.isFormDisabled = action.payload;
    },
  }
});

export const { setFormDisabled } = formState.actions;
