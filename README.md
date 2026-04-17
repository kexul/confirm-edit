# Confirm Edit Extension

A [pi](https://github.com/mariozechner/pi-coding-agent) extension that prompts for confirmation before applying edit tool calls.

## Features

- Intercepts `edit` tool calls before they are executed
- Shows a confirmation dialog with three options:
  - **Accept** - Apply this edit and continue
  - **Always** - Apply this edit and all subsequent edits in the session
  - **Esc** - Reject the edit and abort

## Installation

```bash
pi install git:github.com/kexul/confirm-edit
```

## Usage

Once installed, the extension will automatically prompt you for confirmation before any edit is applied.

In non-interactive mode (no UI available), edits are blocked by default for safety.

## License

MIT