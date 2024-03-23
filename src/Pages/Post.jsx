import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Service from "../appwrite/config";
import { Container } from "../Components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      Service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    Service.deletePost(post.$id).then((status) => {
      if (status) {
        Service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 w-full h-full m-auto ">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={Service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl h-full w-1/2"
          />
        </div>
        {isAuthor && (
          <div className=" ">
            <Link to={`/edit-post/${post.$id}`}>
              <button className="bg-green-500  mr-2 px-2 rounded-lg">
                Edit
              </button>
            </Link>
            <button className="bg-red-500 px-2 rounded-lg" onClick={deletePost}>
              Delete
            </button>
          </div>
        )}
        <div className="w-full mb-6 text-center">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
