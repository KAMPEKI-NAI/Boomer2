import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useSWRConfig } from "swr";

import Model from "../Model";
import Input from "../Input";
import useRegisterModel from "@/hooks/useRegisterModel";
import useLoginModel from "@/hooks/useLoginModel";

const RegisterModel = () => {
    const registerModel = useRegisterModel();
    const loginModel = useLoginModel();
    const { mutate } = useSWRConfig();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) return;

        registerModel.onClose();
        loginModel.onOpen();
    }, [isLoading, registerModel, loginModel]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            const trimmedEmail = email.trim().toLowerCase();
            const trimmedPassword = password.trim();

            await axios.post('/api/register', {
                email: trimmedEmail,
                password: trimmedPassword,
                username: username.trim(),
                name: name.trim()
            });

            toast.success("Account created successfully!");

            const res = await signIn('credentials', {
                email: trimmedEmail,
                password: trimmedPassword,
                redirect: false,
            });

            if (res?.ok) {
                await mutate('/api/current');
                registerModel.onClose();
            } else {
                toast.error(res?.error || "Please sign in with your new account");
                registerModel.onClose();
                loginModel.onOpen();
            }
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something went wrong!");
                return;
            }

            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }, [email, password, username, name, registerModel, loginModel, mutate]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    );

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>
                Already have an account?{" "}
                <span
                    onClick={onToggle}
                    className="text-white cursor-pointer hover:underline"
                >
                    Sign in
                </span>
            </p>
        </div>
    );

    return (
        <Model
            disabled={isLoading}
            isOpen={registerModel.isOpen}
            title="Create an account"
            actionLabel="Register"
            onClose={registerModel.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModel;
