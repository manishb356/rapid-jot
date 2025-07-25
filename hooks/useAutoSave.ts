import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useAutoSave(noteId: string, initialContent: string = "") {
	const [content, setContent] = useState(initialContent);
	const [lastSavedContent, setLastSavedContent] = useState(initialContent);
	const [isSaving, setIsSaving] = useState(false);

	const saveContent = useCallback(async () => {
		if (content === lastSavedContent) return;

		setIsSaving(true);
		try {
			const { error } = await supabase.from("notes").upsert({
				id: noteId,
				content,
				updated_at: new Date().toISOString(),
			});

			if (error) throw error;
			setLastSavedContent(content);
		} catch (error) {
			console.error("<><>Error saving note:", error);
		} finally {
			console.log("<><>Saving complete");
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
