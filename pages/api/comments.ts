import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req, res);
        const { body } = req.body;
        const { postId } = req.query;

        if (!postId || typeof postId !== 'string' ) {
            throw new Error('Invalid Id');
        }

        if (!body || typeof body !== 'string' || !body.trim()) {
            throw new Error('Missing body');
        }

        const comment = await prisma.comment.create({
            data: {
                body: body.trim(),
                userId: currentUser.id,
                postId
            }
        });
        try {
            const actorName = currentUser.name || currentUser.username || 'Someone';
            const post = await prisma.post.findUnique({
                where: {
                    id: postId
                }
            });

            if (post?.userId && post.userId !== currentUser.id) {
                await prisma.notification.create({
                    data: {
                        body: `${actorName} replied to your post`,
                        userId: post.userId
                    }
                });

                await prisma.user.update({
                    where: {
                        id: post.userId
                    },
                    data: {
                        hasNotification: true
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    


        return res.status(200).json(comment);

    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}
