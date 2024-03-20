import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const sendLog = (message) => {
    axios.post('http://localhost:5000/logs', message)
         .catch((err) => console.log('Logging failed:', err));
};

function App() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
    
            sendLog({ event: 'login_success', user: codeResponse.email });
        },
        onError: (error) => {
            console.log('Login Failed:', error);
            sendLog({ event: 'login_failed', error: JSON.stringify(error) });
        }
    });

    useEffect(() => {
        if (user) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                setProfile(res.data);
                sendLog({ event: 'profile_fetch_success', user: res.data.email });
            })
            .catch((err) => {
                console.log(err);
                sendLog({ event: 'profile_fetch_failed', error: JSON.stringify(err) });
            });
        }
    }, [user]);

    const logOut = () => {
        if (profile) {
            sendLog({ event: 'logout', user: profile.email });
        }
        googleLogout();
        setProfile(null);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google</button>
            )}
        </div>
    );
}
export default App;
