import { ActionReducer, Action } from '@ngrx/store';
import { LOGIN } from '../actions';

const defaultState = {
    user: null,
};

export const authReducer: ActionReducer<Object> = (state: IAuthState = defaultState, action: Action) => {
    const payload = action.payload;

    switch (action.type) {
        case LOGIN: {
            const provider = _get(payload.user, 'providerData[0]');
            console.log('provider', provider)
            // delete payload.user.providerData;
            return Object.assign({}, state, {
                user: payload.user,
                provider
            });
        }

        default:
            return state;
    }
}
