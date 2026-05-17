import useLoginModel from "@/hooks/useLoginModel";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";

import Model from "../Model";
import useRegisterModel from "@/hooks/useRegisterModel";
import Input from "../Input";

const LoginModel = () => {
  const loginModel = useLoginModel();
  const registerModel = useRegisterModel();
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    loginModel.onClose();
    registerModel.onOpen();
  }, [isLoading, registerModel, loginModel]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      const res = await signIn('credentials', {
        email: trimmedEmail,
        password: trimmedPassword,
        redirect: false,
      });

      if (res?.ok) {
        await mutate('/api/current');
        loginModel.onClose();
        router.push("/");
        toast.success("Signed in");
      } else {
        toast.error(res?.error || "Invalid credentials");
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [loginModel, email, password, router, mutate]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
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
        First time using Boomer?
        <span
          onClick={onToggle}
          className="
            text-white
            cursor-pointer
            hover:underline
          "
        >
          {" "}Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Model
      disabled={isLoading}
      isOpen={loginModel.isOpen}
      title="Login"
      actionLabel="Sign-in"
      onClose={loginModel.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModel;
