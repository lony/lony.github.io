+++
title = "Graphical user interface development"
tags = [ "programming", "gui", "cross-platform" ]
date = "2017-02-26T14:02:52+02:00"
slug = "gui-development-cross-platform"
+++

This list was started in search for the right architecture to develop a cross-platform tool, which I needed badly for myself. As I'm working private and commercially with the tool, I need support for all three mayor operating systems `Linux, Windows and OS X`.

First of all there is always a [Wikipedia list](https://en.wikipedia.org/wiki/List_of_platform-independent_GUI_libraries) around. Next I then started by researching how tools I liked are developed. I looked for my favorite apps and how they are build for example the all famous Sublime Text editor, which is developed in C++ as stated [here](http://stackoverflow.com/questions/7102378/what-gui-library-is-used-by-sublime-text-editor). Another big one these days it Slack and Franz which are both made with JavaScript and [Electron](https://electron.atom.io/apps/). Last but not least there is the obvious choice of using Java.

After a bit of research I cam up with the following list:

# C++

* [Qt](https://www.qt.io/) [Commercial] - Best and most feature
* [GTK+](https://www.gtk.org/)
* [wxwidgets](http://www.wxwidgets.org/)
* [JUCE](https://www.juce.com) [Commercial]
* [nana](http://nanapro.org)

# Java

* [AWT](http://docs.oracle.com/javase/8/docs/technotes/guides/awt/) - Very old but fast
* [Swing](https://docs.oracle.com/javase/tutorial/uiswing/) - Based on AWT but easier
    * Builder
        * [JFormDesigner](https://www.formdev.com/jformdesigner/)
        * [Swing GUI Builder (aka Matisse)](https://netbeans.org/features/java/swing.html)
* [SWT](https://www.eclipse.org/swt/) - Uses more native UI components, developed for eclipse
* [JavaFX](http://docs.oracle.com/javase/8/javase-clienttechnologies.htm) - Successor of Swing, better for visualizations and animations

# JavaScript

* [Electro](http://electron.atom.io/) - Successor of NW.js and used for Franz and Slack, JavaScript inside Chromium
* [NW.js](https://nwjs.io/)

----

Now that you read that far - thank you and please remember, if you find a bug or want to recommend something, please feel free to open an [issue](https://github.com/lony/lony.github.io/issues) and help me get better!