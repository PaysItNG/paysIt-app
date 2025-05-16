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

export type NetworkType = "MTN" | "AIRTEL" | "GLO" | "ETISALAT" | "";

export type UtilityViews = "airtime" | "data" | "cable" | "electricity";

export type CurrencyType =
  | "NGN"
  | "USD"
  | "EUR"
  | "GBP"
  | "KES"
  | "GHS"
  | "XAF"
  | "XOF"
  | "JPY"
  | "INR"
  | "BRL"
  | "AUD"
  | "CAD"
  | "CHF"
  | "CNY"
  | "SEK"
  | "NZD"
  | "SGD"
  | "HKD"
  | "NOK"
  | "MXN"
  | "ZAR"
  | "";

export type DataPlanType = {
  price: string | number;
  provider_price?: string | number;
  provider?: string;
  plan_id?: string;
  service_id?: string;
  network?: string;
  name: string;
  duration?: string;
  qty: string;
  service?: string;
  displayName?: string;
  value?: string;
};

export type PreviewDataType = {
  key: string;
  label: string;
  value: string | number;
  product_img?: string;
};
