/**
 * Confirm Edit Extension
 *
 * Prompts for confirmation before applying edit tool calls.
 * Options: Accept (this edit), Always (all edits in session), Esc (reject)
 *
 * Commands:
 * - /confirm-edit: Toggle or set always-accept mode
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { isToolCallEventType } from "@mariozechner/pi-coding-agent";

let alwaysAccept = false;

export default function (pi: ExtensionAPI) {
	// Reset state on session start
	pi.on("session_start", async () => {
		alwaysAccept = false;
	});

	// Register command to toggle/set always-accept mode
	pi.registerCommand("confirm-edit", {
		description: "Toggle or set always-accept mode for edits",
		handler: async (args, ctx) => {
			if (args === "on" || args === "always") {
				alwaysAccept = true;
				ctx.ui.notify("Always-accept mode: ON (all edits will be applied automatically)", "success");
			} else if (args === "off" || args === "ask") {
				alwaysAccept = false;
				ctx.ui.notify("Always-accept mode: OFF (each edit requires confirmation)", "info");
			} else {
				// No args: toggle or show current status
				const choice = await ctx.ui.select(
					`Always-accept mode is currently: ${alwaysAccept ? "ON" : "OFF"}`,
					["Turn ON", "Turn OFF", "Cancel"],
				);
				if (choice === "Turn ON") {
					alwaysAccept = true;
					ctx.ui.notify("Always-accept mode: ON", "success");
				} else if (choice === "Turn OFF") {
					alwaysAccept = false;
					ctx.ui.notify("Always-accept mode: OFF", "info");
				}
			}
		},
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

		// Show confirmation dialog with status hint
		const choice = await ctx.ui.select(
			"Apply edit?",
			["Accept", "Always", "Reject"],
		);

		if (!choice || choice === "Reject") {
			// Esc pressed or Reject selected - abort
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