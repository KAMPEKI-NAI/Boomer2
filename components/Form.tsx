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
import Image from "next/image";
import { BsImage } from "react-icons/bs";


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
    const [image, setImage] = useState('');
    const [isLoading, setLoading] = useState(false);

    const onImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
            const result = readerEvent.target?.result;

            if (typeof result === 'string') {
                setImage(result);
            }
        };

        reader.readAsDataURL(file);
    }, []);

    const onSubmit = useCallback(async () => {
        try {
            setLoading(true);

            const url= isComment ? `/api/comments?postId=${postId}`
            : '/api/posts';

            await axios.post(url, { body, image });

            toast.success('Post created');
            setBody('');
            setImage('');
            mutatePosts();
            mutatePost();

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
        }, [body, image, mutatePosts, isComment, postId, mutatePost]);
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
                                w-full
                                bg-black
                                ring-0
                                outline-none
                                text-[20px]
                                placeholder-neutral-500
                                text-white
                            "
                        placeholder={placeholder}
                    ></textarea>
                    {image && !isComment ? (
                        <div className="relative mt-3 aspect-video w-full overflow-hidden rounded-md border border-neutral-800">
                            <Image
                                src={image}
                                alt="Selected post image"
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : null}
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
                    <div className="mt-4 flex flex-row items-center justify-between">
                        {!isComment ? (
                            <label
                                className="
                                    flex
                                    h-10
                                    w-10
                                    cursor-pointer
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-[#c65f32]
                                    transition
                                    hover:bg-[#c65f32]
                                    hover:bg-opacity-10
                                "
                            >
                                <BsImage size={22} />
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    disabled={isLoading}
                                    onChange={onImageChange}
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <div />
                        )}
                        <Button 
                            disabled={isLoading || (!body && !image)}
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
