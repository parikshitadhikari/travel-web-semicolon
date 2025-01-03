import { FaThumbsUp, FaRegCommentAlt } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Comment from "./Comment";
import { generateRandomNumber } from "../../services/generateRandomNumber";

export interface Post {
  id: number;
  user: { username: string };
  description: string;
  created_at: string;
  img: string; // Assuming this is the image path or URL
  postcomment_set: Comment[];
  postlike_set: Like[];
}
export interface Like{
  id: number;
  
}
export interface Comment {
  id: number;
  post: number;
  comment: string;
  commented_by: number;
}

interface Props {
  post: Post;
  inModal?: boolean;
}

const Post = ({ post, inModal = false }: Props) => {
  const profileImage =
    "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";

  const imageClassName = inModal
    ? "mt-3 w-auto max-h-60 rounded-lg"
    : "max-h-80 w-80 mx-auto";

  return (
    <div className="mx-32 my-1 bg-white rounded-3xl border border-gray-300 shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
      <div className="p-7">
        <div className="flex items-center space-x-3 overflow-hidden rounded-full">
          <img
            className="w-10 h-10 rounded-full"
            src={profileImage}
            alt="Profile"
          />
          <div>
            <p className="text-sm font-medium text-gray-800">
              {post.user.username}
            </p>
            <p className="text-xs text-gray-500">
              {post.created_at.slice(0, 10)}
            </p>
          </div>
        </div>

        <p className="mt-3 text-gray-800">{post.description}</p>

        <img
          className={`mt-3 w-80 rounded-lg ${imageClassName}`}
          src={post.img} // Adjust this if needed
          alt="Post"
        />

        <div className="flex justify-between items-center mt-3 mx-4 text-gray-500">
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <FaThumbsUp />
            <span>{generateRandomNumber()}</span>{" "}
            {/* Replace with actual like count if available */}
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <span>{post.postcomment_set.length}</span>{" "}
            {/* Replace with actual comment count if available */}
            <FaRegCommentAlt />
          </button>
        </div>

        <div className="mt-3 flex items-center">
          <div className="flex-grow flex items-center bg-gray-100 rounded-full px-4 py-2 border border-gray-300">
            <input
              className="bg-transparent flex-grow text-sm outline-none"
              type="text"
              placeholder="Write a comment..."

            />
            <IoMdSend className="text-gray-500 text-2xl ml-2 hover:text-blue-600" />
          </div>
        </div>
      </div>
      {inModal && post.postcomment_set.length > 0 && (
        <div>
          <h3 className="text-md font-semibold mb-2 ml-6">Comments</h3>
          {post.postcomment_set.map(({ id, comment, commented_by }) => (
            <Comment
              key={id} // Use the comment ID as the key for better performance
              username={`${commented_by}`} // Adjust this if you need the actual username
              comment={comment}
              date={`${new Date().getFullYear()}`} // Adjust the date display if necessary
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
