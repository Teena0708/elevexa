const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export async function loginUser(
  email: string,
  password: string
) {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || "Login failed");
  }

  return json.data;
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || "Registration failed");
  }

  return json.data;
}