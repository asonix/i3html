i3html
======

![image](img/i3.png)

A web implementation of the i3wm with simulated bash+programs written from scratch.

This is a project for a web tech class I am currently in, and I am trying to write it without referencing i3's code. I feel like there could be a better way to do some of the things I've written code to do, but I'll only switch over if I really run into a road block with the way I'm doing things.

TODO:

WM:
 - Replace current window ResizeAll function (possibly mimic style of RepositionAll)
 - Remove RepositionAll's dependency on $WINDOW.next
  - Check parent size values from within child iteration unless $WINDOW.parent.type == workspace
 - Add support for multiple workspaces
  - Attempt to change on key combination, fix what breaks
  
TERM:
 - Add support for more commands
 
APPLICATIONS:
 - Text-editor
  - ?Vim-like?
 - Photo-viewer
  - Larger preview on mouseover
 - ?Music-player?
  - Learn HTML5
 - ?Video-player?
  - Learn HTML5
 - ?Web-browser?
  - iframes

KEYBOARD COMMANDS:
 - alt+enter - create new window
 - alt+q - remove new window
 - alt+h - next window will open to the right of the focused window
 - alt+v - next window will open below the focused window
 - alt+e - nothing - used to test things

BASH COMMANDS:
 - cd, cd.., cd .., cd ~, cd /, cd [path of folder] - change directory
 - rm [path to file or folder] - remove file, folder, or command (note: removing commands is not recommended)
 - mkdir [path] - makes a folder
 - rmdir [path to folder] - removes a folder
 - touch [path] - creates a file
 - ls - list files and folders
 - clear - clear console
 - mv [path] [path2] - move file from path to path2
 - cp [path] [path2] - copy file from path to path2
 - help - displays help dialogue
