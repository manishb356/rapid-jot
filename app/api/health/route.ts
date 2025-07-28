import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {
	try {
		// Check database connection
		const { data, error } = await supabase
			.from("notes")
			.select("id")
			.limit(1);

		if (error) {
			throw error;
		}

		return NextResponse.json({
			status: "healthy",
			database: "connected",
			timestamp: new Date().toISOString(),
			version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
		});
	} catch (error) {
		console.error("Health check failed:", error);
		return NextResponse.json(
			{
				status: "unhealthy",
				database: "disconnected",
				error: error instanceof Error ? error.message : "Unknown error",
				timestamp: new Date().toISOString(),
			},
			{ status: 503 }
		);
	}
}
