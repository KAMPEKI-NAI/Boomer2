import {BsHouseFill, BsBellFill} from "react-icons/bs"
import {FaUser} from "react-icons/fa"
import SidebarLogo from "./SidebarLogo"
import SidebarItem from "./SidebarItem"
import {BiLogOut} from "react-icons/bi"
import SidebarTweetButton from "./SidebarTweetButton"
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { useSWRConfig } from "swr";

const Sidebar = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate } = useSWRConfig();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        await mutate('/api/current', null, { revalidate: false });
    };

    const items = [
        {label: 'Home',
        href: '/',
        icon: BsHouseFill
    },
    {label: 'Notifications',
        href: '/notifications',
        icon: BsBellFill,
        auth: true,
        alert: currentUser?.hasNotification,
    },
    {label: 'Profile',
        href: `/users/${currentUser?.id}`,
        icon: FaUser,
        auth: true
    },
];
    return ( 
        <div className="hidden h-full pr-4 md:col-span-1 md:block md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                   <SidebarLogo/> 
                   {items.map((item) =>(
                    <SidebarItem
                        key= {item.href}
                        href= {item.href}
                        label= {item.label}
                        icon= {item.icon}
                        auth= {item.auth}
                        alert={item.alert}
                    />
                   ))}
                    {currentUser && (
                   <SidebarItem onClick={handleLogout} icon={BiLogOut} label= "Logout"/>
                    )}
                    <SidebarTweetButton/>
                </div>
            </div>
        </div>
     );
}
 
export default Sidebar;
