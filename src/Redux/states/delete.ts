import { createSlice }  from '@reduxjs/toolkit';
import { Delete } from '../../models/delete.model';

export const initialState: Delete = {
    delete: false,
}

export const deleteSlice = createSlice({
    name: 'delete',
    initialState: initialState,
    reducers: {
        changeDelete: (state, action) => {state.delete = action.payload},
    }
});

export const { changeDelete } = deleteSlice.actions;

export default deleteSlice.reducer;