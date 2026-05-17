import CommentItem from "./CommentItem";

type Comment = {
    id: string;
    body: string;
    createdAt?: string | null;
    user: {
        id: string;
        name: string;
        username: string;
    };
} & Record<string, unknown>;

interface CommentFeedProps {
    comments?: Comment[];
};

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {

    return ( 
        <>
            {comments.map((comment) => (
                <CommentItem key={comment.id} data={comment}/>
            ))}
        </>
     );
}
 
export default CommentFeed;