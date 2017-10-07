+++
title = "Setup Reloaded - Ansible to the rescue"
tags = [ "programming", "ansible", "setup" ]
date = "2017-10-07T15:00:00+02:00"
slug = "setup-reloaded"
+++

Last year I tried to "semi-automate" my OSX setup, as described in the [Mac OS X Setup post](/post/2016/mac-osx-setup/). This weekend I enhanced the deployment using Ansible.

If you are interested have a look into my [dotfile repository](https://github.com/lony/dotFiles). The setup for now only supports OSX, but is already a big step forward for me.

![Sample cli setup](/img/2017/setup-reloaded/image.png)	

# Usage

1. Clone repo `git clone git@github.com:lony/dotFiles.git`
2. Customize [all_secret.sh](ansible/roles/dotfiles/src/bash_zsh/all_secret.sh) and maybe [.ssh/config](ansible/roles/dotfiles/src/.ssh/config) (see [SSH guide](/post/2017/cli-commands/#secure-shell-command-ssh))
3. Execute `./setup.sh`

# Feature

* [x] [Homebrew](https://brew.sh/) setup
* [x] [Homebrew Cask](https://caskroom.github.io/) setup
* [x] [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) setup
* [x] dotfiles setup, optimisation
* [x] vim setup incl. [vim-plug](https://github.com/junegunn/vim-plug)
* [x] tmux setup incl. [tpm](https://github.com/tmux-plugins/tpm)
* [x] Python simple setup
* [x] Homebrew cleanup
* [x] Setup script to prepare Ansible
* [x] Ansible installation for OSX
* [ ] Ansible installation for Linux
* [ ] Ansible installation for Windows [really?]
* [ ] OSX cli configuration see [this](https://lony.github.io/post/2016/mac-osx-setup/#user-interface)
* [ ] OSX system configuration
* [ ] OSX dock configuration
* [ ] OSX Apple store installation
* [ ] iTerm2 configuration
* [ ] Testing
* [ ] gitconfig

# Architecture

1. The [setup.sh](setup.sh) installs OS specific Ansible prequesites and starts Ansible
2. Ansible has multiple [roles](ansible/site.yml) which each are triggered
3. The dotfile role contains a [Python script](ansible/roles/dotfiles/bin/bootstrap.py) which creates shell scripts for bash, zsh and fish

# Structure

```
❯ tree  -L 5 (custom)
.
├── README.md                     - This readme
├── ansible
│   ├── README.md                 - Ansible links
│   ├── roles
│   │   ├── dotfiles              - First role for dotfiles
│   │   │   ├── bin
│   │   │   │   └── bootstrap.py  - Custom Python script
│   │   │   ├── src               - Dotfiles
│   │   │   └── tasks
│   │   │       └── main.yml      - Task executed by Ansible
│   │   ├── homebrew
│   │   │   ├── tasks
│   │   │   └── vars
│   │   │       └── main.yml      - Variables used by Ansible
│   │   ├── homebrew_cleanup
│   │   ├── python
│   │   ├── tmux
│   │   ├── vim
│   │   └── zsh_oh-my-zsh
│   └── site.yml                  - Ansible playbook definition
└── setup.sh                      - Script to prepare OS for Ansible
```

# Thanks

This is heavily inspired by the work of the following people:

* [Dominik's](https://github.com/dhabersack/dotfiles) - basic idea for bash, zsh, vim and tmux
* Christopher - vim plugins
* [Michael](https://github.com/ludwigm) - cli tooling e.g. httpie, jq
* [Sebastian's](https://github.com/hypebeast/dotfiles) - homebrew setup, tmux enhancing
* [Florian](https://github.com/floschnell) - fish support
* [Jeff's](https://github.com/geerlingguy/mac-dev-playbook) - Ansible deployment
* [Chavez's](https://github.com/mtchavez/mac-ansible) - Ansible bootstrapping and vim, tmux enhanced setup
