+++
title = "Mac OS X Setup"
tags = [ "programming", "mac", "setup" ]
date = "2016-10-01T18:02:52+02:00"
slug = "mac-osx-setup"
+++

This post contains information about how I tweak a new Mac when I first get it. As things change I constantly update this post and adjust it. If you find a bug or want to recommend something, please feel free to open an [issue](https://github.com/lony/lony.github.io/issues) and help me get better. - Thank you!

# TOC

* [User interface](#user-interface)
* [Terminal](#terminal)
    * [Python](#python)
    * [SDKMan](#sdkman)
* [Apps](#apps)
    * [iTerm2](#iterm2)
* [Shortcuts](#shortcuts)

----

# User interface

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
* To change the screenshot format to jpg `defaults write com.apple.screencapture type jpg`

After applying this configuration changes through the terminal there are also some adjustments made via the settings interface. I extracted two of them from the following [OSXDaily guide](http://osxdaily.com/2014/10/24/speed-up-os-x-yosemite-mac/).

* System Preferences > Accessibility > Display and there check `Reduce Transparency`
* System Preferences > Dock select `Scale effect` for Minimize windows using

Another really important UX improvement is allowing Finder to show hidden files. To enable this feature type the following into your terminal `defaults write com.apple.finder AppleShowAllFiles YES` [1](https://ianlunn.co.uk/articles/quickly-showhide-hidden-files-mac-os-x-mavericks/)

# Terminal

To prepare for development I first install a couple of tools. As OS X has no package manager I first install - [homebrew](http://brew.sh/index.html) the (missing) package manager.

After the package manager is working I use it to install a bunch of packages for ease of use, as development, as also preparation for incidents e.g. network analysis.

I also set the stage for my [dotFiles](https://github.com/lony/dotFiles), which need some perquisites to work. As there development is currently ongoing, the way to use them is described [here](https://github.com/lony/dotFiles/blob/master/README.md) only.

The first thing my dotFiles need are GNU tools. As OS X is a BSD successor, the default tools are all from the BSD project and if you use Linux often, some things are different. The way to change that is stolen from [this guide](https://danielmiessler.com/blog/first-10-things-new-mac/), and maybe a good read for you too!

The following snipped let you dive into the details of the installation process. Enjoy.

```
# Install homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Add GNU tap
brew tap homebrew/dupes     # GNU tap for brew

# Prepare array of cli packages
brew_packages=(
findutils --default-names   # GNU find, xargs, and locate
gnu-sed --default-names
gnu-tar --default-names
gnu-which --default-names
gnutls --default-names      # GNU TLS
openssl                     # SSL/TLS cryptography library
grep --default-names
coreutils                   # GNU File, Shell, and Text utilities
binutils                    # FSF Binutils for native development
diffutils                   # File comparison utilities

unrar
gzip
pigz                        # Parallel gzip
xz                          # General-purpose data compression with high compression ratio
p7zip                       # 7-Zip (high compression file archiver) implementation

bash
fish
vim
screen
tmux
z                           # Tracks most-used directories to make cd smarter
diff-so-fancy               # Good-lookin' diffs with diff-highlight and more

nmap                        # Port scanning utility for large networks
netcat                      # Utility for managing network connections
ipcalc                      # Calculate various network masks
wget --with-iri             # Internet file retriever
curl
httpie                      # User-friendly cURL replacement (command-line HTTP client)
lynx                        # Text-based web browser

watch                       # Executes a program periodically, showing output fullscreen
htop                        # Improved top (interactive process viewer)
tree                        # Display directories as trees

gd                          # Graphics library to dynamically manipulate images
imagemagick                 # Tools and libraries to manipulate images in many formats
gs                          # Interpreter for PostScript and PDF

jq                          # Lightweight and flexible command-line JSON processor
pv                          # Monitor data's progress through a pipe

ansible
go

git
packer
utf8proc                    # Clean C library for processing UTF-8 Unicode data
docker-completion
docker-compose-completion
)

# Array of considered packages - NOT INSTALLED
brew_packages_consider=(
moreutils                   # Collection of tools that nobody wrote when UNIX was young
ack                         # Search tool like grep, but optimized for programmers
ag                          # Code-search similar to ack
rename
speedtest_cli
testssl
ssh-copy-id
vbindiff
webkit2png
grc
fasd
mc
pandoc
pwgen
git-extras

apache-spark
maven
scala
)

# Install cli packages
brew install "${brew_packages[@]}"

# Switch to zsh
chsh -s $(which zsh)
```

The packages that I normally not install by default, but still like or want to look into are listed in the `brew_packages_consider` array. For you they may be interesting, please feel free to also install them by default.

## Python

If for any reason, you also need a running python installation on your Mac, this is how I install it following the [Hitchhiker's guide](http://docs.python-guide.org/en/latest/starting/install/osx/). This will setup a separate installation and should keep your existing python intact. Still everything you open a shell your newly installed python should be referenced.

1. Install gcc

    * Downloading the Command Line Tools from [here](https://developer.apple.com/downloads/) (requires Apple-Account). The file you need is called `Command_Line_Tools_OS_X_10.XX_for_Xcode_7.2.dmg`. *The XX depends on your OSX-Version.*
    * Then install the downloaded dmg

2. Execute `brew install python python3`

If you like you can create Python 3 symbolic links on your system using `brew linkapps python3`, check it afterwards `which python3`.

### OpenCV

Following the guide from [pyimagesearch.com](http://www.pyimagesearch.com/2016/12/19/install-opencv-3-on-macos-with-homebrew-the-easy-way/), I install OpenCV 3 using homebrew.

```
brew tap homebrew/science
brew install opencv3 --with--contrib --with-python3 --with-ffmpeg --with-tbb
# If you wan to see all option use: brew info opencv3
# Maybe also required to find the libs: brew force link --force opencv3
```

## SDKMan

If you plan to develop on the [JVM](https://en.wikipedia.org/wiki/Java_virtual_machine) you need an SKD for the language of your choice.

[SDKMan](http://sdkman.io) is a wrapper like rbenv or nvm which allows you to install SDK's as also selecting them for usage.

Sadly there is no brew package available, and you can only install it with the following command: `curl -s "https://get.sdkman.io" | bash`

# Apps

Having all the necessities for command line life at the pipe, now is the time for applications. Homebrew wouldn't be THE missing package manager if it could not install also binary packages. Still, to do this there is another tap required - [homebrew Cask](https://caskroom.github.io/) a homebrew extension for GUI and binary applications.

The following snipped - as before - installs all packages together. The comments should help me understand for what the package was and were to look if there are questions.

```
# Add cask tap
brew tap caskroom/cask

# Prepare array of cask packages
brew_cask_packages=(
anki
apache-directory-studio     # LDAP GUI http://directory.apache.org/studio
calibre                     # E-Book manager https://calibre-ebook.com
charles                     # HTTP proxy https://www.charlesproxy.com
docker
dropbox
fiddler
filezilla
firefox
flux                        # Reduce bright light https://justgetflux.com
franz
freemind
gimp
gmvault
google-chrome
google-drive
iterm2                      # A better Terminal https://www.iterm2.com
java
keepassx
mysqlworkbench
netbeans
osxfuse
pencil
postico
postman
rescuetime
sequel-pro
sourcetree
spectacle                   # Resize OS X windows https://www.spectacleapp.com
sublime-text
teamviewer
tomighty
unetbootin
vagrant
vagrant-bar
vagrant-manager
virtualbox
virtualbox-extension-pack
visual-studio-code
wireshark
xmind
)

# Array of considered packages - NOT INSTALLED
brew_cask_packages_consider=(
freecad
karabiner
kitematic               # Docker search https://kitematic.com
mongodb-compass         # Mongo GUI https://www.mongodb.com/products/compass
mono-mdk                # Mono SDK
skype
slack
soundflower             # Virtual audio output device https://rogueamoeba.com/freebies/soundflower/
vimr
keka                    # Archiver GUI for p7zip http://www.kekaosx.com
nvalt                   # Note taking app http://brettterpstra.com/projects/nvalt
tagspaces               # Evernote alternative https://www.tagspaces.org
vlc
anaconda                # Python data science environment https://www.continuum.io
)

# Install cask packages
brew cask install "${brew_cask_packages[@]}"
```

Now you should have not only cli tools installed but also all your favorite binary tools running. Some more bare then others, but still its close to done!

## iTerm2

To make your favorite terminal emulator a bit more fantastic as it already is, you can adjust the following settings.

* To let iTerm2 fill the complete screen after a resize: Turn on `Preferences> Advanced> Terminal windows resize smoothly`


# Shortcuts

As with every other operating system, also Mac OS has some nice shortcuts which ease the usage of the system.

The most complete list of available shortcuts is provided by Apple on its support [page](https://support.apple.com/en-us/HT201236).

The following list is a subset of my personal selection:

| Shortcut         | Usage                  |
|------------------|------------------------|
| ⌘ + Tab          | Switch between apps    |
| ⇧ + ⌘ + ~        | Switch between windows |


----

Now that you read that far - thank you and please remember, if you find a bug or want to recommend something, please feel free to open an [issue](https://github.com/lony/lony.github.io/issues) and help me get better!