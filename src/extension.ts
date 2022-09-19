// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { HelloWorldPanel } from './HelloWorldPannel'
import { SidebarProvider } from './SidebarProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log(
		'Congratulations, your extension "programmerhumor" is now active!'
	)

	const sidebarProvider = new SidebarProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("meme-sidebar", sidebarProvider)
	  );


	context.subscriptions.push(
		vscode.commands.registerCommand("programmerhumor.memes", async () => {
		//   HelloWorldPanel.kill();
		//   HelloWorldPanel.createOrShow(context.extensionUri);
		  await vscode.commands.executeCommand("workbench.action.closeSidebar");
		  await vscode.commands.executeCommand(
			"workbench.view.extension.meme-sidebar-view"
		  );
		//   setTimeout(() => {
		//     vscode.commands.executeCommand(
		//       "workbench.action.webview.openDeveloperTools"
		//     );
		//   }, 500);
		})
	  );

}

// this method is called when your extension is deactivated
export function deactivate() {}
