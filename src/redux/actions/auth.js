import firebase from 'firebase/app';
import auth from '../../firebase';
import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from '../actionTypes';

export const login = () => async dispatch => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        });

        const provider = new firebase.auth.GoogleAuthProvider();
        // this scope to define which feature i need and came from the link below
        // https://developers.google.com/youtube/v3/guides/auth/installed-apps#identify-access-scopes
        provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');
        const res = await auth.signInWithPopup(provider);
        // console.log(res);

        const accessToken = res.credential.accessToken;
        const profile = {
            name: res.additionalUserInfo.profile.name,
            photoURL: res.additionalUserInfo.profile.picture,
        };

        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('user', JSON.stringify(profile));
        // console.log(accessToken, profile);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: accessToken
        });

        dispatch({
            type: LOAD_PROFILE,
            payload: profile
        });

    } catch (error) {
        console.log(error.message);

        dispatch({
            type: LOGIN_FAIL,
            payload: error.message
        });
    }
}

export const logout = () => async dispatch => {
    await auth.signOut();

    dispatch({
        type: LOG_OUT
    });

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
}