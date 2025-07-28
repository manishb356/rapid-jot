import { NextResponse } from "next/server";
import { rateLimit } from "../../../lib/rateLimit";
import { verifyRecaptcha } from "../../../lib/recaptcha";
import { supabase } from "../../../lib/supabase";

// Rate limit config: 60 requests per minute
const limiter = rateLimit({
	limit: 60,
	windowMs: 60 * 1000, // 1 minute
});

// Get note content
export async function GET(request: Request) {
	// Check rate limit
	const rateLimitResult = await (await limiter)(request);
	if (rateLimitResult) return rateLimitResult;

	const url = new URL(request.url);
	const noteId = url.searchParams.get("id");
	const recaptchaToken = url.searchParams.get("recaptchaToken");

	if (!noteId) {
		return NextResponse.json(
			{ error: "Note ID is required" },
			{ status: 400 }
		);
	}

	if (!recaptchaToken) {
		return NextResponse.json(
			{ error: "reCAPTCHA verification required" },
			{ status: 400 }
		);
	}

	try {
		// Verify reCAPTCHA token
		const recaptchaResult = await verifyRecaptcha(recaptchaToken);
		if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
			return NextResponse.json(
				{ error: "reCAPTCHA verification failed" },
				{ status: 403 }
			);
		}

		const { data, error } = await supabase
			.from("notes")
			.select("content")
			.eq("id", noteId)
			.single();

		if (error) {
			throw error;
		}

		return NextResponse.json({ content: data?.content || "" });
	} catch (error) {
		console.error("Error fetching note:", error);
		return NextResponse.json(
			{ error: "Failed to fetch note" },
			{ status: 500 }
		);
	}
}

// Save note content
export async function POST(request: Request) {
	// Check rate limit
	const rateLimitResult = await (await limiter)(request);
	if (rateLimitResult) return rateLimitResult;

	try {
		const { id, content } = await request.json();

		if (!id) {
			return NextResponse.json(
				{ error: "Note ID is required" },
				{ status: 400 }
			);
		}

		const { error } = await supabase.from("notes").upsert({
			id,
			content,
			updated_at: new Date().toISOString(),
		});

		if (error) {
			throw error;
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error saving note:", error);
		return NextResponse.json(
			{ error: "Failed to save note" },
			{ status: 500 }
		);
	}
}
