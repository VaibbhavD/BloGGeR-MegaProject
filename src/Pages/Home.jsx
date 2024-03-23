import React, { useState, useEffect } from "react";
import { Container, PostCard, LogoutBtn, Button } from "../Components/index";
import Service from "../appwrite/config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setpost] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    Service.getPosts().then((posts) => {
      if (posts) {
        setpost(posts.documents);
      }
    });
  }, []);

  // if (posts.length === 0) {
  return (
    <Container>
      <div className="w-full h-full py-8 mt-4 text-center ">
        <div className=" flex-wrap h-full  justify-between">
          <div className=" w-full h-1/3 flex gap-12 mb-10">
            <img
              src="https://www.speora.com/wp-content/uploads/2019/10/blog.jpg"
              className=" drop-shadow-2xl rounded-lg w-1/2 h-full"
            />
            <p className=" w-1/2 m-auto p-5 rounded-3xl bg-gray-600 text-neutral-200 ">
              Create a beautiful blog that fits your style.
            </p>
          </div>
          <div className=" w-full h-1/3 flex gap-12 mb-10">
            <p className=" w-1/2 m-auto p-5 rounded-3xl  bg-neutral-100">
              <b>Hang onto your memories </b>
              Save the moments that matter.
            </p>
            <img
              src="https://www.elegantthemes.com/blog/wp-content/uploads/2022/12/Best-Blogging-Platforms-featured-image.png"
              className="h-full w-1/2 drop-shadow-2xl rounded-lg"
            />
          </div>
          <div className="p-2 w-full m-auto ">
            {!authStatus && (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}
            {authStatus && (
              <Link to="/all-posts">
                <Button>All Posts</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
  // }else{
  //     return (
  //         <div className='w-full py-8'>
  //     <Container>
  //         <div className='flex flex-wrap'>
  //             {posts.map((post)=>(
  //                 <div className='p-2 w-1/4' key={post.$id}>
  //                     <PostCard {...post}/>
  //                 </div>
  //             ))}
  //         </div>
  //     </Container>
  // </div>
  //     )
  // }
}
export default Home;
