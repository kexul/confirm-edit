# Confirm Edit Extension

A [pi](https://github.com/mariozechner/pi-coding-agent) extension that prompts for confirmation before applying edit tool calls.

## Features

- Intercepts `edit` tool calls before they are executed
- Shows a confirmation dialog with three options:
  - **Accept** - Apply this edit and continue
  - **Always** - Apply this edit and all subsequent edits in the session
  - **Reject** - Reject the edit and abort
- Provides a command to toggle always-accept mode before any edits occur

## Installation

```bash
pi install git:github.com/kexul/confirm-edit
```

## Usage

### Confirmation Dialog

Once installed, the extension will automatically prompt you for confirmation before any edit is applied.

### Command: `/confirm-edit`

You can set the always-accept mode before any edits occur:

- `/confirm-edit` - Show a dialog to toggle always-accept mode
- `/confirm-edit on` or `/confirm-edit always` - Turn on always-accept mode
- `/confirm-edit off` or `/confirm-edit ask` - Turn off always-accept mode (require confirmation)

This is useful when you want to pre-configure the behavior before the agent starts making edits.

### Non-interactive Mode

In non-interactive mode (no UI available), edits are blocked by default for safety.

## License

MIT