'use babel';

import CppCompiler from '../lib/cpp-compiler';
/*
// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('CppCompiler', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('cpp-compiler');
  });

  describe('when the cpp-compiler:toggle event is triggered', () => {
    it('creates an EXE with the same name as the CPP file', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.cpp-compiler')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'cpp-compiler:compile');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.cpp-compiler')).toExist();

        let cppCompilerElement = workspaceElement.querySelector('.cpp-compiler');
        expect(cppCompilerElement).toExist();

        let cppCompilerPanel = atom.workspace.panelForItem(cppCompilerElement);
        expect(fs.stat("C:\\Users\\Nathan\\Desktop\\test.exe", function(err, stat)
        {
            if(err == null)
            {
                return true;
            } else {
                return false;
            }
        })).toBe(true);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.cpp-compiler')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'cpp-compiler:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let cppCompilerElement = workspaceElement.querySelector('.cpp-compiler');
        expect(cppCompilerElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'cpp-compiler:toggle');
        expect(cppCompilerElement).not.toBeVisible();
      });
    });
  });
});
*/
