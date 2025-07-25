export default function CookiePolicy() {
	return (
		<div className="min-h-screen text-white p-8 max-w-4xl mx-auto">
			<h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>

			<div className="space-y-6 text-gray-300">
				<p>
					Rapid Jot does not use any cookies or similar tracking
					technologies.
				</p>

				<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
					No Tracking
				</h2>
				<p>
					We believe in privacy and simplicity. Our service functions
					without the need for cookies or any other tracking
					mechanisms.
				</p>

				<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
					Third-Party Services
				</h2>
				<p>
					We do not integrate with any third-party services that might
					set cookies on your device.
				</p>

				<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
					Browser Settings
				</h2>
				<p>
					Since we do not use cookies, there is no need to adjust your
					browser settings for our service.
				</p>

				<p className="mt-8 text-sm text-gray-500">
					Last updated: {new Date().toLocaleDateString()}
				</p>
			</div>
		</div>
	);
}
