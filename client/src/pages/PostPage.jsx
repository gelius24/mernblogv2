import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

export default function PostPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [post, setPost] = useState(null)
  const {postSlug} = useParams();
  const [recentsPosts, setRecentsPosts] = useState(null);

  // fetch the specific post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
        const data = await res.json();
        if (!res.ok) {
          setError(true)
          return setIsLoading(false)
        } else {
          setPost(data.posts[0])
          setIsLoading(false)
          setError(false)
        }
      } catch (error) {
        setError(true)
        setIsLoading(false)
      }
    }
    fetchPost();
  }, [postSlug])

  // fetch last 3 posts (they are displayed in the bottom)
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`)
        const data = await res.json();
        console.log(data)
        if (res.ok) {
          setRecentsPosts(data.posts)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchRecentPosts();
  }, [post])

  if (isLoading) return <div className="flex justify-center items-center min-h-screen"><Spinner size='xl' /></div>

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">{post && post.title}</h1>
      <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
        <Button pill color='gray' size='xs'>{post && post.category}</Button>
      </Link>
      <img src={post && post.image} alt={post && post.title} className="mt-10 p-3 max-h-[400px] w-full object-cover" />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">{post && (post.content.length / 1000).toFixed(0)}, min. read</span>
      </div>
      <div className="p-3 max-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{__html: post && post.content}}>
      </div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction/>
        <CommentSection postId={post && post._id}/>
        {/*  */}
        <div className="flex flex-col justify-center items-center mb-5">
          <h1 className="text-xl mt-5">Recent articles</h1>
          <div className="flex flex-wrap gap-5 mt-5 justify-center">
            {
              recentsPosts && 
              recentsPosts.map(post => {
                return <PostCard key={post._id} post={post} />
              })
            }
          </div>
        </div>
      </div>
    </main>
  )
}