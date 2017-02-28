---
title: Setup Mac CLI
date: 2016-10-01 18:00:00
tags:
- tech
- it
- cli
- mac
---

This post contains information about how I tweak a new Mac when I first get it.
The first part covers UI optimizations as the second my CLI setup.

# OS X user interface

Following the [defaults-write.com instructions](http://www.defaults-write.com/10-terminal-commands-to-speed-up-your-mac-in-os-x-el-capitan/) I first try to optimize the UX experience of OSX.

To apply the following changes you have to reboot your machine. To undo use `defaults delete NSGlobalDomain KeyRepeat`.

* Disable animations when opening and closing windows: `defaults write NSGlobalDomain NSAutomaticWindowAnimationsEnabled -bool false`
* Disable animations when opening a Quick Look window: `defaults write -g QLPanelAnimationDuration -float 0`
* Accelerated playback when adjusting the window size (Cocoa applications): `defaults write NSGlobalDomain NSWindowResizeTime -float 0.001`
* Disable animation when opening the Info window in OS X Finder (cmd⌘ + i): `defaults write com.apple.finder DisableAllAnimations -bool true`
* Disable animations when you open an application from the Dock: `defaults write com.apple.dock launchanim -bool false`
* Make all animations faster that are used by Mission Control: `defaults write com.apple.dock expose-animation-duration -float 0.1`
* Disable the delay when you hide the Dock: `defaults write com.apple.Dock autohide-delay -float 0`
* The keyboard react faster to keystrokes: `defaults write NSGlobalDomain KeyRepeat -int 0`

After applying this configuration changes through the terminal there are also some adjustments made via the settings interface. I extracted two of them from the following [OSXDaily guide](http://osxdaily.com/2014/10/24/speed-up-os-x-yosemite-mac/).

* System Preferences > Accessibility > Display and there check `Reduce Transparency`
* System Preferences > Dock select `Scale effect` for Minimize windows using


# Terminal

To improve working with the CLI I install a couple of tools.

* Install [homebrew](http://brew.sh/index.html) the (missing) package manager, using the Terminal via `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
* Install [homebrew Cask](https://caskroom.github.io/) the homebrew extension for GUI applications, using the Terminal via `brew tap caskroom/cask`
* Install [iTerm2](https://www.iterm2.com/) a better Terminal, directly using the binary download
* Install [SpectacleApp](https://www.spectacleapp.com/) a window resizing helper, directly using the binary download
* Install [f.lux](https://justgetflux.com/) a helper to reduce monitor light, via `brew install flux`

After setting the field I now following [Daniel Miessler's](https://danielmiessler.com/blog/first-10-things-new-mac/) recommendation and setup my bash.

* Switching to [Zsh](http://www.zsh.org/) the better bash using `chsh -s $(which zsh)`
* Install (the latest) [vim](http://www.vim.org/) using `brew install vim`
* Install GNU tool's because OSX is based on BSD and has its tools installed as default
    * First run `brew tap homebrew/dupes` to add dupes repository to homebrew
    * Then run the following lines to install each tool
        * **Hint**: Interested in `tmux` read [Daniel Miessler's post](https://danielmiessler.com/study/tmux/)


```
brew install findutils --default-names
brew install gnu-sed --default-names
brew install gnu-tar --default-names
brew install gnu-which --default-names
brew install gnutls --default-names
brew install grep --default-names
brew install coreutils
brew install binutils
brew install diffutils
brew install gzip
brew install xz
brew install watch
brew install tmux 
brew install wget
brew install nmap
brew install gpg
brew install htop
```

* Installing my dotFiles from [here](https://github.com/lony/dotFiles) into my home folder
    * Adjusting the `.rc_secret` adding at least a valid Github token
    * Open vim and run `:PlugInstall` installing set plugins in my `.vimrc` see [VimAwesome.com](http://vimawesome.com/) for more
    * **Hint**: To jump from the CLI to a vim editing mode [as configured](http://nuclearsquid.com/writings/edit-long-commands/) use `ESC v`

# Python

1. Install gcc using way from [this guide](http://docs.python-guide.org/en/latest/starting/install/osx/).

    * Downloading the Command Line Tools from [here](https://developer.apple.com/downloads/) (requires Apple-Account). The file you need is called `Command_Line_Tools_OS_X_10.XX_for_Xcode_7.2.dmg`. *The XX depends on your OSX-Version.*
    * Then install the downloaded dmg

2. Execute `brew install python`