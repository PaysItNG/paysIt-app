"use client";
import Button from "@/components/shared/ui/Button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

type PropType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const GoogleAuthProviderButton = ({ isLoading, setIsLoading }: PropType) => {
  const handleSignInWithGoogle = async () => {
    setIsLoading(true);
    signIn("google");
  };
  return (
    <>
      <Button
        variant={"bordered"}
        onPress={handleSignInWithGoogle}
        isLoading={isLoading}
        className="w-full"
      >
        <FcGoogle size={25} />
        Signin with Google
      </Button>
    </>
  );
};

export default GoogleAuthProviderButton;
