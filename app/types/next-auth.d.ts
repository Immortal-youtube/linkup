import DefaultSession from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      githubId?: number
      githubUsername?: string
    } & DefaultSession["user"]
  }
}