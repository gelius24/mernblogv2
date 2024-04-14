import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      const sortFromUrl = urlParams.get('sort');
      const categoryFromUrl = urlParams.get('category');
      if (searchTermFromUrl || sortFromUrl || categoryFromUrl) setSidebarData({ ...sidebarData, 
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl 
      })
      const fetchPosts = async () => {
       setIsLoading(true);
       const searchQuery = urlParams.toString();
       const res = await fetch(`/api/post/getposts?${searchQuery}`);
       if (!res.ok) return setIsLoading(false);
       else {
         const data = await res.json();
         setPosts(data.posts);
         setIsLoading(false);
         if (data.posts.length >= 9) setShowMore(true);
         else setShowMore(false);
       }
      }
      fetchPosts();
    }, [location.search])

    const handleChange = (e) => {
      if(e.target.id === "searchTerm") {
        setSidebarData({ ...sidebarData, searchTerm: e.target.value })
      }
      if (e.target.id === 'sort') {
        const order = e.target.value || 'desc'
        setSidebarData({ ...sidebarData, sort: order })
      }
      if (e.target.id === 'category') {
        const category = e.target.value || 'uncategorized'
        setSidebarData({ ...sidebarData, category: category })
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searcQuery = urlParams.toString();
    navigate(`/search?${searcQuery}`)
  }

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    try {
      const res = await fetch(`/api/post/getposts?${urlParams.toString()}`);
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length >= 9) setShowMore(true);
      else setShowMore(false);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex felx-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search Term:</label>
            <TextInput placeholder="Search..." id="searchTerm" type="text" value={sidebarData.searchTerm} onChange={handleChange} />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort:</label>
            <Select id="sort" value={sidebarData.sort || 'desc'} onChange={handleChange}>
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Category:</label>
            <Select id="category" value={sidebarData.category || 'uncategorized'} onChange={handleChange}>
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">javascript</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone='purpleToPink'>Search</Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">Posts found:</h1>
        <div className="p-7 flex flex-wrap gap-4">
          {
            !isLoading && posts.length === 0 && <p className="text-xl text-gray-500">No posts found</p>
          }
          {
            isLoading && <p className="text-xl text-gray-500">Loading...</p>
          }
          {
             !isLoading && posts && posts.map((post) => <PostCard key={post._id} post={post} />)
          }
          {
            showMore && <button onClick={handleShowMore} className="text-teal-500 font-semibold text-lg hover:underline p-7 w-full">Show more</button>
          }
        </div>
      </div>
    </div>
  );
}
