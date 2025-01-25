import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.deleteBinObj",
    async (uri: vscode.Uri) => {
      const folders = ["/bin", "/obj"];

      try {
        for (const folder of folders) {
          const targetPath = path.join(uri.fsPath, folder);

          if (fs.existsSync(targetPath)) {
            await vscode.workspace.fs.delete(vscode.Uri.file(targetPath), {
              recursive: true,
              useTrash: false,
            });
          }
        }

        vscode.window.showInformationMessage('Deleted bin and obj folders successfully');

      } catch (error) {
        vscode.window.showErrorMessage(
          `Error deleting folders: ${
            error instanceof Error ? error.message : error
          }`
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
