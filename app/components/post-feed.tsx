"use client" // <-- Required for WebSockets / useEffect

import { useEffect, useState } from "react"
import { supabaseClient } from "@/app/utils/supabase/client"

interface Post {
  UUID: string
  title: string
  content: string
  email: string
  created: string
}

export function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  

  // 1. Fetch initial posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
        const { data, error } = await supabaseClient
            .from("posts")
            .select("*")
            .order("created", { ascending: false }) // Newest first
            
        if (data) setPosts(data)
        console.log("Fetched posts:", data)
    }
    fetchPosts()

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

    
    <div className="w-6xl bg-[#0F172A] mx-auto mt-8 min-w-[300px] flex flex-col p-5 rounded gap-4">
      <h2 className="text-xl font-bold text-white">🔴Live Feed</h2>
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
            <span className="text-xs text-purple-400 mt-2 block">By: {post.email}</span>
            <span className="text-xs text-purple-400 mt-2 block">Created: {new Date(post.created).toLocaleString()}</span>
            
          </div>
        ))
      )}
    </div>
    </div>
  )
}