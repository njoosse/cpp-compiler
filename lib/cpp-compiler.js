'use babel';

import { CompositeDisposable } from 'atom';

const child_process = require("child_process");
const exec = require('child_process').exec;

function compile()
{
		var filepath = getFilePath(); //"C:\\Users\\Nathan\\Desktop\\test.cpp";
		var dirname = filepath.substring(0,filepath.lastIndexOf("\\"));
		var filename = filepath.replace(/^.*[\\\/]/, '')
		var outfile = filepath.replace(/^.*[\\\/]/, '').replace('.cpp','.exe');
		var cmd = "cd ".concat(dirname, " & g++ ",filename , " -o ", outfile)

		shellExec(cmd, false)
}

function compileAndRun()
{
		var filepath = getFilePath(); //"C:\\Users\\Nathan\\Desktop\\test.cpp";
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
	var filePath = atom.
	workspace.
	getActiveTextEditor().
	buffer.
	file.
	path;

	return filePath
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
