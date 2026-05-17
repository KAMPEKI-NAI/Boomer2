import usePosts from "@/hooks/usePosts";
import PostItem from './PostItem';
interface PostFeedProps {
    userId?: string;
}

type Post = {
    id: string;
    body: string;
    createdAt?: string | Date;
    user: {
        id: string;
        name: string;
        username: string;
    };
    comments?: unknown[];
    likedIds: string[];
}

const PostFeed:React.FC<PostFeedProps> = ({ userId }) => {
    const { data: posts = []} = usePosts(userId);

    return ( 
        <>
            {posts.map((post: Post) => (
                <PostItem
                    userId={userId}
                    key={post.id}
                    data={post}
                />
            ))}
        </>
     );
}
 
export default PostFeed;
