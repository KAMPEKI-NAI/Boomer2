import React, { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import useLoginModel from '@/hooks/useLoginModel';
import useRegisterModel from '@/hooks/useRegisterModel';
import Button from './Button';
import Avatar from './Avatar';
import usePost from "@/hooks/usePost";


interface FormProps {
    placeholder: string;
    isComment?: boolean;
    postId?: string;
}

const Form: React.FC<FormProps> = ({ 
    placeholder, 
    isComment, 
    postId 
}) => {
    const registerModel = useRegisterModel();
    const loginModel = useLoginModel();

    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts();
    const { mutate: mutatePost } = usePost(postId as string);

    const [body, setBody] = useState('');
    const [isLoading, setLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        console.log("button");
        try {
            setLoading(true);

            const url= isComment ? `/api/comments?postId=${postId}`
            : '/api/posts';

            await axios.post(url, { body });

            toast.success('Post created');
            setBody('');
            mutatePosts();
            mutatePost();

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
        }, [body, mutatePosts, isComment, postId, mutatePost]);
return ( 
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
        {currentUser ? (
            <div className="flex flex-row gap-4">
                <div>
                    <Avatar userId={currentUser?.id} />
                </div>
                <div className="w-full">
                    <textarea
                            disabled={isLoading}
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                            className="
                                peer
                                resize-none
                                mt-3
                                w-ful
                                bg-black
                                ring-0
                                outline-none
                                text-[20px]
                                placeholder-neutral-500
                                text-white
                            "
                        placeholder={placeholder}
                    ></textarea>
                    <hr
                        className="
                            opacity-0
                            peer-focus:opacity-100
                            h-[1px]
                            w-full
                            border-neutral-800
                            transition
                        "
                    />
                    <div className="mt-4 flex flex-row justify-end">
                        <Button 
                            disabled={isLoading || !body}
                            onClick={onSubmit}
                            label="Post"    
                        />
                    </div>
                </div>
            </div>
        ) : (
            <div className="py-8">
                <h1 className="text-white text-2xl text-center mb-4 font-bold">
                    Welcome to Boomer
                </h1>
                <div className='flex flex-row items-center justify-center :gap-4'>
                    <Button label= "Login" onClick={loginModel.onOpen} />
                    <Button 
                        label="Register"
                        onClick={registerModel.onOpen}
                        secondary
                    />
                </div>
            </div>
        )}
    </div> 
    );
}
 
export default Form;