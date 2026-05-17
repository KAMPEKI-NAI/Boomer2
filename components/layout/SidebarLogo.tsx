import { useRouter } from "next/router"
import BrandCloud from "../BrandCloud";

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
            cursor-pointer
            transition"
        >
            <BrandCloud size={30} />
        </div>
     );
}
 
export default SidebarLogo;
