"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { exec } from "child_process";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const openBrowser = vscode.commands.registerCommand("extension.openBrowser", () => {
    const activeTextEditor = vscode.window.activeTextEditor;
    const d = activeTextEditor.document;
    const s = activeTextEditor.selection;
    const selected = d.getText(s);
    let path: string;
    if (selected.startsWith("https://") || selected.startsWith("http://")) {
      path = selected;
    } else {
      path = `https://www.google.com/search?q=${encodeURI(selected)}`;
    }
    let cmd = open_command(path);
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        vscode.window.showErrorMessage(`error occured ${err}`);
      } else {
        vscode.window.activeTextEditor.selection = new vscode.Selection(
          activeTextEditor.selection.end,
          activeTextEditor.selection.end
        );
      }
    });
  });
  context.subscriptions.push(openBrowser);

  const yewSyntax = vscode.commands.registerCommand("extension.yewSyntax", async () => {
    const activeTextEditor = vscode.window.activeTextEditor;
    const d = activeTextEditor.document;
    const s = activeTextEditor.selection;
    const selected = d.getText(s);
    const converted = convert_class(selected);
    return activeTextEditor.edit(editBuilder => {
      editBuilder.replace(s.with(), converted);
    });
  });
  context.subscriptions.push(yewSyntax);
}

function convert_class(plain: string): string {
  if (plain.startsWith("class")) {
    let startIdx = plain.indexOf('"');
    let endIdx = plain.lastIndexOf('"');
    if (startIdx < 0) {
      startIdx = plain.indexOf("'");
      endIdx = plain.lastIndexOf("'");
    }
    if (startIdx >= 0 && endIdx >= 0) {
      const classes = plain.substring(startIdx + 1, endIdx);
      const output = classes
        .split(" ")
        .map(cls => {
          return `"${cls}"`;
        })
        .join(", ");
      return `class=(${output}),`;
    }
  }
  return plain;
}

function open_command(path: string): string {
  const platform = process.platform;
  let cmd: string;
  switch (platform) {
    case "win32":
      cmd = `start "" "${path}"`;
      break;
    case "darwin":
      cmd = `open "${path}"`;
      break;
    default:
      cmd = `xdg-open "${path}"`;
      break;
  }
  return cmd;
}

// this method is called when your extension is deactivated
export function deactivate() {}
