'use babel';

import { CompositeDisposable } from 'atom';

import packageConfig from './configSchema.json';

const child_process = require("child_process");
const exec = require('child_process').exec;

// Function to reverse a string
function reverse(s)
{
	return s.split("").reverse().join("");
}

// Takes only the drive from the filepath
function getRoot(path)
{
	var os = require("os");
	return reverse(reverse(path).replace(/^.*[\\\/]/, ''));
}

// Gets the file path of the current file in Atom
function getFilePath()
{
	try
	{
		var filePath = atom.
		workspace.
		getActiveTextEditor().
		buffer.
		file.
		path;
	}
	// If the file is not saved, it will throw a TypeError since there is
	//	neither a directory or filename
	catch(TypeError)
	{
		console.log('ERROR: Could not find the path to the current file, please make sure it is saved');
		return 0;
	}
	if (filePath.endsWith('.cpp'))
	{
		return filePath;
	}
	// Filename cannot be compiled
	else
	{
		console.log('ERROR: This is not a valid filetype');
		return 0;
	}
}

// Generates the command to use in the shell
function generateCommand(c)
{
	if(atom.config.get('cpp-compiler.ClearConsole'))
	{
		console.clear()
	}
	var filepath = getFilePath();
	if (filepath == 0)
	{
		return 0;
	}
	filepath = filepath.replace(/[:[^\\\/]]*(.+)/, ":/$1")
	var root = getRoot(filepath);
	var dirname = filepath.substring(0,filepath.lastIndexOf("\\"));
	var filename = filepath.replace(/^.*[\\\/]/, '');
	var outfile = filename.replace('.cpp','.exe');
	var cmd = root.concat(" & ");
	if (!dirname == "")
	{
		cmd = cmd.concat("cd \"", dirname, "\" & ")
	}
	cmd = cmd.concat("g++ \"", filename , "\" -o \"", outfile, "\"");
	if(atom.config.get('cpp-compiler.StaticallyLinkStandardLibraries'))
	{
		cmd = cmd.concat(" -static-libgcc -static-libstdc++");
	}
	if (c == "CaR")
	{
		cmd = cmd.concat(" & \"",outfile,"\"");
	}
	return cmd
}

// Both functions are the wrappers for the package commands
function compile()
{
	shellExec(generateCommand("c"), false);
}

function compileAndRun()
{
	shellExec(generateCommand("CaR"), true)
}

// Executes the command in the shell, msg is a boolean to display the stdout and
//	stderr from the executable if called from the 'Compile and Run'
function shellExec(cmd, msg)
{
	exec(cmd, (error, stdout, stderr) =>
	{
		if (error)
		{
			console.log("Compilation Error");
			console.error(`exec error: ${error}`);
			return -1;
		}
		else
		{
			console.log("Successfully Compiled");
		}
		if (msg)
		{
			console.log(`stdout: ${stdout}`);
			console.log(`stderr: ${stderr}`);
		}
	});
}

// Mainly from the how-to and default package examples, probably better to leave
export default
{
	subscriptions: null,
	config: packageConfig,
	activate(state)
	{
		this.subscriptions = new CompositeDisposable();

		this.subscriptions.add
		(
			atom.commands.add
			(
			'atom-text-editor',
			{
				'cpp-compiler:compile': () => compile(),
				'cpp-compiler:compileAndRun': () => compileAndRun()
			},
			'atom-workspace',
			{
				'myPackage:toggle': () => this.toggle()
			}
			)
		)
	},
	deactivate()
	{
		this.subscriptions.dispose();
	},
};
