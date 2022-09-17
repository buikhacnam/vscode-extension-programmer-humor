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

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	
	
	context.subscriptions.push(
		vscode.commands.registerCommand('programmerhumor.helloWorld', () => {
			// The code you place here will be executed every time your command is executed
			// Display a message box to the user
			// vscode.window.showInformationMessage('Hi Mom from ProgrammerHumor!')
			HelloWorldPanel.createOrShow(context.extensionUri);
		})
	)
	const sidebarProvider = new SidebarProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("meme-sidebar", sidebarProvider)
	  );

	context.subscriptions.push(
		vscode.commands.registerCommand("programmerhumor.refresh", async () => {
		//   HelloWorldPanel.kill();
		//   HelloWorldPanel.createOrShow(context.extensionUri);
		  await vscode.commands.executeCommand("workbench.action.closeSidebar");
		  await vscode.commands.executeCommand(
			"workbench.view.extension.meme-sidebar-view"
		  );
		  setTimeout(() => {
		    vscode.commands.executeCommand(
		      "workbench.action.webview.openDeveloperTools"
		    );
		  }, 500);
		})
	  );


	context.subscriptions.push(
		vscode.commands.registerCommand(
			'programmerhumor.memeTime',
			async () => {
				const answer = await vscode.window.showInformationMessage(
					'meme Time huh?',
					'fuck yeahhhh!',
					'no thanks!'
				)

				if (answer === 'fuck yeahhhh!') {
					vscode.window.showInformationMessage('There you go!')
				} else {
					vscode.window.showInformationMessage('ok then')
				}
			}
		)
	)
}

// this method is called when your extension is deactivated
export function deactivate() {}
