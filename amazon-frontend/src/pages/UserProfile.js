import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; // Import axios for API requests
import { updateUserProfile } from '../actions/UserAction'; // Removed detailsUser import
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/UserConstant';
import "../styles/UserProfile.css";

const UserProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    // Accessing userSignin from Redux state
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    // Accessing userDetails and userUpdateProfile from Redux state
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;

    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            if (userInfo) {
                // Fetch the user details from the API if not available in the state
                axios.get('/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,  // Pass token in the headers
                    },
                })
                .then((response) => {
                    const { name, email } = response.data; // Assuming user data comes in response
                    setName(name);
                    setEmail(email);
                })
                .catch((err) => {
                    console.error('Error fetching user profile:', err);
                });
            }
        } else {
            // If user data is already in the state, set it in the form
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo, user]); // Re-run when userInfo or user changes

    const updateDetails = (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            alert('Passwords do not match.');
        } else {
            dispatch(
                updateUserProfile({
                    userId: user._id,
                    name,
                    email,
                    password,
                })
            );
        }
    };

    return (
        <div className="user-dets-container">
            <form className="form" onSubmit={updateDetails}>
                <h1>User Profile</h1>
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                        {successUpdate && (
                            <MessageBox variant="success">Profile updated successfully.</MessageBox>
                        )}
                        {loadingUpdate && <LoadingBox />}

                        <div className="form-ip-sec">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-ip-sec">
                            <label htmlFor="email">E-mail:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-ip-sec">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-ip-sec">
                            <label htmlFor="confirmpassword">Confirm password:</label>
                            <input
                                type="password"
                                id="confirmpassword"
                                placeholder="Confirm password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <button className="update-btn" type="submit" disabled={loadingUpdate}>
                                {loadingUpdate ? 'Updating...' : 'Update Details'}
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default UserProfile;
