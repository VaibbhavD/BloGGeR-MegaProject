import React from "react";
import Service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, content }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-slate-700 rounded-xl p-4 h-full  ">
        <div className=" justify-center mb-4 ">
          <img
            src={Service.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl h-48 w-full"
          />
        </div>
        <h3 className="text-xl font-bold text-neutral-200 flex text-center ">
          {title}
        </h3>
      </div>
    </Link>
  );
}
export default PostCard;
