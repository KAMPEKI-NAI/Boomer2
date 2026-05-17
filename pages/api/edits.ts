import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

const MAX_IMAGE_LENGTH = 1_500_000;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if (req.method !== "PATCH") {
        res.status(405).json({ message: "Method not allowed" });
        return;
    }

    try {
        const { currentUser } = await serverAuth(req, res);
        const name = req.body.name?.trim();
        const username = req.body.username?.trim();
        const bio = req.body.bio?.trim();
        const profileImage = req.body.profileImage || "";
        const coverImage = req.body.coverImage || "";

        if (!name || !username ) {
            res.status(400).json({ message: "Name and username are required" });
            return;
        }

        if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
            res.status(400).json({ message: "Username must be 3-20 characters and use only letters, numbers, or underscores" });
            return;
        }

        if (profileImage.length > MAX_IMAGE_LENGTH || coverImage.length > MAX_IMAGE_LENGTH) {
            res.status(413).json({ message: "Image is too large. Please choose a smaller image" });
            return;
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        });

        res.status(200).json(updatedUser);
        return;
    } catch (error) {
        console.error(error);

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            res.status(400).json({ message: "This username is already taken" });
            return;
        }

        res.status(500).json({ message: "Could not update profile" });
        return;
    }
}
