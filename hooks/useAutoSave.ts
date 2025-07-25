import { useCallback, useEffect, useState } from "react";

export function useAutoSave(noteId: string, initialContent: string = "") {
	const [content, setContent] = useState(initialContent);
	const [lastSavedContent, setLastSavedContent] = useState(initialContent);
	const [isSaving, setIsSaving] = useState(false);

	const saveContent = useCallback(async () => {
		if (content === lastSavedContent) return;

		setIsSaving(true);
		try {
			const response = await fetch("/api/notes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: noteId,
					content,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to save note");
			}

			setLastSavedContent(content);
		} catch (error) {
			console.error("Error saving note:", error);
		} finally {
			setIsSaving(false);
		}
	}, [content, lastSavedContent, noteId]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (content !== lastSavedContent) {
				saveContent();
			}
		}, 2000); // Save after 2 seconds of no changes

		return () => clearTimeout(timer);
	}, [content, lastSavedContent, saveContent]);

	return {
		content,
		setContent,
		isSaving,
	};
}
