import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export function useAuth() {
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else router.push("/");
  };

  const register = async (fullName: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) alert(error.message);
    else router.push("/");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return { login, register, logout };
}
