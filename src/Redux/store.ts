import { configureStore } from '@reduxjs/toolkit';
import { Account } from '../models/account.model';
import { User } from '../models/user.model';
import { Mode } from '../models/mode.model';
import userSliceReducer from './states/user';
import accountSliceReducer from './states/account';
import modeReducer from './states/mode';
import deleteReducer from './states/delete';
import { Delete } from '../models/delete.model';

export interface AppStore {
    user: User
    account: Account
    mode: Mode
    delete: Delete
}

const store = configureStore<AppStore>({
    reducer: {
        user: userSliceReducer,
        account: accountSliceReducer,
        mode: modeReducer,
        delete: deleteReducer,
    }
});

export type AppDispatch = typeof store.dispatch;

export default store;