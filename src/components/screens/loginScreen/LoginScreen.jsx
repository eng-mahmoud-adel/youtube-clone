import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../../redux/actions/auth';

import './_loginScreen.scss';

const LoginScreen = () => {
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(login());
    }

    const history = useHistory();

    const accessToken = useSelector(state => state.auth.accessToken);

    useEffect(() => {
        if(accessToken) {
            history.push('/');
        }
    }, [accessToken, history]);

    return (
        <div className="login">
            <div className="login-container">
                <img src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/YouTube.max-1100x1100.png" alt="" />
                <button onClick={handleLogin}>Login With Google</button>
                <p>This project is made using youtube data API</p>
            </div>
        </div>
    )
}

export default LoginScreen;
