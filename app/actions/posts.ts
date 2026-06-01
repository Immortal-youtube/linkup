"use server"

import { auth } from "@/auth"
import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import crypto from "crypto"

// Initialize Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL! || process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // <-- CRITICAL: Secret key used only here
)

export async function createPost(formData: FormData) {
  // 1. Authenticate the user securely on the server
//   const session = await auth()
//   if (!session || !session.user?.id) {
//     throw new Error("You must be logged in to create a post.")
//   }

  // 2. Extract the data safely from the form input fields
  console.log(formData)
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const email = formData.get("userEmail") as string
  const created = new Date().toISOString()
  const UUID = crypto.randomUUID() // Generate a unique ID for the post

  // Simple validation check
  if (!title || !content) {
    throw new Error("Title and content are required.")
  }

  // 3. Insert the new post row into your Supabase database
  const { error } = await supabase.from("posts").insert({
    title,
    content,
    email,
    created,
    UUID
    // Links the post to this exact user
  })

  if (error) {
    console.error("Supabase Error:", error)
    throw new Error("Failed to create post.")
  }

  // 4. Tell Next.js to clear its cache and show the fresh post instantly
  revalidatePath("/")
}