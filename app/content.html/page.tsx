export default function ContentPolicy() {
	return (
		<div className="min-h-screen text-white p-8 max-w-4xl mx-auto">
			<h1 className="text-4xl font-bold mb-8">Content Policy</h1>

			<div className="space-y-6 text-gray-300">
				<p>
					This content policy outlines what types of content are
					allowed on Rapid Jot.
				</p>

				<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
					Prohibited Content
				</h2>
				<p>The following types of content are not allowed:</p>
				<ul className="list-disc pl-6 space-y-2">
					<li>Illegal content of any kind</li>
					<li>Malicious code or harmful scripts</li>
					<li>Personal or sensitive information</li>
					<li>Spam or automated content</li>
					<li>Content that violates third-party rights</li>
				</ul>

				<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
					Content Removal
				</h2>
				<p>
					We reserve the right to remove any content that violates
					this policy without notice. Notes containing prohibited
					content may be deleted.
				</p>

				<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
					Reporting Content
				</h2>
				<p>
					If you find content that violates this policy, please report
					it through our GitHub repository or you can go ahead and
					remove it yourself.
				</p>

				<h2 className="text-2xl font-semibold text-white mt-8 mb-4">
					Responsibility
				</h2>
				<p>
					Users are responsible for the content they create. Rapid Jot
					is not responsible for user-generated content.
				</p>

				<p className="mt-8 text-sm text-gray-500">
					Last updated: {new Date().toLocaleDateString()}
				</p>
			</div>
		</div>
	);
}
