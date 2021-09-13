import React, {useState, useContext , useEffect } from "react";
import './leftSideBar.css';
import axios from "axios";
import RssFeedIcon from '@material-ui/icons/RssFeed';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import PeopleIcon from '@material-ui/icons/People';
import EditIcon from '@material-ui/icons/Edit';
import { AuthContext } from "../../contexts/context";

const LeftSideBar = () => {
    const {token ,userId} = useContext(AuthContext);
    const [nameUser, setNameUser] = useState("");

    const getNameUser = async () => {

        try {
            const res = await axios.get(`http://localhost:5000/users/${userId}`,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                }}
            )
            console.log(res.data.posts.firstName);
            setNameUser(res.data.posts.firstName)

        } catch (error) {
            console.log(error);
        }
      
    }; 
    useEffect(() => {
        getNameUser();
      }, []);

    return (
        <div className="leftSideBar">
            <div className="img_name">
                <img src="/assets/avatar3.png" alt=""/>
                <span>{nameUser}</span>
            </div>
            <ul className="listIcon">
                <li><RssFeedIcon/> timeline</li>
                <li><EditIcon/> Edit profile</li>
                <li><PhotoAlbumIcon/> Album</li>
                <li><PeopleIcon/> Followers</li>
            </ul>
        </div>
    )
};
export default LeftSideBar;