
import {createPost} from "@/app/actions/posts"

interface CreatePostFormProps {
  username: string
  userEmail: string
}

export function CreateNewPost({ username, userEmail }: CreatePostFormProps) {
  return (
    <div className="bg-[#1E293B] text-white min-w-[300px] min-h-[300px] w-6xl p-4 rounded-lg shadow-md">
      <h2 className="text-xl mb-4 font-bold">📝 Create New Post</h2>
      <form className="mt-4 flex flex-col" action={createPost}>
        <input type="hidden" name="username" value={username} />
        <input type="hidden" name="userEmail" value={userEmail} />
        <input
          type="text"
          name = "title"
          placeholder="title"
          className="border border-black-300 min-h-[40px] p-2 rounded mb-2 placeholder:text-slate-500"
        />
        <textarea
          name="content"
          placeholder="content"
          className="border border-black-300 p-2 min-h-[100px] max-h-[200px] rounded mb-2 max placeholder:text-slate-500"
        />
        <button
          type="submit"
          className="bg-violet-600 text-white p-2 rounded hover:bg-violet-700 ease-in-out duration-200"
        >
          Create Post
        </button>
      </form>
    </div>
  )
}