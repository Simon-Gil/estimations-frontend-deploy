import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user.model";

export const EmptyUserState: User = {
    id: '',
    name: '',
    lastname: '',
    password: '',
    permissions: [],
    roles: [],
    email: '',
    department: {
        id: '',
        name: '',
    },
    grade: {
        id: '',
        name: '', 
    },
    isBlocked: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: EmptyUserState,
    reducers: {
        createUser: (state, action) =>  action.payload,
        updateUser: (state, action) =>({ ...state, ...action.payload }),
        deleteUser: () => { return EmptyUserState; }
    }
});

export const { createUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;