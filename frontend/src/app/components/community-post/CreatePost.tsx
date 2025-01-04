import { useState } from "react";
import { FaImage } from "react-icons/fa";
import axios from "axios";

/**
 * Props for CreatePost component.
 * @typedef {Object} Props
 * @property {Function} onPostSubmit - Function to call when a post is submitted.
 */
interface Props {
  onPostSubmit: () => void;
}

/**
 * A component for creating a new post with text and image upload option.
 *
 * @param {Props} props - Props for the component.
 * @returns {JSX.Element} The `CreatePost` component.
 */
const CreatePost = ({ onPostSubmit }: Props) => {
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // Retrieve user information from localStorage or set a default value.
  const staticUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string).base_user
        .username    : "Guest";

  /**
   * Handles the submission of the post.
   */
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("description", postContent);
    formData.append("username", staticUser);
    formData.append("label", JSON.stringify(["Music", "Moosic"]));
    if (image) {
      formData.append("img", image);
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/auth/posts/create_post/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post created successfully");
      onPostSubmit(); // Call the function passed in props
      // Optionally reset form after submission
      setPostContent("");
      setImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  /**
   * Handles changes to the image input field.
   * Sets the selected image file to state.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object.
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="mx-64  bg-white rounded-3xl shadow-md border border-gray-300 p-6">
      <h2 className="text-2xl font-semibold mb-3 text-gray-700">Create Post</h2>
      <textarea
        className="w-full text-lg h-16 border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-200"
        placeholder="What's on your mind?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      ></textarea>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex items-center"
          >
            <FaImage className="text-lg text-green-600" />
            <span className="ml-1 text-sm text-gray-700">Photo/Video</span>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {image && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="truncate max-w-xs">{image.name}</span>
              <button
                className="ml-2 text-gray-500 hover:text-red-600"
                onClick={() => setImage(null)}
              >
                ×
              </button>
            </div>
          )}
        </div>
        <button
          className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ${
            !postContent ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSubmit}
          disabled={!postContent}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
