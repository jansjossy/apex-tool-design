"use my-server-actions"; // standard directive
"use server";

import { getPortfolioData, savePortfolioData, PortfolioData } from "@/lib/db";

// Fetch data
export async function fetchPortfolioData(): Promise<PortfolioData> {
  return await getPortfolioData();
}

// Save data
export async function updatePortfolioData(data: PortfolioData): Promise<boolean> {
  return await savePortfolioData(data);
}

// Verify admin password
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const expectedPassword = process.env.ADMIN_PASSWORD || "apex-precision-2026";
  return password === expectedPassword;
}
