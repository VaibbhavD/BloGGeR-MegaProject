import React,{ useState,useEffect } from "react";
import {Container,PostCard,LogoutBtn, Button} from "../Components/index"
import Service from "../appwrite/config";
import { useSelector} from "react-redux";
import { Link } from "react-router-dom";

function Home() {

    const[posts,setpost]=useState([])
    const authStatus=useSelector((state)=>state.auth.status)

    useEffect(()=>{
        Service.getPosts().then((posts)=>{
            if(posts)
            {
            setpost(posts.documents)
            }
        })},[])
    

    // if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center ">
                <Container>
                    <div className="flex flex-wrap text-lg ">
                        <div className="p-2 w-full flex space-x-32  h-88 -mb-32">
                            <img src="https://www.speora.com/wp-content/uploads/2019/10/blog.jpg" className="h-1/2 w-full drop-shadow-2xl  rounded-lg"/>
                            <p className=" h-fit mt-28 p-10 rounded-3xl bg-gray-600 text-neutral-200 ">Create a beautiful blog that fits your style. Choose from a selection of easy-to-use templates – all with flexible layouts and hundreds of background images – or design something new!</p>
                        </div>
                        <div className="p-2 w-full flex space-x-32 -mb-40">
                            <p className="h-fit mt-24 p-10 rounded-3xl  bg-neutral-100"><b>Hang onto your memories </b>
                                            Save the moments that matter. Blogger lets you safely store thousands of posts, photos, and more with Google.</p>
                            <img src="https://www.elegantthemes.com/blog/wp-content/uploads/2022/12/Best-Blogging-Platforms-featured-image.png" className="h-1/2 w-full drop-shadow-2xl rounded-lg"/>
                        </div>
                        <div className="p-2 w-1/2 m-auto -mt-16 mb-10">
                        {!authStatus &&
                    (<Link to="/login">
                    <Button>
                        Login
                    </Button>
                    </Link>)
                    }
                        {authStatus && 
                    (<Link to="/all-posts">
                    <Button>
                        All Posts
                    </Button>
                    </Link>
                    )}
                    </div>
                    </div>
                </Container>
            </div>
        )
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
export default Home