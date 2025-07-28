export async function verifyRecaptcha(token: string) {
	try {
		const response = await fetch(
			`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
			{
				method: "POST",
			}
		);

		const data = await response.json();
		return {
			success: data.success,
			score: data.score,
			error: data["error-codes"]?.[0],
		};
	} catch (error) {
		console.error("reCAPTCHA verification failed:", error);
		return {
			success: false,
			score: 0,
			error: "verification-failed",
		};
	}
}
