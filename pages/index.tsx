import Header from "@/components/Header";
import Form from "@/components/Form";
import PostFeed from "@/components/posts/PostFeed";
import WelcomeScreen from "@/components/WelcomeScreen";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const { data: currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center py-20">
        <ClipLoader color="#c65f32" size={56} />
      </div>
    );
  }

  if (!currentUser) {
    return <WelcomeScreen />;
  }

  return(
    <>
    <Header label="Home"/>
    <Form placeholder="What's happening?"/>
    <PostFeed />
    </>
  )
}
