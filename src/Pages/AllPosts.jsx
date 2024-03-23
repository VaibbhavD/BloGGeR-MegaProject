import { Container, PostCard } from "../Components/index";
import React, { useState, useEffect } from "react";
import Service from "../appwrite/config";

function Allposts() {
  const [posts, setposts] = useState([]);

  useEffect(() => {
    Service.getPosts([]).then((posts) => {
      if (posts) setposts(posts.documents);
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap gap-8 justify-center">
          {posts.map((post) => (
            <div key={post.$id} className="w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
export default Allposts;
