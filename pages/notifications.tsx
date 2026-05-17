import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";

import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if(!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    return {
        props: {
            session
        }
    }
}

const Notifications = () => {
    return ( 
        <>
            <Header label="Notifications" showBackArrow />
            <NotificationsFeed />
        </>
     );
}
 
export default Notifications;
