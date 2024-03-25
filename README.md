# CENG3420 Lab3 Helper
A TUI UOP file editor for CENG3420 (CUHK CSE) Lab 3. It makes your life a little bit easier.

## Install
You must have Node.js installed on your device, whether it is system-wide or `nvm` doesn't matter.  
Run this command to install the package.
```bash
npm i -g ceng3420-lab3-helper
```

## Usage
After installing the package globally with the previous command, a new `uop-editor` program should be available.
```bash
uop-editor <path> [-r <refpath>]
```
`<path>` is the path to the `uop` file you want to edit.  
`-r <refpath>` is an optional argument to supply a reference `uop` file. This makes the "show X only" function also shows signals that are originally `X` but modified, saved and re-opened in another session.

## Key Bindings
As this is a TUI program, you can navigate using your keyboard.
- `h`: Help.
- `a, d`: Navigate different states. Hold `ctrl` to skip unnecessary states.
- `w, s`: Navigate different signals.
- `z, x, c`: Set signal to 1, x or 0.
- `space`: Toggle signal.
- `f`: Toggle show X only.
- `e`: Save.
- `q`: Quit, and ask to save if modified.