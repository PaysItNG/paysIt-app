"use client";
import Button from "@/components/shared/ui/Button";
import { signIn } from "next-auth/react";

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
      <Button onPress={handleSignInWithGoogle} isLoading={isLoading}>
        Signin with Google
      </Button>
    </>
  );
};

export default GoogleAuthProviderButton;
