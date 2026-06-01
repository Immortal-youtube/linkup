import { signOut } from "@/auth"

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit" className="bg-[#A855F7] p-3 rounded-4xl hover:scale-105 duration-300 ease-in-out text-center">Sign Out</button>
    </form>
  )
}
