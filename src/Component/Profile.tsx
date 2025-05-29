import React from "react";
import { useUser } from "./UserData";
import '../Style/profile.css';
const Profile = () => {
    const { userdata, isAuthenticated } = useUser();

    if (!isAuthenticated) {
        return <div className="profile">You are not logged in.</div>;
    }

    return (
        <div className="profile">
            <h2>Profile</h2>
            <p><strong>Full Name:</strong> {userdata?.fullName}</p>
            <p><strong>Email:</strong> {userdata?.email}</p>
        </div>
    );
};
export default Profile;