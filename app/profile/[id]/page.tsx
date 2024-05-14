'use client'
import React, { useState, useEffect, } from 'react'
import { useSearchParams } from 'next/navigation'
import Profile from '../../../components/Profile'

const MyProfile = ({ params }) => {
    const [userPosts, setUserPosts] = useState([]);
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params.id}/posts`);
            const data = await response.json();

            setUserPosts(data);
            // console.log(data)
        };

        if (params?.id) fetchPosts();

    }, [params?.id]);

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s thoughts and be inspired by the Twizzle community's creativity!`}
            data={userPosts}
            handleEdit={()=>{}}
            handleDelete={()=>{}}
        />
    )
}

export default MyProfile;
