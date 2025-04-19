"use client";
import { useUserProfile } from "@/api/profile";
import { useMemo } from "react";
import { useMount } from "react-use";
import useAuthUser from "./useAuthUser";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/lib/routes";

interface UserProfile {
  first_name?: string;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  profile_picture?: string | null;
  address?: string | null;
  bvn?: string | null;
  city?: string | null;
  country?: string | null;
  date_of_birth?: string | null;
  tier?: string | null;
  utility_bill?: string | null;
  state?: string | null;
  phone_number?: string | null;
  [key: string]: unknown; // Add other fields as needed
  user?: UserProfile;
}

export const useProfile = () => {
  // const [profileData, setprofileData] = useState<UserProfile | null>(null);
  const { data: getProfileData, error, refetch } = useUserProfile();
  const { removeAuthUser } = useAuthUser();
  const router = useRouter();

  const profileData: UserProfile | null = useMemo(() => {
    if (!getProfileData?.data) return null;

    const data = getProfileData.data;
    return {
      first_name: data.first_name as string,
      last_name: data.last_name as string,
      user: data?.user as UserProfile,
      ...data, // Include other fields if needed
    };
  }, [getProfileData]);

  const reloadUser = async () => {
    await refetch();
  };

  useMount(() => {
    if (!profileData) {
      reloadUser();
    }
  });

  const logoutUser = () => {
    removeAuthUser();
    router.push(APP_ROUTES.LOGIN);
  };

  return {
    profileData,
    error,
    reloadUser,
    logoutUser,
  };
};
