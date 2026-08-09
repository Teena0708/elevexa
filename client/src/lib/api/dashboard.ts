import type { DashboardData } from "@/lib/types/dashboard";
import { mockDashboardData } from "@/lib/data/mockDashboard";

// ============================================================
// Dashboard data layer.
//
// Every component reads dashboard data through getDashboardData().
// Nothing outside this file knows whether the data came from the
// mock object or the live API — so wiring up the real backend is
// a one-function change.
//
// Backend contract (existing Express API):
//   GET http://localhost:5000/api/v1/dashboard/stats
//   -> { success: boolean, data: DashboardStats }
//
// Once the other dashboard endpoints (performance history, recent
// interviews, resume health, progress, AI insight) exist, extend
// this function to fetch each and merge them into DashboardData.
// ============================================================

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export class DashboardApiError extends Error {}

export async function getDashboardData(): Promise<DashboardData> {
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK_DASHBOARD !== "false";

  if (useMock) {
    // Simulate network latency in dev so loading states are visible.
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockDashboardData;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/dashboard/stats`, {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new DashboardApiError(`Dashboard request failed: ${res.status}`);
    }

    const json = await res.json();

    if (!json.success) {
      throw new DashboardApiError("Dashboard request returned success=false");
    }

    // TODO: once additional endpoints exist, fetch + merge them here.
    // For now the stats response is merged over the mock shape so the
    // rest of the UI keeps working while the backend is completed.
    return {
      ...mockDashboardData,
      stats: json.data,
    };
  } catch (err) {
    if (err instanceof DashboardApiError) throw err;
    throw new DashboardApiError("Unable to reach the dashboard API");
  }
}
