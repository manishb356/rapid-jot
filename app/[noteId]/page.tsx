// @ts-nocheck
"use client";
import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useState } from "react";
import CopyableText from "../../components/CopyableText";
import { useAutoSave } from "../../hooks/useAutoSave";
import styles from "../styles.module.css";

const MDEditor = dynamic(
	() => import("@uiw/react-md-editor").then((mod) => mod.default),
	{ ssr: false }
);

interface PageProps {
	params: Promise<{ noteId: string }>;
}

declare global {
	interface Window {
		grecaptcha: {
			ready: (callback: () => void) => void;
			execute: (
				siteKey: string,
				options: { action: string }
			) => Promise<string>;
		};
	}
}

async function getInitialContent(noteId: string, recaptchaToken: string) {
	try {
		const response = await fetch(
			`/api/notes?id=${noteId}&recaptchaToken=${recaptchaToken}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch note");
		}
		const data = await response.json();
		return data.content;
	} catch (error) {
		console.error("Error fetching note:", error);
		return "";
	}
}

export default function NotePage({ params }: PageProps) {
	const { noteId } = React.use(params);
	const { content, setContent, isSaving } = useAutoSave(noteId);
	const [showSaving, setShowSaving] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (isSaving) {
			setShowSaving(true);
		} else {
			const timer = setTimeout(() => {
				setShowSaving(false);
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [isSaving]);

	useEffect(() => {
		// Load reCAPTCHA script
		const script = document.createElement("script");
		script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
		script.async = true;
		script.defer = true;

		script.onload = () => {
			// Initialize content loading after script is loaded
			const loadContent = async () => {
				try {
					await window.grecaptcha.ready(async () => {
						const token = await window.grecaptcha.execute(
							process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
							{ action: "load_note" }
						);

						const initialContent = await getInitialContent(
							noteId,
							token
						);
						setContent(initialContent);
						setIsLoading(false);
					});
				} catch (e) {
					setError(
						"Failed to verify human user. Please refresh the page."
					);
					console.error(e);
					setIsLoading(false);
				}
			};

			loadContent();
		};

		script.onerror = () => {
			setError(
				"Failed to load verification script. Please refresh the page."
			);
			setIsLoading(false);
		};

		document.head.appendChild(script);

		return () => {
			document.head.removeChild(script);
		};
	}, [noteId, setContent]);

	if (error) {
		return (
			<div className="min-h-screen bg-black text-white flex items-center justify-center">
				<div className="bg-red-900/50 p-4 rounded-lg text-center">
					<p className="text-xl">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="mt-4 px-4 py-2 bg-red-800 rounded hover:bg-red-700 transition-colors"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="min-h-screen bg-black text-white flex items-center justify-center">
				<div className="text-xl">Verifying human user...</div>
			</div>
		);
	}

	return (
		<div data-color-mode="dark" className="min-h-screen bg-black relative">
			{showSaving && (
				<div className="fixed top-4 right-4 bg-gray-800 text-gray-300 px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-2">
					<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
					Saving...
				</div>
			)}
			<Suspense
				fallback={
					<div className="text-gray-300">Loading editor...</div>
				}
			>
				<div className={styles.editor}>
					<MDEditor
						value={content}
						onChange={(value) => setContent(value || "")}
						height={
							typeof window !== "undefined"
								? window.innerHeight
								: undefined
						}
						preview="live"
						extraCommands={[]}
						visibleDragbar={false}
						previewOptions={{
							components: {
								code: ({
									children,
								}: {
									children: React.ReactNode;
								}) => <CopyableText>{children}</CopyableText>,
							},
						}}
					/>
				</div>
			</Suspense>
		</div>
	);
}
