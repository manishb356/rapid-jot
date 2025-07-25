export default function PrivacyPolicy() {
	return (
		<div className="min-h-screen text-white p-8 max-w-4xl mx-auto">
			<h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

			<div className="space-y-6 text-gray-300">
				<p>
					This privacy policy explains how Rapid Jot (&quot;we&quot;,
					&quot;us&quot;, or &quot;our&quot;) handles your data.
				</p>

				<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
					Data Collection
				</h2>
				<p>
					We collect and store only the content you explicitly enter
					into our notes. We do not collect any personal information,
					cookies, or tracking data.
				</p>

				<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
					Data Storage
				</h2>
				<p>
					Notes are stored in our database and are accessible to
					anyone with the note&apos;s URL. We do not track who creates
					or accesses notes.
				</p>

				<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
					Data Security
				</h2>
				<p>
					While we implement reasonable security measures, please be
					aware that any content you create is accessible to anyone
					with the URL. Do not store sensitive or personal information
					in your notes.
				</p>

				<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
					Third Parties
				</h2>
				<p>
					We do not share any data with third parties. We do not
					display advertisements or use tracking services.
				</p>

				<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
					Contact
				</h2>
				<p>
					For any privacy concerns, please create an issue on our
					GitHub repository.
				</p>

				<p className="mt-8 text-sm text-gray-500">
					Last updated: {new Date().toLocaleDateString()}
				</p>
			</div>
		</div>
	);
}
