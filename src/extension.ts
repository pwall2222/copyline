import { window, env } from "vscode";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	const copyLine = () => {
		const editor = window.activeTextEditor;
		const clipboard = env.clipboard;
		const document = editor?.document;
		const lineNumber = getLine();
		if (!lineNumber) {
			return;
		}
		const line = document?.lineAt(lineNumber);
		const trimedLine = line?.text.trim();
		clipboard.writeText(trimedLine!);
	};

	const getLine = () => {
		const editor = window.activeTextEditor;
		const selection = editor?.selection;
		if (!selection?.isEmpty) {
			return;
		}
		const position = selection?.active;
		return position.line;
	};

	let disposable = vscode.commands.registerCommand(
		"copylinecontent.copyLineContents",
		copyLine
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
