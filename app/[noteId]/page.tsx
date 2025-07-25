"use client";
import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useState } from "react";
import CopyableText from "../../components/CopyableText";
import { useAutoSave } from "../../hooks/useAutoSave";
import { supabase } from "../../lib/supabase";
import styles from "../styles.module.css";

const MDEditor = dynamic(
	() => import("@uiw/react-md-editor").then((mod) => mod.default),
	{ ssr: false }
);

interface PageProps {
	params: {
		noteId: string;
	};
}

async function getInitialContent(noteId: string) {
	const { data, error } = await supabase
		.from("notes")
		.select("content")
		.eq("id", noteId)
		.single();

	if (error && error.code !== "PGRST116") {
		// PGRST116 is "not found" error
		console.error("Error fetching note:", error);
		throw error;
	}

	return data?.content || "";
}

export default function NotePage({ params }: PageProps) {
	// @ts-expect-error - params is not typed
	const { noteId } = React.use<{ noteId: string }>(params);
	const { content, setContent, isSaving } = useAutoSave(noteId);
	const [showSaving, setShowSaving] = useState(false);

	useEffect(() => {
		if (isSaving) {
			setShowSaving(true);
		} else {
			// Keep showing the indicator for 2 seconds after saving is complete
			const timer = setTimeout(() => {
				setShowSaving(false);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [isSaving]);

	useEffect(() => {
		const loadContent = async () => {
			try {
				const initialContent = await getInitialContent(noteId);
				setContent(initialContent);
			} catch (error) {
				console.error("Error loading content:", error);
			}
		};
		loadContent();
	}, [noteId, setContent]);

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
						style={{
							backgroundColor: "black",
						}}
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
