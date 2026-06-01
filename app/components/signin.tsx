import { signIn } from "@/auth"

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit" className="bg-[#A855F7] p-3 rounded-4xl hover:scale-105 duration-300 ease-in-out text-center">Sign In with GitHub</button>
    </form>
  )
}