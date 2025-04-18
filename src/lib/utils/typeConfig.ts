import { KycStatus } from "@/api/kyc";

export type ApiResponseType = {
  status?: number;
  message?: string;
  data?: {
    message?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export type UserType = {
  email: string;
  role: string;
  id: string | null;
  first_name: string | null;
  is_active: boolean;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  profile: string | null;
  [key: string]: unknown;
};

export type UserKycType = {
  id: string | number;
  id_document?: string | null;
  selfie?: string | null;
  status: "pending" | "approved" | "rejected";
  submitted?: boolean;
  reviewed_at?: string | null;
  submitted_at?: string;
  user: UserType;
  [key: string]: unknown;
};

export type KycStatusValue = KycStatus["status"];

export type KycStatusType = {
  pending: string;
  approved: string;
  rejected: string;
};
