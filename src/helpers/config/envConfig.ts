export const getBaseUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://ffp-backend-eosin.vercel.app/api/v1"
  );
};
