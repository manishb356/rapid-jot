"use client";

import { nanoid } from "nanoid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
	const router = useRouter();
	const [customPath, setCustomPath] = useState("");
	const [origin, setOrigin] = useState("");

	useEffect(() => {
		setOrigin(
			window.location.origin
				.replace("https://", "")
				.replace("http://", "")
		);
	}, []);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const path = customPath.trim() || nanoid(10);
		router.push(`/${path}`);
	};

	return (
		<div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 sm:p-6">
			<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
				RAPID JOT
			</h1>
			<h2 className="text-base sm:text-md md:text-lg lg:text-xl text-gray-400 mb-8 sm:mb-12 md:mb-16 text-center px-2">
				The simplest way to share markdown notes online
			</h2>

			<form
				onSubmit={handleSubmit}
				className="w-full max-w-2xl flex flex-col items-center gap-4 px-4"
			>
				<div className="w-full flex flex-row">
					<div className="bg-gray-800 text-gray-400 px-3 sm:px-4 py-3 rounded-l-lg border-r border-gray-700 text-sm max-w-[120px] sm:max-w-[180px] flex-shrink-0 flex items-center overflow-hidden">
						<span className="truncate">{origin}/</span>
					</div>
					<input
						id="customPath"
						type="text"
						value={customPath}
						onChange={(e) => setCustomPath(e.target.value)}
						placeholder="your-secret-page"
						className="flex-1 bg-gray-800 px-4 py-3 outline-none text-white placeholder-gray-500 min-w-0"
					/>
					<button
						type="submit"
						className="bg-gray-800 px-6 sm:px-8 py-3 rounded-r-lg hover:bg-gray-700 transition-colors border-l border-gray-700 whitespace-nowrap flex-shrink-0"
					>
						Go!
					</button>
				</div>
			</form>

			<p className="mt-8 text-gray-400 text-center">No login required</p>

			<footer className="fixed bottom-0 w-full p-4 text-center text-gray-500">
				<div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8 text-sm sm:text-base">
					<Link
						href="/privacy.html"
						className="hover:text-white transition-colors"
					>
						Privacy Policy
					</Link>
					<span className="hidden sm:inline">|</span>
					<Link
						href="/cookie.html"
						className="hover:text-white transition-colors"
					>
						Cookie Policy
					</Link>
					<span className="hidden sm:inline">|</span>
					<Link
						href="/content.html"
						className="hover:text-white transition-colors"
					>
						Content Policy
					</Link>
				</div>
				<div className="mt-2 text-xs sm:text-sm">
					© {new Date().getFullYear()} Rapid Jot
				</div>
			</footer>
		</div>
	);
}
