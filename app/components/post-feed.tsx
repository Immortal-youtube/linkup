"use client" // <-- Required for WebSockets / useEffect

import { useEffect, useState } from "react"
import { supabaseClient } from "@/app/utils/supabase/client"

interface Post {
  UUID: string
  title: string
  content: string
  email: string
  created: string
  username: string
}

interface Like {
  email: string
  UUID: string
}

export function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [likes, setLikes] = useState<Like[]>([]) // Placeholder for likes state

  // 1. Fetch initial posts and likes on mount
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("posts")
        .select("*")
        .order("created", { ascending: false }) // Newest first

      if (error) {
        console.error("Posts query error:", error)
      }
      if (data) setPosts(data)
      console.log("Fetched posts:", data)
      
    }

    // const fetchLikes = async () => {
    //   const { data, error } = await supabaseClient
    //     .from("likes")
    //     .select("*")
    //   if (error) {
    //     console.error("Likes query error:", error)
    //   }
    //   if (data) setLikes(data)
    //   console.log("Fetched likes:", data)
    // }

    fetchData()
    // fetchLikes()

    // 2. Open the WebSocket channel for changes
    const channel = supabaseClient
      .channel("realtime-posts") // Custom name for your websocket room
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          // Push the newly inserted row to the top of our state array instantly!
          setPosts((currentPosts) => [payload.new as Post, ...currentPosts])
        }
      )
      .subscribe()

    // 3. Clean up the websocket connection if the component unmounts
    return () => {
      supabaseClient.removeChannel(channel)
    }

  }, [])

  return (
    <div className="flex justify-center px-6 pt-5">

    
    <div className="w-6xl bg-[#0F172A] mx-auto mt-8 min-w-75 flex flex-col p-5 rounded gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-white">🔴Live Feed</h2>
        {/* <span className="text-sm text-gray-400">Likes fetched: {likes.length}</span> */}
      </div>
      {
      posts.length === 0 ? (
        <p className="text-gray-400 text-sm">No posts yet...</p>
      ) : (
        posts.map((post) => (
          <div 
            key={post.UUID} 
            className="p-4 bg-purple-950/60 border border-purple-500/20 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold text-white">{post.title}</h3>
            <p className="text-gray-300 mt-1 text-sm">{post.content}</p>
            <div className="mt-3 flex gap-4">
            <span className="text-xs text-purple-400 mt-2 block">By: {post.username}</span>
            <span className="text-xs text-purple-400 mt-2 block">Created: {new Date(post.created).toDateString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  )
}