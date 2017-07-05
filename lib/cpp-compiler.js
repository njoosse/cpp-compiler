'use babel';

import { CompositeDisposable } from 'atom';

const child_process = require("child_process");
const exec = require('child_process').exec;

function compile()
{
		var filepath = getFilePath();
		if (filepath == 0)
		{
			return 0;
		}
		var dirname = filepath.substring(0,filepath.lastIndexOf("\\"));
		var filename = filepath.replace(/^.*[\\\/]/, '')
		var outfile = filepath.replace(/^.*[\\\/]/, '').replace('.cpp','.exe');
		var cmd = "cd ".concat(dirname, " & g++ ",filename , " -o ", outfile)
		shellExec(cmd, false)
		console.log("Successfully Compiled");
}

function compileAndRun()
{
		var filepath = getFilePath();
		if (filepath == 0)
		{
			return 0;
		}
		var dirname = filepath.substring(0,filepath.lastIndexOf("\\"));
		var filename = filepath.replace(/^.*[\\\/]/, '')
		var outfile = filepath.replace(/^.*[\\\/]/, '').replace('.cpp','.exe');
		var cmd = "cd ".concat(dirname, " & g++ ",filename , " -o ", outfile, " & ",outfile)
		shellExec(cmd, true)
}

function shellExec(cmd, msg)
{
		exec(cmd, (error, stdout, stderr) =>
		{
				if (error) {
						console.error(`exec error: ${error}`);
						return;
				}
				if(msg)
				{
					console.log(`stdout: ${stdout}`);
					console.log(`stderr: ${stderr}`);
				}
		});
}

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
	catch(TypeError)
	{
		console.log('ERROR: Could not find the path to the current file, please make sure it is saved');
		return 0;
	}
	if (filePath.endsWith('.cpp'))
	{
		return filePath;
	}
	else
	{
		console.log('ERROR: This is not a valid filetype');
		return 0;
	}
}

export default
{
	subscriptions: null,

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
				}
			)
		)
	},

	deactivate()
	{
		this.subscriptions.dispose();
	},
};
