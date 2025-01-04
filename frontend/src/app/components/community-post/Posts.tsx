"use client";
import { useEffect, useState } from "react";
import Modal from "./Model";
import CreatePost from "./CreatePost";
import SinglePost, { Post } from "./SinglePost";
import axios from "axios";
import { FaBus, FaSeedling } from "react-icons/fa";
import {
  IconArrowGuideFilled,
  IconBus,
  IconMap2,
  IconMapBolt,
  IconMessageChatbot,
  IconMountainFilled,
  IconWorld,
  IconWorldLongitude,
} from "@tabler/icons-react";

interface Props {
  className: string;
}

const Posts = ({ className }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/auth/posts/");
      console.log("Fetched posts:", response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts(); // Call the fetchPosts function
  }, []);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className={`${className} flex flex-col pb-10 bg-blue-200`}>
      <div className="fixed w-full bottom-5">
        <CreatePost
          onPostSubmit={async () => {
            await fetchPosts(); // Refresh posts after creating a new post
          }}
        />
      </div>
      <div
        className={`mb-56 flex flex-col justify-between items-center ${className}`}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post)}
            className="m-0.5 p-2 rounded-xl cursor-pointer"
          >
            <SinglePost post={post} />
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="mx-auto max-w-4xl max-h-[90vh] overflow-y-hidden bg-gray-200 p-4 rounded-lg">
          {selectedPost && <SinglePost post={selectedPost} inModal={true} />}
        </div>
      </Modal>
      <div className="fixed bottom-10 right-10 bg-blue-600 p-4 rounded-full shadow-md hover:bg-blue-700 transition-colors">
        <IconMessageChatbot className="text-white text-2xl" />
      </div>
    </div>
  );
};

export default Posts;
