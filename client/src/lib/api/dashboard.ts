import type { DashboardData } from "@/lib/types/dashboard";
import { mockDashboardData } from "@/lib/data/mockDashboard";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export class DashboardApiError extends Error {}

export async function getDashboardData(
  token?: string
): Promise<DashboardData> {
  const useMock =
    process.env.NEXT_PUBLIC_USE_MOCK_DASHBOARD !== "false";

  if (useMock) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockDashboardData;
  }

  try {
    if (!token) {
      throw new DashboardApiError("Authentication token is missing");
    }

    const res = await fetch(
      `${API_BASE_URL}/api/v1/dashboard/stats`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new DashboardApiError(
        `Dashboard request failed: ${res.status}`
      );
    }

    const json = await res.json();

    if (!json.success) {
      throw new DashboardApiError(
        json.message || "Dashboard request failed"
      );
    }

    return {
      ...mockDashboardData,
      stats: json.data,
    };
  } catch (err) {
    if (err instanceof DashboardApiError) {
      throw err;
    }

    throw new DashboardApiError(
      "Unable to reach the dashboard API"
    );
  }
}