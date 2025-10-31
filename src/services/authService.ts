export async function registerUser(fullName: string, email: string, password: string) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ fullName, email, password }),
  });
  return res.json();
}

export async function loginUser(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}
