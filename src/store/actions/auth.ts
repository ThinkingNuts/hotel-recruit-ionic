import { Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const login = (user): Action => ({
    type: LOGIN,
    payload: { user }
});