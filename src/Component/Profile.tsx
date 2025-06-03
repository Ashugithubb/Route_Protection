import React from "react";
import { useUser } from "./UserData";
import '../Style/profile.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
const Profile = () => {
    // const { userdata, isAuthenticated } = useUser();
    const { isAuthenticated, users } = useAppSelector(state => state.user);

    if (!isAuthenticated) {
        return <div className="profile">You are not logged in.</div>;
    }

    return (
        <div className="profile">
            {/* <h2>Profile</h2> */}

            <p> <i className="fa-solid fa-circle-user" style={{ marginRight: "8px" }}></i>
                {users[0].fullName}
            </p>

        </div>
    );
};
export default Profile;