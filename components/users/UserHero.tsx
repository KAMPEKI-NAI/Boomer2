import Avatar from '../Avatar';
import useUser from '@/hooks/useUser';
import Image from 'next/image';


interface UserHeroProps {
    userId: string;
}


const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
    const { data: fetchedUser } = useUser(userId);

    return (
        <div className="h-40 bg-neutral-800 relative">
            {fetchedUser?.coverImage && (
                <Image 
                    alt="Cover Image"
                    src={fetchedUser.coverImage}
                    fill
                    style={{ objectFit: "cover" }}
                />
            )}
            <div className="absolute -bottom-16 left-4">
                <div className="w-32 h-32 rounded-full border-4 border-black">
                    <Avatar userId={userId} isLarge={true} hasBorder />
                </div>
            </div>
        </div>
    );
}








export default UserHero;