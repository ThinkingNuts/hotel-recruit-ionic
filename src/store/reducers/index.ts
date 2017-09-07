import { authReducer } from './auth';

export * from './auth';

export interface AppState {
    auth: IAuthState;
}

export const Reducers = {
    auth: authReducer,
}