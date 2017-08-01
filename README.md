# cpp-compiler package

A package for Atom that calls MinGW to compile cpp files into an exe with the same name.

For this package to work, make sure that the file is saved as a *.cpp

This package will not save the file before attempting to compile it.

### Default Keybinds:
* Compile (F5)
* Compile and Run (F6)
    note: This will not show the output if there is a compilation error

### Settings:
* Include Standard Libraries: compiles with standard C++ libraries, increases EXE file size. Defaults to FALSE.
* Clear Console: this will clear the Atom console every time that either command is called. Defaults to TRUE.

Any stdout and stderr are logged to the console for now, which can be opened with Ctrl+Shift+I (default) in Atom.

The 'Compile and Run' does not support any user input.

The stdout from the program is shown after the run has completed, this will cause delayed output if there are any sleeps in the program.
