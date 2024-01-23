import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { Container, LoadingScreen, PostCard } from '../components/Index'
import appwriteService from "../appwrite/config";
import { Query } from 'appwrite'

function YourPosts() {

    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData)
    const [loading, setLoading] = useState(true)
    
    appwriteService.getPosts([Query.equal("userId", userData.$id)]).then((posts) => {

        if (posts) 
            setPosts(posts.documents)
        
        setLoading(false)
    })

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

export default YourPosts