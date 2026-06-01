import {SignOut} from "@/app/components/signout"
import {SignIn} from "@/app/components/signin"
import { auth } from "@/auth";


export async function Navbar() {
  const session = await auth()
  if(!session) {
    return (
      <nav className="bg-[#1E293B] text-white pt-4 pb-4 pl-2">
      <div className="container pl-5">
        <h1 className="text-4xl font-bold">Link Up</h1>
      </div>
      <div className="absolute top-6 right-25">
      <SignIn />
      </div>
    </nav>
    )
  }
  return (
    <nav className="bg-[#1E293B] text-white pt-4 pb-4 pl-2">
      <div className="container pl-5">
        <h1 className="text-4xl font-bold">Link Up</h1>
      </div>
      <div className="absolute top-6 right-25">
      <SignOut />
      </div>
    </nav>
  )
}
