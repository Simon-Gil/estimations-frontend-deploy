import { createSlice }  from '@reduxjs/toolkit';
import { Mode } from '../../models/mode.model';

export const initialState: Mode = {
    value: 'time',
} 

export const modeSlice = createSlice({
    name: 'mode',
    initialState: initialState,
    reducers: {
        changeMode: (state, action) => {state.value = action.payload},
    }
});

export const { changeMode } = modeSlice.actions;

export default modeSlice.reducer;