/**
 * @typedef CommentProps
 * @type {object}
 * @property {string} username - The username of the commenter.
 * @property {string} comment - The content of the comment.
 * @property {string} date - The date when the comment was posted.
 * @property {string} [userProfilePic] - Optional URL for the user's profile picture.
 */
export interface CommentProps {
  username: string;
  comment: string;
  date: string;
  userProfilePic?: string; // Optional profile picture
}

/**
 * @function Comment
 * @description A component to display a user's comment with their profile picture, username, and the date of the comment.
 * @param {CommentProps} props - Props containing comment details.
 * @returns {JSX.Element} - A styled component displaying a user comment.
 */
const Comment = ({
  username,
  comment,
  date,
  userProfilePic = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=",
}: CommentProps) => {
  return (
    <div className="border-t border-gray-300 mt-4 pt-2 flex p-4 justify-start items-center">
      {userProfilePic && (
        <img
          src={userProfilePic}
          alt="Profile"
          className="w-8 h-8 rounded-full mr-3"
        />
      )}
      <div className="flex flex-col">
        <div className="flex items-center justify-start space-x-4">
          <p className="text-sm font-semibold">{username}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
        <p className="text-sm text-gray-700">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
