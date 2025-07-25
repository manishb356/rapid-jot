"use client";

import React, { useState } from "react";

interface CopyableTextProps {
	children: React.ReactNode;
}

export default function CopyableText({ children }: CopyableTextProps) {
	const [showCopied, setShowCopied] = useState(false);

	const handleClick = async () => {
		if (typeof children === "string") {
			try {
				await navigator.clipboard.writeText(children);
				setShowCopied(true);
				setTimeout(() => setShowCopied(false), 500); // Hide after 0.5 seconds
			} catch (err) {
				console.error("Failed to copy:", err);
			}
		}
	};

	return (
		<>
			{showCopied && (
				<div className="fixed top-4 right-4 bg-gray-800 text-gray-300 px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-2">
					<div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
					Copied!
				</div>
			)}
			<span
				onClick={handleClick}
				className="cursor-pointer inline-block px-1 py-0.5 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
				title="Click to copy"
			>
				{children}
			</span>
		</>
	);
}
