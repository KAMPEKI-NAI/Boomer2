import { useCallback, useEffect, useState } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModel from "@/hooks/useEditModel";
import useUser from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import axios from "axios";
import Model from "../Model";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModel = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModel = useEditModel();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [coverImage, setCoverImage] = useState("");

    useEffect(() => {
        setName(currentUser?.name || "");
        setUsername(currentUser?.username || "");
        setBio(currentUser?.bio || "");
        setProfileImage(currentUser?.profileImage || "");
        setCoverImage(currentUser?.coverImage || "");
    },[currentUser]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.patch('/api/edits', {
                name,
                username,
                bio,
                profileImage,
                coverImage
            });
            mutateFetchedUser();

            toast.success("Updated");
            
            editModel.onClose();
        }catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }, [name, username, bio, profileImage, coverImage, mutateFetchedUser, editModel]);

    const bodyContent = (
            <div className="flex flex-col gap-4">
                <ImageUpload
                    value={profileImage}
                    onChange={(image) => setProfileImage(image)}
                    label="Upload profile image"
                    disabled={isLoading}
                />
                <ImageUpload
                    value={coverImage}
                    onChange={(image) => setCoverImage(image)}
                    label="Upload cover image"
                    disabled={isLoading}
                />
                <Input
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    disabled={isLoading}
                />
                <Input
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    disabled={isLoading}
                />
                <Input
                    placeholder="Bio"
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                    disabled={isLoading}
                />
                    
            </div>
    )

    return ( 
        <Model
            disabled={isLoading}
            isOpen={editModel.isOpen}
            title="Edit your profile"
            actionLabel="Save"
            onClose={editModel.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            />
     );
}
 
export default EditModel;