export const formatInitial = (firstWord: string | null, lastWord?: string) => {
  if (!firstWord) return "";
  return `${firstWord?.trim()[0] || ""}${
    lastWord?.trim()[0] || ""
  }`?.toUpperCase();
};
