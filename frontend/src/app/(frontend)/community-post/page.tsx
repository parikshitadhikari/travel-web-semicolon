import Posts from "@/app/components/community-post/Posts";
import SidebarDemo from "@/app/components/Sidebar";
import React from "react";

const CommunityPost = () => {
  return (
    <div className="bg-blue-200 h-screen">
      <SidebarDemo />
      <div className="bg-blue-200 pt-12">
        <Posts className="w-full" />
      </div>
    </div>
  );
};

export default CommunityPost;
