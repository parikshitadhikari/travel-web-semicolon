import Posts from "@/app/components/community-post/Posts";
import ProfilePage from "@/app/components/profile/Profile";
import SidebarDemo from "@/app/components/Sidebar";
import React from "react";

const CommunityPost = () => {
  return (
    <div className="bg-green-50 h-screen">
      <div className="float-left">
        <SidebarDemo />
      </div>
      <div>
        <ProfilePage/>
      </div>
    </div>
  );
};

export default CommunityPost;
