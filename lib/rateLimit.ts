import { NextResponse } from "next/server";

interface RateLimitConfig {
	limit: number; // Number of requests
	windowMs: number; // Time window in milliseconds
}

const ipRequests = new Map<string, { count: number; resetTime: number }>();

export async function rateLimit(config: RateLimitConfig) {
	return async function rateLimiter(request: Request) {
		const ip =
			request.headers.get("x-forwarded-for")?.split(",")[0] ||
			request.headers.get("x-real-ip") ||
			"unknown";
		const now = Date.now();

		// Clean up old entries
		for (const [key, value] of ipRequests.entries()) {
			if (value.resetTime < now) {
				ipRequests.delete(key);
			}
		}

		const currentRequests = ipRequests.get(ip);

		if (!currentRequests) {
			// First request from this IP
			ipRequests.set(ip, {
				count: 1,
				resetTime: now + config.windowMs,
			});
			return null;
		}

		if (currentRequests.resetTime < now) {
			// Reset window has passed
			ipRequests.set(ip, {
				count: 1,
				resetTime: now + config.windowMs,
			});
			return null;
		}

		if (currentRequests.count >= config.limit) {
			// Rate limit exceeded
			const retryAfter = Math.ceil(
				(currentRequests.resetTime - now) / 1000
			);
			return NextResponse.json(
				{ error: "Too many requests" },
				{
					status: 429,
					headers: {
						"Retry-After": retryAfter.toString(),
						"X-RateLimit-Limit": config.limit.toString(),
						"X-RateLimit-Remaining": "0",
						"X-RateLimit-Reset": Math.ceil(
							currentRequests.resetTime / 1000
						).toString(),
					},
				}
			);
		}

		// Increment request count
		currentRequests.count += 1;
		ipRequests.set(ip, currentRequests);
		return null;
	};
}
