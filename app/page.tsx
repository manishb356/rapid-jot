"use client";

import { nanoid } from "nanoid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
	const router = useRouter();
	const [customPath, setCustomPath] = useState("");

	const origin = window.location.origin
		.replace("https://", "")
		.replace("http://", "");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const path = customPath.trim() || nanoid(10);
		router.push(`/${path}`);
	};

	return (
		<div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
			<h1 className="text-6xl font-bold mb-4">RAPID JOT</h1>
			<h2 className="text-2xl text-gray-400 mb-16">
				The simplest way to share markdown notes online
			</h2>

			<form
				onSubmit={handleSubmit}
				className="w-full max-w-2xl flex flex-col items-center gap-4"
			>
				<div className="w-full flex">
					<div className="bg-gray-800 text-gray-400 px-4 py-3 rounded-l-lg border-r border-gray-700">
						{origin}/
					</div>
					<input
						type="text"
						value={customPath}
						onChange={(e) => setCustomPath(e.target.value)}
						placeholder="your-secret-page"
						className="flex-1 bg-gray-800 px-4 py-3 outline-none text-white placeholder-gray-500"
					/>
					<button
						type="submit"
						className="bg-gray-800 px-8 py-3 rounded-r-lg hover:bg-gray-700 transition-colors border-l border-gray-700"
					>
						Go!
					</button>
				</div>
			</form>

			<p className="mt-8 text-gray-400">No login required</p>

			<footer className="fixed bottom-0 w-full p-4 text-center text-gray-500">
				<div className="flex justify-center gap-8">
					<Link
						href="/privacy.html"
						className="hover:text-white transition-colors"
					>
						Privacy Policy
					</Link>
					<span>|</span>
					<Link
						href="/cookie.html"
						className="hover:text-white transition-colors"
					>
						Cookie Policy
					</Link>
					<span>|</span>
					<Link
						href="/content.html"
						className="hover:text-white transition-colors"
					>
						Content Policy
					</Link>
				</div>
				<div className="mt-2">
					© {new Date().getFullYear()} Rapid Jot
				</div>
			</footer>
		</div>
	);
}
