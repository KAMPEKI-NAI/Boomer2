import { useCallback } from "react";
import { useRouter } from "next/router";
import { BsBellFill, BsDot, BsHouseFill } from "react-icons/bs";
import { FaFeather, FaUser } from "react-icons/fa";
import { IconType } from "react-icons";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModel from "@/hooks/useLoginModel";

interface MobileNavigationItemProps {
    icon: IconType;
    label: string;
    alert?: boolean;
    onClick: () => void;
}

const MobileNavigationItem: React.FC<MobileNavigationItemProps> = ({
    icon: Icon,
    label,
    alert,
    onClick,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className="
                relative
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                text-white
                transition
                hover:bg-neutral-800
            "
        >
            <Icon size={20} />
            {alert ? <BsDot className="absolute -top-5 left-0 text-[#c65f32]" size={64} /> : null}
        </button>
    );
};

const MobileNavigation = () => {
    const router = useRouter();
    const loginModel = useLoginModel();
    const { data: currentUser } = useCurrentUser();

    const goToProtectedRoute = useCallback((href: string) => {
        if (!currentUser) {
            loginModel.onOpen();
            return;
        }

        router.push(href);
    }, [currentUser, loginModel, router]);

    const goToComposer = useCallback(() => {
        if (!currentUser) {
            loginModel.onOpen();
            return;
        }

        router.push("/").then(() => {
            document.getElementById("post-composer")?.focus();
        });
    }, [currentUser, loginModel, router]);

    return (
        <nav
            className="
                fixed
                bottom-0
                left-0
                right-0
                z-40
                border-t
                border-neutral-800
                bg-black
                px-4
                pb-[env(safe-area-inset-bottom)]
                md:hidden
            "
        >
            <div className="mx-auto flex h-16 max-w-xl items-center justify-between">
                <MobileNavigationItem icon={BsHouseFill} label="Home" onClick={() => router.push("/")} />
                <MobileNavigationItem
                    icon={BsBellFill}
                    label="Notifications"
                    alert={currentUser?.hasNotification}
                    onClick={() => goToProtectedRoute("/notifications")}
                />
                <MobileNavigationItem
                    icon={FaUser}
                    label="Profile"
                    onClick={() => goToProtectedRoute(`/users/${currentUser?.id}`)}
                />
                <MobileNavigationItem icon={FaFeather} label="Post" onClick={goToComposer} />
            </div>
        </nav>
    );
};

export default MobileNavigation;
