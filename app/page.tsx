import { auth } from "@/auth"
import { SignIn } from "@/app/components/signin"
import { SignOut } from "@/app/components/signout"
import { Navbar } from "@/app/components/Navbar"
import {CreateNewPost} from "@/app/components/CreateNewpost"
import { PostFeed } from "./components/post-feed"


export default async function Home() {
  const session = await auth()

  if (!session) {
    return (
      <main className="relative min-h-screen bg-[#0F172A] text-white overflow-hidden">
        <Navbar />
        <div className="flex justify-center px-6 pt-5">
        <p className="text-2xl mb-4 max-w-3xl text-center">Link Up is a central hub designed by developers, for developers, tracking the latest tech breakthroughs and engineering insights. The platform strips away the noise of traditional social media, offering a streamlined space where creators publish technical blogs, dissect new tools, and share real-world post-mortems. By combining real-time industry updates with deep-dive technical writing, Link Up serves as a living repository of knowledge that helps engineering teams stay ahead of the curve.</p>
        </div>
        <div className="flex justify-center px-6 pt-5">
        </div>
        
        
      </main>
    )
  }
  return (
    <div className="relative min-h-screen bg-[#0F172A] text-white overflow-hidden">
      <Navbar />
      {session.user?.image && (
        <img
          src={session.user.image}
          alt="User Avatar"
          className="absolute top-2 right-5 w-15 h-15 rounded-full object-cover"
        />
        
      )}
      <div>
      <main className="flex justify-center px-6 pt-5">
        <div className="w-full max-w-6xl">
          <h1 className="text-5xl font-bold mb-4">Welcome, {session.user?.name}!</h1>
          
        </div>
          <div className="absolute bottom-6 left-6">
            <p className="text-sm text-gray-400">Logged in as {session.user?.email}</p>
          </div>
          
      </main>
      <div className="flex justify-center px-6 pt-5">
        <CreateNewPost userEmail={session.user?.email || ""} />
      </div>
      <PostFeed />
      </div>
    </div>
  )
}