import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';

import prisma from '@/libs/prismadb';

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    // 1. Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }
    
    try {
        const email = req.body.email?.trim().toLowerCase();
        const username = req.body.username?.trim();
        const name = req.body.name?.trim();
        const password = req.body.password?.trim();

        // 2. Validate input (Prevent bcrypt/prisma from crashing on undefined values)
        if (!email || !username || !password) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        // 3. Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // 4. Attempt to create the user
        const user = await prisma.user.create({
            data: {
                email, 
                username,
                name,
                hashedPassword,
            }
        });

        res.status(200).json(user);
        return;

    } catch (error) {
        console.error("REGISTRATION_ERROR:", error);

        // 5. Handle Prisma specific errors (like the P2002 Unique Constraint)
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                // Determine if it was the email or username that failed
                const target = (error.meta?.target as string[]) || [];
                
                if (target.includes('email')) {
                    res.status(400).json({ message: 'This email is already registered' });
                    return;
                }
                if (target.includes('username')) {
                    res.status(400).json({ message: 'This username is already taken' });
                    return;
                }

                res.status(400).json({ message: 'A user with these details already exists' });
                return;
            }
        }

        // 6. Generic error fallback
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
}
