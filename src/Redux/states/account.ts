import { createSlice } from "@reduxjs/toolkit";
import { Account } from "../../models/account.model";

export const EmptyAccountState: Account = {
    id: '',
    name: '',
    email: '',
    priceConfig: {
        id: '',
        isDefault: false,
    },
    technicalManager: {
        id: '',
        name: '',
        lastname: '',
        email: '',
    },
    commercialManager: {
        id: '',
        name: '',
        lastname: '',
        email: '',
    }
}

export const accountSlice = createSlice({
    name: 'account',
    initialState: EmptyAccountState,
    reducers: {
        createAccount: (state, action) =>  action.payload,
        updateAccount: (state, action) =>({ ...state, ...action.payload }),
        deleteAccount: () => { return EmptyAccountState; }
    }
});

export const { createAccount, updateAccount, deleteAccount } = accountSlice.actions;

export default accountSlice.reducer;