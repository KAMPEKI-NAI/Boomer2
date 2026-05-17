import Button from "./Button";
import BrandCloud from "./BrandCloud";
import useLoginModel from "@/hooks/useLoginModel";
import useRegisterModel from "@/hooks/useRegisterModel";

const WelcomeScreen = () => {
    const loginModel = useLoginModel();
    const registerModel = useRegisterModel();

    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-14 text-center">
            <BrandCloud size={88} />
            <h1 className="mt-6 text-4xl font-bold text-white">
                Welcome to Boomer
            </h1>
            <p className="mt-3 max-w-sm text-base text-neutral-400">
                Join the conversation, follow people you care about, and share what is happening.
            </p>
            <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
                <Button label="Create account" onClick={registerModel.onOpen} fullwidth large />
                <Button label="Login" onClick={loginModel.onOpen} secondary fullwidth large />
            </div>
        </div>
    );
};

export default WelcomeScreen;
