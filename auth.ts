import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github" 

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    // 1. The jwt callback receives the GitHub profile data on initial login
    async jwt({ token, profile }) {
      if (profile) {
        token.githubId = profile.id       // The numerical GitHub ID (e.g., 123456)
        token.githubUsername = profile.login // The string username (e.g., "octocat")
      }
      return token
    },
    // 2. The session callback passes those token fields to the frontend client
    async session({ session, token }) {
      if (session.user) {
        session.user.githubId = token.githubId
        session.user.githubUsername = token.githubUsername
      }
      return session
    },
  },
})