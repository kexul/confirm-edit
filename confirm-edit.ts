/**
 * Confirm Edit Extension
 *
 * Prompts for confirmation before applying edit tool calls.
 * Options: Accept (this edit), Always (all edits in session), Esc (reject)
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { isToolCallEventType } from "@mariozechner/pi-coding-agent";

let alwaysAccept = false;

export default function (pi: ExtensionAPI) {
	// Reset state on session start
	pi.on("session_start", async () => {
		alwaysAccept = false;
	});

	pi.on("tool_call", async (event, ctx) => {
		// Only intercept edit tool calls
		if (!isToolCallEventType("edit", event)) {
			return undefined;
		}

		// In non-interactive mode, block by default
		if (!ctx.hasUI) {
			return { block: true, reason: "Edit blocked (no UI for confirmation)" };
		}

		// If already set to always accept, proceed without dialog
		if (alwaysAccept) {
			return undefined;
		}

		// Show confirmation dialog
		const choice = await ctx.ui.select("Apply?", ["Accept", "Always"]);

		if (!choice) {
			// Esc pressed - abort
			ctx.abort();
			return { block: true, reason: "User cancelled" };
		}

		if (choice === "Always") {
			alwaysAccept = true;
		}

		// Accept or Always - proceed with the edit
		return undefined;
	});
}