import { useRouter } from "next/router"
import { BsCloudFill } from "react-icons/bs"
const SidebarLogo = () => {
    const router = useRouter();
    return ( 
        <div
        onClick={() => router.push('/')}
         className="
            rounded-full
            h-14
            w-14
            p-4
            flex
            items-center
            justify-center
            hover:bg-[#c65f32]
            hover:bg-opacity-10
            cursor-position
            transition"
        >
            <BsCloudFill size={22} color="white"/>
        </div>
     );
}
 
export default SidebarLogo;
