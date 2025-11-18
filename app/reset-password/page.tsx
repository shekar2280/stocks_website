import ResetPasswordForm from "@/components/ResetPasswordForm";

export default async function Page({ searchParams }: { searchParams: { token?: string } }) {

  const params = await searchParams;
  const token = params.token || ""; 

  return <ResetPasswordForm token={token} />;
}
