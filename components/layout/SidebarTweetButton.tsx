import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import { useRouter } from "next/router";

import useLoginModel from "@/hooks/useLoginModel";
import useCurrentUser from "@/hooks/useCurrentUser";

const SidebarTweetButton = () => {
    const loginModel = useLoginModel();
    const { data: currentUser } = useCurrentUser();
    const router = useRouter();

    const onClick = useCallback(() =>{
        if (!currentUser) {
            loginModel.onOpen();
            return;
        }

        router.push('/').then(() => {
            document.getElementById('post-composer')?.focus();
        });
    }, [currentUser, loginModel, router]);

    return ( 
        <div onClick={onClick}>
            <div 
            className="
            mt-6
            lg:hidden
            rounded-full
            h-14
            w-14
            p-4
            flex
            items-center
            justify-center
            bg-[#c65f32]
            hover:bg-opacity-80
            transition
            cursor-pointer">
                <FaFeather size={24} color="white"/>
            </div>
            <div
            className="
            mt-6
            hidden
            lg:block
            px-4
            py-2
            rounded-full
            bg-[#c65f32]
            hover:bg-opacity-90
            cursor-pointer
            transition
            ">
                <p className="
                hidden
                lg:block
                text-center
                font-semibold
                text-white
                text-{20px}
                ">
                    Tweet
                </p>

            </div>
        </div>
     );
}
 
export default SidebarTweetButton;
