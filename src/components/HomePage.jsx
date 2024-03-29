import { AuthContext } from "../context/AuthContext";
import Post from "./Post";
import { useState, useEffect, useContext } from "react";
import Spinner from "./Spinner";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(user.token);
  // const { user } = useContext(AuthContext);
  // const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const getAllPosts = async () => {
      const response = await fetch(
        "https://react-blog-backend-pshn.onrender.com/api/all-posts",
        {
          method: "GET",
        }
      );
      const posts = await response.json();
      if (response.ok) {
        console.log(posts);
        setPosts(posts);
      } else {
        console.log("failed to fetch");
      }
    };
    getAllPosts();
  }, []);
  return (
    <div>
      {posts?.length === 0 && <Spinner message='Fetching blogs...' />}
      {posts?.length > 0 && (
        <>
          {posts?.map((post, i) => {
            return <Post {...post} key={i} />;
          })}
        </>
      )}
    </div>
  );
};

export default HomePage;
