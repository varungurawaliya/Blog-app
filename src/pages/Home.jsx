import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, LoadingScreen, PostCard} from '../components/Index'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const loggedin = useSelector((state) => state.auth.status)

    useEffect(() => {

        setLoading(true)
        
        appwriteService.getPosts().then((posts) => {

            if (posts) 
                setPosts(posts.documents)
            
        }).finally(()=> setLoading(false))

    }, [])
  
    if (posts.length === 0 && !loggedin) {

        return loading ? <LoadingScreen/> :  
        (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">

                            <Link to='/login'>
                            <h1 className="text-2xl font-bold hover:text-gray-500 underline">
                                Please Login to Continue....
                            </h1>
                            </Link>

                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return loading ? <LoadingScreen/> : (

        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>

                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                    
                </div>
            </Container>
        </div>
    )
}

export default Home