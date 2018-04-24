+++
title = "CLI commands"
tags = [ "programming", "cli", "linux", "commands" ]
date = "2017-02-25T18:02:52+02:00"
slug = "cli-commands"
+++

Working with UNIX systems you often need commands to get something done. This is a continuously updated collection of useful commands I compile and maintain for myself - and maybe also for `you`. 

The collection is divided into different sections under which the commands are explained. For each commands there are examples how to use them, as links - from which information about the command can be gathered. For the most commands there is also a short explanation what it does.

If you find a bug or want to recommend something, please feel free to open an [issue](https://github.com/lony/lony.github.io/issues) and help me get better. - Thank you!

# TOC

* [File system](#file-system)
	* [Language environments](#language-environments)
		* [Python](#python)
		* [Ruby](#ruby)
		* [Scala](#scala)
	* [Configuration management](#configuration-management)
		* [Ansible](#ansible)
		* [Chef](#chef)
	* [Package management](#package-management)
	* [Version control systems](#version-control-systems)
* [Processes](#processes)
	* [Docker](#docker)
	* [Vagrant](#vagrant)
	* [VirtualBox](#virtualbox)
* [User environment](#user-environment)
* [Text processing](#text-processing)
	* [Vim](#vim)
* [Shell bulletins](#shell-bulletins)
* [Networking](#networking)
	* [Apache2](#apache2)
	* [iptables](#iptables)
	* [Secure Shell command (ssh)](#secure-shell-command-ssh)
		* [Setup SSH](#setup-ssh)
		* [Agent Support](#agent-support)
		* [Agent Forwarding](#agent-forwarding)
		* [Application](#application)
	* [Varnish](#varnish)
* [Searching](#searching)
* [Documentation](#documentation)
	* [Atlassian JIRA](#atlassian-jira)
* [Miscellaneous](#miscellaneous)
	* [Shell](#shell)
		* [Detect shell](#detect-shell)
		* [Shell types and frameworks](#shell-types-and-frameworks)
		* [Setup](#setup)
		* [Shebangs](#shebangs)
		* [Programming sh](#programming-sh)
			* [array](#array)
			* [for](#for)
			* [if](#if)
			* [until](#until)
			* [pasting](#pasting)
			* [pipe](#pipe)
			* [read](#read)
	* [Databases](#databases)
		* [SQL](#sql)
			* [MySQL](#mysql)
		* [NoSQL](#nosql)
			* [Mongo](#mongo)
			* [ElasticSearch](#elasticsearch)
	* [Distributions](#distributions)
		* [Ubuntu](#ubuntu)
* [Meta](#meta)

----

# File system

* cat

	* `cat /etc/issue` - Show ubuntu system version

* ls

	* `ls -R` - Recursive list of directory and files within
	* `ls='ls -Fh -G'`
	* `l='ls -1A'`
	* `ll='ls -lh'`

* ln - Link files [1](http://stackoverflow.com/questions/9587445/how-to-create-a-link-to-a-directory)

	* `ln -s /foo/bar /home/lony/bar` - Creates symbolic link
	* `ln /foo/bar /home/lony/bar` - Creates hard link (files only)

* losetup [1](https://linux.die.net/man/8/losetup) - control loop devices

	* Create, format and mount loopback device [1](https://stackoverflow.com/questions/16044204/testing-out-of-disk-space-in-linux), [2](https://linux.die.net/man/1/dd)

		```
		dd if=/dev/zero of=/tmp/tcp_dump_data bs=1M count=2 # Create a file with random data
		losetup -f /tmp/tcp_dump_data 						# Create loopback device from file
		mkfs.ext4 /dev/loop0								# Format loopback device
		mount /dev/loop0 /mnt/test							# Mount loopback device
		```

	* Unmount and delete loopback device

		```
		umount /mnt/test									# Unmount loopback device
		losetup -d /dev/loop0								# Delete loopback device
		```

	* `losetup -a` - List all existing loopback devices
	* `losetup --list` [1](https://unix.stackexchange.com/questions/172382/how-to-find-which-images-belong-to-which-dev-loop) - Show images behind loopback devices

* mkfifo - Create named pipe

	```
	mkfifo in 
	ssh -A -l LOGIN BASTIAN_HOST nc TARGET_HOST TARGET_PORT <in | nc -l LOCAL_PORT >in
	rm in
	```

* openssl [1](http://snazzylabs.com/tutorial/five-advanced-tricks-for-mac-users/), [2](http://www.czeskis.com/random/openssl-encrypt-file.html), [3](https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs) - SSL encryption library

	* `openssl base64 -in binary.file -out base64.text` [1](https://superuser.com/questions/120796/how-to-encode-base64-via-command-line) - Encode binary file as base64 
	* `openssl base64 -d -in base64.text -out binary.file` - Decode base64 back to binary file
	* `openssl enc -aes-256-cbc -e -in {path-in} -out {path-out}` - Encrypt file with password (aes-256)
	* `openssl enc -aes-256-cbc -d -in {path-in} -out {path-out}` - Decrypt file with password (aes-256)
	* `openssl rsa -des3 -in {path-in} -out {path-out}` - Encrypt key with password (rsa)
	* `openssl rsa -in {path-in} -out {path-out}` - Decrypt key with password (rsa)
	* `echo | openssl s_client -host IP_OF_TARGET -port 443 2>&1 | openssl x509 -noout -subject` - Get SSL certificate subject of target machine
	* `openssl rand -base64 12` - Create a random string with 12 characters (password generator)
	* `openssl dgst -sha256 FILE` [1](https://forums.appleinsider.com/discussion/192161/how-to-verify-checksums-when-you-download-an-app-for-your-mac) - Create SHA256 checksum for file
	* `openssl md5 FILE` - Create MD5 checksum for file

* rsync [1](https://en.wikipedia.org/wiki/Rsync), [2](http://stackoverflow.com/questions/4493525/rsync-what-means-the-f-on-rsync-logs) - Data synchronization tool

	* `rsync -rlptzvn rsync://USER@foo.bar.de/home/lony_src/ /home/lony_dest/` - Synchronize data from source to destination preserving source and not deleting anything

		* `-r` - Recurs into folders
		* `-l` - Copy also symlinks
		* `-p` - Preserve permissions
		* `-t` - Preserve modification times
		* `-z` - Compress during transfer
		* `-v` - Verbosity ++
		* `-n` or `--dry-run` - Perform trial run

	* `rsync -aivh --progress --delete source/ dest/` [1](http://askubuntu.com/questions/476041/how-do-i-make-rsync-delete-files-that-have-been-deleted-from-the-source-folder) - Synchronize files and even delete irrelevant files on destination

		* `-a` - Archive mode; equals `-rlptgoD`
		* `-g` - Preserve group
		* `-o` - Preserve owner
		* `-D` - Preserve devices and special files
		* `-h` - Numbers in human-readable format
		* `-i` [1](http://serverfault.com/questions/618735/can-i-use-rsync-to-create-a-list-of-only-changed-files) - Change summary for all updates
		* `--progress` - Show progress of transfer
		* `--delete` - Deletes irrelevant files from destination

	* `rsync -rlptzvhn --progress --remove-source-files --prune-empty-dirs --ignore-errors source/ dest/` [1](https://superuser.com/questions/676671/rsync-does-not-delete-source-directories), [2](http://unix.stackexchange.com/questions/78375/move-files-and-delete-directories-with-rsync), [3](http://serverfault.com/questions/598662/copy-directory-tree-without-empty-directories) - Copy files from source to destination deleting them at the source afterwards (empty folders will be kept)

		* `--remove-source-files` - Remove synchronized files from source
		* `--prune-empty-dirs` - Ignore empty directories for transfer
		* `--ignore-errors` - Ignore errors
	
	* `rsync -vzi -e ssh server:source/ dest/` [1](https://kyup.com/tutorials/copy-files-rsync-ssh/) - Use rsync via ssh

* tar

	* `tar cvzf - 2017-02-11_T430s_Windows8.tib | split -b 4294967295 -  ../win-bu.tar.gz.` [1](http://unix.stackexchange.com/questions/61774/create-a-tar-archive-split-into-blocks-of-a-maximum-size) - Create gzip tar archiv in multiple chunks

	* `cat win-bu.tar.gz.aa win-bu.tar.gz.ab > combined.tar.gz \
		gunzip combined.tar.gz \
		tar -xvf combined.tar` [1](http://stackoverflow.com/questions/27491606/how-to-create-a-linux-compatible-zip-archive-of-a-directory-on-a-mac) - Unzip multi-chunk gunziped tar archive

* virtualenv - Virtual environments for python

	* `virtualenv -p /usr/bin/python2.7 venv --no-site-packages` - Create a virtual python2.7 environment inside *venv* 

* zip

	* `zip -r <TARGET_.zip> <SOURCE_FOLDER>/` [1](http://unix.stackexchange.com/questions/57013/zip-all-files-in-directory) - Zip folder recursively
	* `zip -r -s 3g archive.zip FolderName/` [1](http://www.addictivetips.com/mac-os/how-to-create-a-split-zipped-archive-from-mac-os-x-terminal/) - Split into multiple chunks

## Language environments

* [Python](#python)
* [Ruby](#ruby)
* [Java](#java)
* [Scala](#scala)

----

### Python

* pip - Python package manager

	* `pip install ansible` - Install package
	* `pip install -r requirements.txt` - Install all packages listed in requirements.txt

### Ruby

* rbenv
	
	* `rbenv install -l` - List Ruby versions available
	* `rbenv install 2.4.1` - Install Ruby version
	* `rbenv versions` - Show locally installed and available versions
	* `rbenv global 2.4.1` - Make version the default

### Java

* jar

	* `jar xf MY_JOB.jar` [1](https://stackoverflow.com/questions/39563843/how-to-extract-the-source-code-from-a-jar-file-on-a-mac) - Unpack files from jar (ATTENTION: happens inside current folder!)

### Scala

* sbt

	* `sbt console` - Starts interactive console for Scala
	* `sbt compile test` - Compile an application and run tests for it
	* `sbt evicted` - Shows dependency conflicts
	* `sbt "inspect tree clean"` [1](https://stackoverflow.com/questions/25519926/how-see-dependency-tree-in-sbt) - See dependency tree

* activator

	* You first have to run `activator` to initialize, then you can run commands for the project.

		* `clean` - Cleans project and deletes compiled binaries
		* `compile` - Compiles the application source
		* `evicted` - Shows dependency conflicts
		* `test` - Run the projects tests
		
## Configuration management

* [Ansible](#ansible)
* [Chef](#chef)

----

### Ansible

* ansible-playbook - Runs Ansible playbooks

	* `ansible-playbook site.yml -i localhost, --connection=local`

### Chef

* berks
	* `berks install` - Updates cookbook dependencies (pessimistic)
	* `berks update` - Updates cookbook dependencies to latest lib version (optimistic)
	* `berks upload` - Uploads local cookbook and its dependencies to chef server
		
		* `berks upload --no-freeze` - Upload cookbook but allowing a later change

* chef-client
	* `chef-client -W` - Test run without actually changing anything

* chef-server-ctl
	* `chef-server-ctl user-create <LOGIN_NAME> <FIRST_NAME> <SECOND_NAME> <EMAIL> <PASSWORD> -f </tmp/KEY_FILE.pem>`- Create user
	* `chef-server-ctl user-delete <LOGIN_NAME>` - Delete user
	* `chef-server-ctl org-user-add -a <ORGA> <LOGIN_NAME>` - Add user into organization using chef ACL

* knife
	* knife configuration in `~/.chef/knife.rb``

	```
	log_level                :info
	log_location             STDOUT
	node_name                'lony'
	client_key               '/Users/lony/.chef/lony.pem'
	validation_client_name   'chef-validator'
	validation_key           '/etc/chef-server/chef-validator.pem'
	chef_server_url          'https://chef-server.lony/organizations/de'
	syntax_check_cache_path  '/Users/lony/.chef/syntax_check_cache'

	knife[:editor] = 'vim'
	knife[:vault_mode] = 'client'
	knife[:vault_admins] = %w(lony aorange)
	```

	* `knife node list` - Show systems
	* `knife node from file nodes/<MASCHINE_NAME>.rb` - Loads local node configuration to Chef server
	* `knife data bag list`
	* `knife data bag show <DATA_BAG_FOLDER> <DATA_BAG_FILE> --format=json`
	* `knife data bag show <DATA_BAG_FOLDER> <DATA_BAG_FILE> -z --secret-file <SYMMETRIC_SECRET_KEY> -Fjson` - Shows locally stored encrypted data bag
		* `-z` - Local chef mode, uses local files
			* HINT: Needs chef-repo structure as on the server
		* `--secret-file` - Specifies symmetric key used to encrypted and decrypted
		* `-Fjson` same as `--format=jso` - Output data as JSON

	* `knife vault list`
	* `knife vault show <DATA_BAG_FOLDER> <DATA_BAG_FILE>`
	* `knife vault show <DATA_BAG_FOLDER> <DATA_BAG_FILE> -p admins`
	* `knife vault create <DATA_BAG_FOLDER> <DATA_BAG_FILE> -A lony -M client  -S "*:*"`
	* `knife vault update <DATA_BAG_FOLDER> <DATA_BAG_FILE> -A $(for f in $(knife user list); do echo -n ",$f"; done | sed 's/,//')`
	* `knife cookbook download -s "https://<SERVER_URL>" <COOKBOOK_NAME> 0.3.0`
	* `knife status` [1](https://www.digitalocean.com/community/tutorials/how-to-manage-your-cluster-with-chef-and-knife-on-ubuntu) - Shows infos about node as last successfull chef-client
	* `knife search node "fqdn:web*-?.* OR fqdn:app-1" -i` [1](https://docs.chef.io/knife_search.html) - Searches for nodes in chef-server registry
	* `knife ssh "fqdn:web*-?.*" "lsb_release -r && uname -rv"` - Show Ubuntu release and kernel for all web servers

		* `knife ssh 'name:jenkins-*' 'curl -L https://www.opscode.com/chef/install.sh | sudo bash -s -- -v 12.19.36'` [1](http://ionrails.com/2013/04/19/downgrading-chef-client/) - Update chef version on all jenkins-* hosts

* kitchen
	* `kitchen create` - Create instance/container using provisioner
	* `kitchen converge` - Runs chef on the instance/container
	* `kitchen verify` -  Runs tests on the instance/container
	* `kitchen test` - Does all togehter and at the end drops container
	* `kitchen login` - Opens shell into instance/container
	* `kitchen list` - Lists instance/container

## Package management

* apt [1](http://askubuntu.com/questions/705885/difference-between-dpkg-i-and-apt-get-install), [2](http://askubuntu.com/questions/309113/what-is-the-difference-between-dpkg-and-aptitude-apt-get) - Debian/Ubuntu package manager (including dependencies)

	* `apt-get update` -  Update is used to re-synchronize the package index files from their sources via Internet
	* `apt-get upgrade` - Upgrade is used to install the newest versions of all packages currently installed on the system

		* `apt-get upgrade -s | grep -i security` [1](https://serverfault.com/questions/424486/how-to-get-a-list-of-security-updates-on-the-command-line-in-debian-ubuntu) - List security updates available for system

			* `-s` is the same as `--dry-run` - Just run in simulation mode

	* `apt-get install --only-upgrade linux-generic`
	* `apt-get autoremove --purge`
	* `apt-get upgrade --dry-run` [1](http://askubuntu.com/questions/99834/how-do-you-see-what-packages-are-available-for-update)
	* `apt-get dist-upgrade` [1](https://www.cyberciti.biz/faq/how-do-i-update-ubuntu-linux-software) - Update newer version of distribution
	* `apt-cache policy` [1](http://stackoverflow.com/questions/8647454/how-to-get-a-list-of-repositories-apt-get-is-checking), [2](https://wiki.ubuntuusers.de/sources.list/) - Show list of repositories

* aptitude [1](http://unix.stackexchange.com/questions/767/what-is-the-real-difference-between-apt-get-and-aptitude-how-about-wajig), [2](https://wiki.ubuntuusers.de/aptitude/) - cli GUI for package management

	* `aptitude update` - Update is used to re-synchronize the package index files from their sources via Internet
	* `aptitude upgrade` - Upgrade is used to install the newest versions of all packages currently installed on the system

* dpkg - Debian/Ubuntu package manager (without dependencies)

	* `dpkg -l`

* `sudo update-alternatives --config java` - Set default Java version on system

## Version control systems

To get a general overview see [Version control systems](https://en.wikipedia.org/wiki/Version_control) (VCS)

* git [1](https://git-scm.com/) - Distributed VCS

	* Status & Log

		* `git status` - Show extensive information about a branch
		* `git status -s` - Show short information
		* `git diff` - Show changed differences
		* `git diff --cached` - Show changed differences which are already cached
		* `git log --graph --pretty=format:"%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset" --abbrev-commit` - Show nicely formated log (adding `-p` makes it more extensive)

	* Ignore

		* `git update-index --assume-unchanged FILE_NAME` [1](http://stackoverflow.com/questions/9794931/keep-file-in-a-git-repo-but-dont-track-changes) - Ignore file for comparison (HINT: only set locally on repository)
		* `git update-index --no-assume-unchanged FILE_NAME` - Regard file again for comparison

	* Remote

		* `git remote -v` - Show remotes
		* `git remote set-url origin git@github.com:USERNAME/REPOSITORY.git` [1](https://help.github.com/articles/changing-a-remote-s-url/) - Change remote

	* Branch

		* `git checkout -b NEW_BRANCH_NAME` [1](https://stackoverflow.com/questions/3899627/create-git-branch-with-current-changes) - Creates new branch from the existing one currently in, and also copies over changes made
		* `BRANCH=$(git show-ref | grep $(git rev-parse HEAD) | grep remotes | grep -v HEAD | sed -e 's/.*remotes.origin.//' | head -n1)` [1](https://stackoverflow.com/questions/14985563/how-to-retrieve-the-git-branch-name-that-was-built-by-jenkins-when-using-inverse) - Get branch currently on
		* `git checkout -b newBranch v1.0-oldTag` - Create git branch from tag or commit-hash
		* `git push -d <remote_name> <branch_name> && git branch -d <branch_name>` [1](https://stackoverflow.com/questions/2003505/how-do-i-delete-a-git-branch-both-locally-and-remotely) - Delete branch local and remote

	* Tag

		* `git tag -n9` [1](https://stackoverflow.com/questions/5358336/have-git-list-all-tags-along-with-the-full-message) - List all tags along with annotation message
		* `git tag -a 1.0 -m 'Init Release'` - Create git tag with annotation
		* `git push --delete origin TAGNAME && git tag --delete TAGNAME` [1](https://stackoverflow.com/questions/5480258/how-to-delete-a-git-remote-tag) - Delete local and remote tag
		* `TAG_NAME="weg-damit"; git tag -d ${TAG_NAME} && git push origin :refs/tags/${TAG_NAME}` [1](https://nathanhoad.net/how-to-delete-a-remote-git-tag) - Delete tag locally and remote

	* Commit

		* `git add .` - Stage all modifications for commit
		* `git commit --allow-empty -m 'Msg to do'` [1](https://coderwall.com/p/vkdekq/git-commit-allow-empty) - Commit without change
		* `FILE="<FILE_PATH>"; COMMIT_HASH=$(git rev-list -n 1 HEAD -- "${FILE}") && git checkout ${COMMIT_HASH}^ -- "${FILE}"` [1](https://stackoverflow.com/questions/953481/find-and-restore-a-deleted-file-in-a-git-repository) - Restore file deleted in previous commit
		* `git commit --amend` [1](https://www.atlassian.com/git/tutorials/rewriting-history) - Change last commit message

	* Pull, Fetch & Push

		* `git pull` [1](https://git-scm.com/docs/git-pull) - Fetch from remote repository
		* `git fetch --prune --tags` [1](https://git-scm.com/docs/git-fetch) - Fetch remote tags, delete left over local ones
		* `git fetch origin && branch_name=$(git symbolic-ref -q HEAD) && branch_name=${branch_name##refs/heads/} && branch_name=${branch_name:-HEAD} && git reset --hard origin/$branch_name && git checkout -- . && git clean -df` - Fetch the hole repository fresh (CAUTION!) 
		* `git for-each-ref --format '"'"'%(refname:short)'"'"' refs/heads | grep -v '"'"'\*\|master\|develop'"'"' | xargs git branch -D` - Fetch the branch fresh (CAUTION!)
		* `git push` [1](https://git-scm.com/docs/git-push) - Push local changes to remote repository
		* `git push origin --tags` - Push local tags to remote repository

	* Merge & Rebase & Cherry-pick

		* `git merge master feature` [1](https://www.atlassian.com/git/tutorials/merging-vs-rebasing) - Merges MASTER branch into FEATURE one
		* `git rebase master` [1](https://www.atlassian.com/git/tutorials/merging-vs-rebasing) - Moves the current branch's "starting commit" to current master head (allowing fast forward merge)
		* `git cherry-pick COMMIT_HASH` [1](https://stackoverflow.com/questions/9339429/what-does-cherry-picking-a-commit-with-git-mean), [2](https://git-scm.com/docs/git-cherry-pick) - "Copy" commit from another branch to the current branch
		
	* Stash

		* `git stash` [1](https://git-scm.com/docs/git-stash) - Stores changes done in branch away for later use

			* `-k` - Ignores files already added to staging environment (aka `--keep-index`)
			* `-u` - Includes un-tracked files (aka `--include-untracked`)

		* `git stash pop` - Restores, last stashed changes back to branch

	* Revert

		* `git revert --no-commit 0766c053..HEAD && git commit` [1](https://stackoverflow.com/questions/4114095/how-to-revert-git-repository-to-a-previous-commit) - Reverts range of commits and makes commit with all reverting changes (like a patch)
		* `git reset --hard COMMIT_HASH && git push origin master --force` [1](https://stackoverflow.com/questions/12305668/how-to-delete-commit-that-is-pushed-to-the-remote-repository), [2](https://git-scm.com/blog), [3](https://stackoverflow.com/questions/2530060/can-you-explain-what-git-reset-does-in-plain-english), [4](https://git-scm.com/docs/git-reset) - Delete local history till certain commit and then overwrites remote history too [THIS IS DANGEROUS!!]

	* Move

		* `git filter-branch --prune-empty --subdirectory-filter SUB-FOLDER-NAME BRANCH-NAME` [1](https://help.github.com/articles/splitting-a-subfolder-out-into-a-new-repository/) - Filter folder from repository to extract for separate repository
		* `git worktree prune && git worktree add -B master public origin/master` - Prune aka clean and checkout master branch into public folder [1](https://gohugo.io/hosting-and-deployment/hosting-on-github/#put-it-into-a-script), [2](https://stacktoheap.com/blog/2016/01/19/using-multiple-worktrees-with-git/), [3](https://spin.atomicobject.com/2016/06/26/parallelize-development-git-worktrees/), [4](https://git-scm.com/docs/git-worktree)

	* Backup

		* `git archive --format zip master -o my_repo.zip` [1](https://alvinalexander.com/git/git-export-project-archive-cvs-svn-export), [2](https://stackoverflow.com/questions/160608/do-a-git-export-like-svn-export) - Create zip archive from repository only including its content
		* `git bundle` - Create archive with history

			* `git bundle create my_repo.bundle --all` [1](https://stackoverflow.com/questions/11879287/export-git-with-version-history) - Create archive from repository including also the history (of commited staff [1](https://stackoverflow.com/questions/7639952/whats-the-difference-between-bundling-and-zipping-a-git-repo))
			* `git bundle verify my_repo.bundle && git clone my_repo.bundle` [1](https://stackoverflow.com/questions/9807367/restoring-git-repository-from-bundle-backup) - Restore repository from archive


# Processes

* atop [1](http://www.tecmint.com/how-to-install-atop-to-monitor-logging-activity-of-linux-system-processes/) - System & Process Monitor like top or htop

* df - Display free disk space

	* `df -h` - Show space used
	* `df -i` [1](https://stackoverflow.com/questions/653096/how-to-free-inode-usage) - Show inode usage

* du

	* `du -h --max-depth=1 /`
	* `du -a /var | sort -n -r | head -n 10` [1](https://www.cyberciti.biz/faq/how-do-i-find-the-largest-filesdirectories-on-a-linuxunixbsd-filesystem/) - List 10 biggest folders or files in /var

* glances [1](https://nicolargo.github.io/glances/) - A top/htop alternative

* htop [1](https://codeahoy.com/2017/01/20/hhtop-explained-visually) - Interactive process monitor

* iotop [1](http://guichaz.free.fr/iotop/), [2](http://www.tecmint.com/iotop-monitor-linux-disk-io-activity-per-process/) - System I/O monitor like top

* `sudo initctl restart apache` [1](https://wiki.ubuntu.com/SystemdForUpstartUsers),[2](http://upstart.ubuntu.com/) - Restart command for upstart (using /etc/init)

* lsof [1](https://en.wikipedia.org/wiki/Lsof) - list of open files

	* `sudo lsof -i` - All internal network files
	* `sudo lsof | grep jre`
	* `sudo lsof -i -n -P | grep LISTEN`

* oc [1](https://github.com/openshift/origin) - OpenShift CLI tool

	* `oc login https://YOUR_CLUSER --token=YOUR_SECRET_TOKEN` - Login to your cluster
	* `oc port-forward POD_NAME 80:80` - Map port from pod to local system
	* `oc rsh POD_NAME` - Open secure shell session

* ps [1](https://en.wikipedia.org/w/index.php?oldid=765270359) - Static process monitor 

* screen [1](https://en.wikipedia.org/wiki/GNU_Screen) - terminal multiplexer
	
	* `screen <COMMAND>` - Start command in screen session

		* Press (Strg + a + d) - Detach running session [1](https://nathan.chantrell.net/linux/an-introduction-to-screen/)

	* `screen -ls` - List screen sessions
	* `screen -r` - Resume last running screen session
	* `screen -r -d 30608` - Resume already attached session [1](http://unix.stackexchange.com/questions/240444/cant-resume-screen-says-i-am-already-attached)
	* `screen -dmS <SESSION_NAME> <COMMAND>` - Starts screen in detached mode using the given session name and command

* `sudo service apache restart` - Restart command for System V (using /etc/init.d)

* tmux [1](https://en.wikipedia.org/wiki/Tmux) - Terminal multiplexer

	* `tmux list-key` [1](https://til.hashrocket.com/posts/385fee97f3-list-all-tmux-key-bindings) - List all key bindings
	* `tmux new -s SESSION_NAME` [1](https://gist.github.com/MohamedAlaa/2961058) - Create a new session
	* `tmux ls` - List sessions
	* `tmux detach` [1](https://danielmiessler.com/study/tmux) - Detach session
	* `tmux a` or `tmux a -t SESSION_NAME` - Reattach session
	* `tmux kill-session -t SESSION_NAME` - Kill the session
	* Key bindings (default) [1](https://tmuxcheatsheet.com/)
		* `Ctrl + b` - Default prefix (Ctrl = Strg key)
			* Hint: The prefix is pressed and then released, after this the specific key combo can be pressed for example `Ctrl + b` then `c`.
		* Session
			* `$` - Rename session
			* `d` - Detach session
			* `(` - Previous session
			* `)` - Next session
		* Window
			* `c` - Create new window
			* `,` - Rename window
			* `&` - Close window
			* `p` - Previous window
			* `n` - Next window
			* `0...9` - Switch to window number
		* Pane
			* Use arrow keys to switch to another pane
			* `;` - Toggle last active pane
			* `%` - Split pane vertically
			* `"` - Split pane horizontally
			* `{` - Shuffle current pane to left
			* `}` - Shuffle current pane to right
			* `space` -  Toggle between pane layouts
			* `o` - Next pane
			* `q` - Show pane numbers
			* `q 0...9` - Switch to pane number
			* `z` - Toggle pane zoom (full screen)
			* `!` - Convert pane to window
			* `x` - Close current pane
			* `M + Arrow key` - Resize pane (M = Alt key)

* top [1](https://en.wikipedia.org/w/index.php?oldid=758781701) - Real-time task manager
* tree [1](https://en.wikipedia.org/w/index.php?oldid=766877590) - Recursive directory listing program

	* `tree -d -L 2`

## Docker

* `docker pull jenkins:2.32.1` - Download docker image from registry
* `docker build -t "tagIt" .` - Build an image from a Dockerfile

	* `--no-cache` [1](https://stackoverflow.com/questions/35594987/how-to-force-docker-for-clean-build-of-an-image) - Build from scratch

* `docker run -p 8080:8080 jenkins:2.32.1` - Starts existing docker image and maps port
* `docker run -it -d shykes/pybuilder /bin/bash` [1](http://stackoverflow.com/questions/26153686/how-to-run-a-command-on-an-already-existing-docker-container) - Run image and start bash
* `docker exec -it f151aff2b21e /bin/bash` - Starts docker image f151aff2b21e and open interactive shell
* `docker ps -a` - List instances (derived from images)
* `docker rm -f 2247780d0b39` - Delete instance
* `docker images` - List images
* `docker rmi ae12afb99714 a78344b99ebc` - Delete images
* `docker inspect jenkins` - Show information of the docker image object

	* `docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' 942e216109c6` [1](https://stackoverflow.com/questions/17157721/how-to-get-a-docker-containers-ip-address-from-the-host) - Get IP address of docker container

* `docker rm $(docker ps -a -q)` [1](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes) - Remove all containers
* `docker rmi $(docker images -a -q)` - Remove all images
* `docker system prune -a` [1](https://docs.docker.com/engine/reference/commandline/system_prune/) - Remove everything
* `docker network ls` [1](https://docs.docker.com/engine/userguide/networking/) - Show docker networks
* `docker network inspect bridge` - Show network information about the bridge network

## Vagrant

* `vagrant global-status` - Show existing VMs
	
	* `vagrant global-status --prune` - [1](http://stackoverflow.com/questions/24611902/remove-vagrant-box-from-global-status-after-deleting-it-from-filesystem) Update vagrant cache

* `vagrant up` - Create VM from scratch

	* `export VAGRANT_LOG=debug; vagrant up` - Change vagrant log level

* `vagrant provision` - Create VM using existing Vagrantfile
* `vagrant destroy -f 1f7d3b6`	- Delete VM

	* `vagrant destroy -f` - Destroy without confirmation

* `vagrant ssh`	- SSH into the VM

	* `vagrant ssh-config <NAME_OR_ID_OF_VM> | awk -v ORS=' ' '{print "-o " $1 "=" $2}'` - Get parameter to scp into VM

* `vagrant plugin list` - Show vagrant plugins
* `vagrant plugin install vagrant-vbguest vagrant-cachier vagrant-share vagrant-triggers` - Install vagrant plugins

## VirtualBox

* `VBoxManage list runningvms | awk '{print $2;}' | xargs -I {} VBoxManage controlvm {} poweroff` - [1](http://stackoverflow.com/questions/15408969/how-do-i-destroy-a-vm-when-i-deleted-the-vagrant-file) Halt all running virtual boxes 

* `VBoxManage list vms | awk '{print $2;}' | xargs -I {} VBoxManage unregistervm {}` - Clean ALL virtual boxes

* `VBoxManage setproperty machinefolder ${BASE_TMP_FOLDER}` - [1](http://superuser.com/questions/599421/how-to-move-the-default-folder-for-headless-virtualbox) Switch vagrant box folder

# User environment

* `ldapsearch -H ldap://<SERVER_URL> -w <PASSWORD> -D cn=readonly,dc=lony "(&(objectClass=user)(cn=prod))"` - Command to query LDAP server

* `shutdown -rf now`

* who [1](https://en.wikipedia.org/w/index.php?oldid=731053985) - Display users logged in

	* `who -r` - Show runlevel

# Text processing

* diff - Compare text files

	* `diff <(echo "${S1}") <(echo "${S2}")` [1](https://stackoverflow.com/questions/13437104/compare-content-of-two-variables-in-bash) - Compare two text parameters

* head - Show beginning of file

	* `head -2 large_file` - Shows only first two lines

* jq [1](https://stedolan.github.io/jq/) - CLI JSON processor

* tail - Show ending of file

	* `tail -f collectd.log | grep -E --color=auto '*Value too old*'` [1](https://unix.stackexchange.com/questions/8414/how-to-have-tail-f-show-colored-output), [2](https://unix.stackexchange.com/questions/106565/how-to-highlight-a-word-in-the-output-of-cat) - Show log output continuously highlighting specific words
	* `tail -f collectd.log | grep -E --color=auto '*Value too old*' | sed 's/.*name = \(.*\); value.*/\1/' | awk '{ print length($0); }` [1](http://stackoverflow.com/questions/3532718/extract-string-from-string-using-regex-in-the-terminal), [2](http://stackoverflow.com/questions/8786634/how-to-print-the-number-of-characters-in-each-line-of-a-text-file) - Search for pattern regex string and count characters

* xargs [1](https://www.cyberciti.biz/faq/linux-unix-bsd-xargs-construct-argument-lists-utility/) - Sub-list generator 

## Vim

The one and only `vim` aka [Vi IMproved](https://en.wikipedia.org/w/index.php?oldid=801583579).

* Edit shell commands in vim [1](http://nuclearsquid.com/writings/edit-long-commands/)
* Debug loading times [1](http://kynan.github.io/blog/2015/07/31/how-to-speed-up-your-vim-startup-time), [2](https://puroh.it/speeding-up-vim/), [3](http://www.gbonfant.com/blog/speed-up-performance-of-iterm-and-vim)

* Plugins
	* Search for
		* [vimawesome.com](https://vimawesome.com/)
	* Manage them
		* [vim-plug](https://github.com/junegunn/vim-plug)

# Shell bulletins

# Networking

* curl - Client for URLs

	* `curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{ "username" : "xxx", "pw" : "xxx"}' "http://localhost:8080/user/authenticate"`
	* `curl -X GET --proxy http://proxy:8080 "http://www.google.de"` - Use a proxy
	* `curl -s -o /dev/null -w "%{http_code}" http://www.example.org` [1](https://superuser.com/questions/272265/getting-curl-to-output-http-status-code) - Just get status code

* dig - DNS querying tool using OS resolver

	* `dig +short myip.opendns.com @resolver1.opendns.com` [1](http://unix.stackexchange.com/questions/22615/how-can-i-get-my-external-ip-address-in-a-shell-script) - Retrieve your external IP address using DNS
	* `dig getgoetz.com ANY +noall +answer` - Show all DNS entries

* httpie [1](https://httpie.org/),[2](https://github.com/jkbrzt/httpie) - Better curl with JSON support

* ifconfig [1](https://en.wikipedia.org/wiki/Ifconfig) - Display network interface configuration for Unix-systems

	> Command is deprecated on Linux in favour of iproute2 and the `ip` command, which now should be used instead. [1](https://serverfault.com/questions/458628/should-i-quit-using-ifconfig)

* ip [1](https://en.wikipedia.org/wiki/Iproute2), [2](https://serverfault.com/questions/458628/should-i-quit-using-ifconfig) - Also iproute2 utilities, is a tool to controll and monitor network aspects of Linux systems

	* `ip link` - List available interfaces
	* `ip link set eth0 up` - Activate eth0 interface [1](https://wiki.gentoo.org/wiki/Iproute2)
	* `ip addr` - Show IP address
	* `ip addr add 192.0.2.11/24 dev eth0` - Add IP address to eth0 interface
	* `ip -6 addr add 2001:db8::10/64 dev wlan0` - Add IPv6 address to wlan0 interface
	* `ip link set eth0 down` -  Deactivate interface
	* `ip route` - Show IP routing table
	* `ip route add default via 192.0.2.1` - Add default route
	* `ip neighbour` - Show neighbour in your network similar to `arp -a`
	* `ip -s` or `ss` - Show network statistics like `netstat`

* ipcalc [1](https://pypi.python.org/pypi/ipcalc) - IP subnet calculator

* iperf3 [1](http://software.es.net/iperf/) - Tool for network speed test

	* `iperf3 -s` - Starts listening server mode
	* `iperf3 -cR IP_ADDR` - Starts a client TCP test using reverse testing

* iftop [1](http://www.integralist.co.uk/posts/terminal-debugging-utilities/#10) - Monitor network traffic and show bandwith usage

* iptraf [1](http://unix.stackexchange.com/questions/71456/check-outgoing-network-traffic) - Network statistic tool

* netcat aka nc - Tool to read and write from network connections

	* `nc -vz external.host 6379` - Just test Redis port with verbose output
	* `netcat -vv localhost 3306`

* netstat - Host based network statistic tool 

	* `sudo netstat -tulpn | grep LISTEN`
	* `sudo netstat -an | grep 8080 | grep ESTABLISHED`

* ngrep [1](https://en.wikipedia.org/wiki/Ngrep) - Similar to tcpdump

* nmap [1](https://www.digitalocean.com/community/tutorials/how-to-test-your-firewall-configuration-with-nmap-and-tcpdump) - Network mapping and port scanning tool

	* `nmap -n -sn 192.168.1.0/24` [1](https://superuser.com/questions/261818/how-can-i-list-all-ips-in-the-connected-network-through-terminal-preferably) - Show up hosts in network

		* `n` - No DNS resolution
		* `sn` - Ping scan, no port scan

	* `nmap -n -sn 192.0.2.0/24 -oG - | awk '/Up$/{print $2}'` [1](https://unix.stackexchange.com/questions/181676/output-only-the-ip-addresses-of-the-online-machines-with-nmap) - Get up hosts IP adresses

		* `-oG -` - Print grep'able output

* `nscd -i hosts` [1](http://serverfault.com/questions/16299/how-do-i-flush-the-dns-cache-on-win-mac-linux-computers) - Flush DNS cache

* nslookup [1](https://en.wikipedia.org/wiki/Nslookup),[2](http://unix.stackexchange.com/questions/93808/dig-vs-nslookup) - DNS querying tool incl. own resolver

* ntop [1](https://en.wikipedia.org/wiki/Ntop) - Interactive network monitor

* ntpdate 

	* `ntpdate -q de.pool.ntp.org` - Query NTP service without changing something

* route [1](https://en.wikipedia.org/w/index.php?oldid=749414632) - View IP routing table of host (replaced with `iproute2`)

* scp - secure copy

	* `scp server:source/ dest/` - Copy from external server to local

* tcpdump [1](http://packetpushers.net/masterclass-tcpdump-interpreting-output/) - Packet analyzer

	* `tcpdump -nvvvp -i any -c 100 -s 1500 -w /tmp/capture.file.pcap` [1](http://bencane.com/2014/10/13/quick-and-practical-reference-for-tcpdump/) - Write first 1500 bytes of the first 100 packages to PCAP file which are coming from any device

		* `-n` - Do not translate hostnames (use ips)
		* `-v` - Verbosity (max. vvv)
		* `-p` - Don't put the interface into promiscuous mode
		* `-i` - Interface to use (any for all)
		* `-c` - Exit after amount of packets
		* `-s` - Truncates bytes of data for each package
		* `-w` - Store PCAP file of dump

	* `tcpdump -A 'port 80 and host 192.168.0.1'` [1](https://danielmiessler.com/study/tcpdump/) - Print package output in ANSII format
	* `tcpdump host 10.0.3.1` - Capture only if source and destination ip is 10.0.3.1
	* `tcpdump src host 10.0.3.1` - Capture only if source ip is 10.0.3.1
	* `tcpdump dst port 80` - Caputre only if destination port is 80
	* `tcpdump (src net 10.0.0.144/28) and not(dst host 10.20.0.251)` [1](http://serverfault.com/questions/354102/tcpdump-filter-on-network-and-subnet-mask)  - Captue only traffic which is from specific network and not going to a specific host
		* Hint: Use lowest IP for range to avoid `tcpdump: non-network bits set in “10.0.0.145/28"` error [1](http://stackoverflow.com/questions/10300656/capture-incoming-traffic-in-tcpdump)
	* `tcpdump 'tcp[tcpflags] & tcp-syn != 0'` [1](http://www.tcpdump.org/manpages/pcap-filter.7.html), [2](https://syedali.net/2014/12/29/tcp-flags-explained/), [3](https://danielmiessler.com/study/tcpflags/) - Use PCAP-filters to capture start (SYN) packets of TCP conversation
	* `tcpdump 'tcp[tcpflags] & (tcp-syn) != 0 and tcp[tcpflags] & (tcp-ack) == 0 or udp'` - Capture tcp SYN but not SYN-ACK and also udp packets

* trace aka traceroute [1](https://en.wikipedia.org/wiki/Traceroute) - Display route for transit of packets across IP network

* vnstat [1](https://wiki.ubuntuusers.de/vnStat/),[2](http://www.thegeekstuff.com/2011/11/vnstat-network-traffic-monitor/) - Network traffic monitor

## Apache2

* apachectl
	* `apachectl -t` [1](https://serverfault.com/questions/541171/apache2-require-all-granted-doesnt-work) - Test syntax of config files
	* `apachectl -S` - Show which files are beeing parsed


## iptables

 iptables [1](https://en.wikipedia.org/wiki/Iptables), [2](https://manpages.debian.org/jessie/iptables/iptables.8.en.html), [3](https://wiki.archlinux.org/index.php/iptables) - IPv4 firewall interface for Linux

* Overview of packet traversing (or [graph](http://jekor.com/gressgraph/) your own), Source: [Pencil file](/img/2017/commands/iptables.ep)
![iptables overview](/img/2017/commands/iptables.png)	

* `iptables -nvL` [1](https://www.digitalocean.com/community/tutorials/how-to-list-and-delete-iptables-firewall-rules) - Show existing rules

	* `-n` - Numeric output, do not resolve host names
	* `-v` - Verbose output
	* `-L [CHAIN]` - List all rules in optional chain

* `iptables -F` or `iptables --flush` - Delete all existing rules
* `iptables -P OUTPUT DROP` - DROP all outgoing traffic

	* `-P CHAIN TARGET` - Set policy for chain to given target (e.g. ACCEPT, REJECT, DROP or RETURN)

* `iptables -A OUTPUT -d 192.30.0.0/17 -j DROP` - Drop only outgoing traffic to specified subnet

	* `-A OUTPUT` - Append rule to OUTPUT chain
	* `-d DEST` - Destination e.g. address, hostname, network name
	* `-j TARGET` - Specifies target of rule; i.e. what to do if packet matches.

* `iptables -A OUTPUT -s 192.20.0.1 -j DROP` [1](https://www.linode.com/docs/security/firewalls/control-network-traffic-with-iptables) - Drop outgoing traffic only to specified IP address

	* `-s SRC` - Source e.g. address, hostname, network name

* `iptables -I OUTPUT -p tcp --dport 80 -m state --state NEW -j LOG -m limit --limit 5/m --limit-burst 1 --log-uid --log-prefix "IPTABLES-OUTBOUND-P80: " --log-level 4` - LOG outgoing traffic to port 80 into `/var/log/kern.log`

* `iptables -A INPUT -p tcp --dport 80 -m limit --limit 25/minute --limit-burst 100 -j ACCEPT` [1](https://crm.vpscheap.net/knowledgebase.php?action=displayarticle&id=29) - Prevent DoS Attack

	* `-m limit` - Use limit iptables extension
	* `–limit 25/minute` - Limit to only 25 connections per minute
	* `–limit-burst 100` - The limit per minute will only be enforced if the total number of connections have reached this burst limit

* Allow incoming SSH connections only from specified subnet

	```
	iptables -A INPUT -i eth0 -p tcp -s 192.168.100.0/24 --dport 22 -m state --state NEW,ESTABLISHED -j ACCEPT
	iptables -A OUTPUT -o eth0 -p tcp --sport 22 -m state --state ESTABLISHED -j ACCEPT
	```

* Combine rules using multiport

	```
	iptables -A INPUT -i eth0 -p tcp -m multiport --dports 22,80,443 -m state --state NEW,ESTABLISHED -j ACCEPT
	iptables -A OUTPUT -o eth0 -p tcp -m multiport --sports 22,80,443 -m state --state ESTABLISHED -j ACCEPT
	```

* Load balance incoming traffic

	```
	iptables -A PREROUTING -i eth0 -p tcp --dport 443 -m state --state NEW -m nth --counter 0 --every 3 --packet 0 -j DNAT --to-destination 192.168.1.101:443
	iptables -A PREROUTING -i eth0 -p tcp --dport 443 -m state --state NEW -m nth --counter 0 --every 3 --packet 1 -j DNAT --to-destination 192.168.1.102:443
	iptables -A PREROUTING -i eth0 -p tcp --dport 443 -m state --state NEW -m nth --counter 0 --every 3 --packet 2 -j DNAT --to-destination 192.168.1.103:443
	```

## Secure Shell command (ssh)

* [Setup SSH](#setup-ssh)
* [Agent Support](#agent-support)
* [Agent Forwarding](#agent-forwarding)
* [Application](#application)

----

### Setup SSH

#### Generate Keys

`ssh-keygen -t rsa -b 4096 -C "<YOUR@EMAIL.COM>" -N "" -f <TARGET_FILE>`
This generate a key without a password `-N ""` and with the email as a label [1](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

#### Add target URL/machine to known_hosts

- Remove the machine if already in known_hosts `ssh-keygen -R <URL>`
- Add the new machine `ssh-keyscan -t rsa <URL> >> ~/.ssh/known_hosts`

#### Get public key from private one

`ssh-keygen -y -f <PRIVATE_KEY>`

#### Get fingerprint from key

* For SHA print [1](http://stackoverflow.com/questions/9607295/how-do-i-find-my-rsa-key-fingerprint)
`ssh-keygen -lf ~/.ssh/id_rsa.pub`

* For MD5 print
`ssh-keygen -E md5 -lf ~/.ssh/id_rsa.pub`

*Hint* AWS keys are not fingerprinted as expected and use a different method see [1](http://serverfault.com/questions/603982/why-does-my-openssh-key-fingerprint-not-match-the-aws-ec2-console-keypair-finger).

#### Test connection

* `ssh -vT git@github.com` [1](http://stackoverflow.com/questions/2643502/git-permission-denied-publickey) - Testing GIT via SSH connection using verbose mode
* `ssh -T -o 'StrictHostKeyChecking=no' -o 'ConnectionAttempts=1' -vvv ec2-user@<URL> -i <KEY_FILE>`

### Agent Support

Keys are hard to handle, especially if they have a password. Thats were `ssh-agent` comes into play. Its a small tool which ones typed in, remembers your ssh keys password and lets you use the key without retyping the password over and over again.

#### List keys

To list all keys which are managed by the agent type `ssh-add -L`

#### Add key

To add a key to the agent use `ssh-add <PATH_TO_KEY>`

_Hint:_ On OSx you can also [move your key](http://www.stormacq.com/mac-os-x-makes-handling-ssh-keys-easier/) to the KeyChain of Mac.

### Agent Forwarding

If you have multiple host and want to jump from one to another without always copying you key to all the systems, which would be a security risk, you can use agent forwarding.

The principle is explained [here](http://unixwiz.net/techtips/ssh-agent-forwarding.html) in perfect detail, therefore only briefly explained: If you connect to another host and from there want to jump ones further, the key challenge is forwarded back to your client machine and if successfully propagated back to the target machine, instead of just using the keys available on the machine.

As perquisites agent forwarding needs `ssh-agent` on the client, which handles the key management. In your `~/.ssh/config` you have to allow `ForwardAgent yes` as also the server has to allow it.

_Hint:_ SSH agent forwarding is working nicely together with [Capistrano](http://capistranorb.com/documentation/getting-started/authentication-and-authorisation/) and can be setup like [1](http://blog.blenderbox.com/2013/02/20/ssh-agent-forwarding-with-github/) and [2](http://dchua.com/2013/08/29/properly-using-ssh-agent-forwarding-in-capistrano/).

### Application

* `ssh -L 27017:localhost:27017 ec2-FOO.eu-west-1.compute.amazonaws.com` [1](https://www.howtoforge.com/reverse-ssh-tunneling) - Tunnel Mongo port from local machine to ec2 machine using SSH
* `ssh -i ${SSH_KEY} -L ${PORT}:${TARGET_HOST}:${PORT} ec2-user@${BASTION_HOST} -N` - Tunnel port using a bastian host
* `ssh -i ${SSH_KEY} -T ${TARGET_HOST} 'bash -s' < your-bash-script.sh` - Run bash script on remote host (look up -T and -tt)

## Varnish

* varnishncsa [1](https://varnish-cache.org/docs/3.0/reference/varnishncsa.html) - Log in apache access format
* varnishlog [1](https://www.varnish-cache.org/trac/wiki/DebuggingVarnish) - Log including detailied HTTP data

# Searching

* find

	* `find / -type d -name "lony.github.io"` - Search for lony... folder in root
	* `find download/ -mtime +60  -delete` - Search in download-folder for files last modified before +60 and delete
	* `find /path/to/directory/ -mindepth 1 -mtime +365 -type f -name "*.tmp" -print` [1](http://unix.stackexchange.com/questions/194863/delete-files-older-than-x-days), [2](http://askubuntu.com/questions/413529/delete-files-older-than-one-year-on-linux), [3](http://stackoverflow.com/questions/5927369/recursively-look-for-files-with-a-specific-extension)
		then `find /path/to/directory/ -mindepth 1 -mtime +365 -type f -name "*.tmp" -delete`
	* `find /path/to/directory/ -mindepth 1 -maxdepth 1 -mtime +365 -type d -print -exec rm -r "{}" \;` - [1](http://unix.stackexchange.com/questions/89925/how-to-delete-directories-based-on-find-output), [2](http://askubuntu.com/questions/377438/how-can-i-recursively-delete-all-files-of-a-specific-extension-in-the-current-di) Delete directories recursivly
	* `find . -name '*.py' -exec grep -Hn 'STRING_INSIDE_PYHTON' {} \;` [1](https://unix.stackexchange.com/questions/21033/how-can-i-grep-the-results-of-find-using-exec-and-still-output-to-a-file) - Search for python files and inside them grep for given string. The result is shown with path and line number.
	* `find -E . \( -type f -or -type d \) -print| awk -F/ '{ if (length($NF)  > 143) { print length($NF),"\t",$0; fflush() } else {} }' > files_to_long` [1](https://unix.stackexchange.com/questions/207504/find-files-whose-name-is-4-characters-long) - Find files and folders which names are longer then 143 

* grep [1](https://www.cyberciti.biz/faq/grep-regular-expressions/)

	* `grep foo /home/lony/bar` - Search for foo in bar
	* `grep -E 'foo|bar' *.tx` [1](https://unix.stackexchange.com/questions/37313/how-do-i-grep-for-multiple-patterns) - Searching for multiple patterns
	* `grep -E --color=auto 'foo|bar' *.tx` - Highlight pattern found
	* `grep -e ERROR -e WARN YOURLOG.log | grep -v IgnoreException` - Searches in YOURLOG for ERRORs and WARnings but ignores your IgnoreException
	* `grep -r foo /home/lony/bar` - Search recursively for foo in bar
	* `grep -nr 'foo*' .` [1](http://stackoverflow.com/questions/4121803/how-can-i-use-grep-to-find-a-word-inside-a-folder) - Search for foo* in `.` showing relative line number
	* `zgrep foo /home/lony/log.1.gz | less` - Search inside gzip log file for foo
	* `grep 'IPTABLES-OUTBOUND-' /var/log/kern.log | sed 's/.* DST=\(.*\)[[:space:]]LEN.* DPT=\(.*\)[[:space:]]WINDOW.*/\1_\2/' | sort | uniq -c | sort -n` [1](http://stackoverflow.com/questions/6447473/linux-command-or-script-counting-duplicated-lines-in-a-text-file) - Extract log entry and count distinct occurence of IP_Port combinations by frequency
	* `grep 'version' package.json | sed 's/.*version": "\(.*\)".*/\1/g'` - Get version from package.json of node projekts

# Documentation

## Atlassian JIRA

* Filters

	* `assignee in (currentUser()) OR reporter in (currentUser()) OR watcher in (currentUser()) ORDER BY status` - Show all my ticket e.g. where I'm assigne, reporter or watcher
	* `(assignee in (currentUser()) OR reporter in (currentUser()) OR watcher in (currentUser())) AND status not in (Closed, Resolved, Done) ORDER BY status, priority` - All my open tickets

# Miscellaneous

* watch [1](https://en.wikipedia.org/w/index.php?oldid=725168377)

	* `watch -d=cumulative -n 5 'ls -lah | grep data.pcap'` [1](http://askubuntu.com/questions/430382/repeat-a-command-every-x-interval-of-time-in-terminal) - Runs ls every 5s and highlighting changes

		* `-d=cumulative` - Highlight differences that ever changed since start
		* `-n <SECONDS>` - Run every X seconds (default=2s)

## Shell

* [Detect shell](#detect-shell)
* [Shell types and frameworks](#shell-types-and-frameworks)
* [Setup](#setup)
* [Shebangs](#shebangs)
* [Programming sh](#programming-sh)
	* [array](#array)
	* [for](#for)
	* [if](#if)
	* [until](#until)
	* [pasting](#pasting)
	* [pipe](#pipe)
	* [read](#read)

----

### Detect shell

Check which shell is currently used?

`echo $SHELL` [1](http://askubuntu.com/questions/590899/how-to-check-which-shell-am-i-using), [2](http://stackoverflow.com/questions/9910966/how-to-tell-if-its-using-zsh-or-bash)

### Shell types and frameworks

* [bash](https://www.gnu.org/software/bash/)

	* Prompt

		```
		ERRORLEVEL TIME USER@HOST PATH #
		2 [14:03:07] lony@hobbes /var/log/upstart # echo $PS1
		$? \[\e[01;34m\][$(date "+%H:%M:%S")] \[\e[01;31m\]\u\[\e[1;34m\]@\[\e[1;31m\]\h\[\e[1;34m\] \w # \[\e[0m\]
		```

* [zsh](http://www.zsh.org/)

    * Frameworks

        1. [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)
        2. [prezto](https://github.com/zsh-users/prezto)
        3. [zim](https://github.com/Eriner/zim)

* [fish](/etc/shells)

    * `fish_config` - Configuration
    * Frameworks

        * [oh-my-fish](https://github.com/oh-my-fish/oh-my-fish)

### Setup

* To **bash** `chsh -s $(which bash)` or `chsh -s /bin/bash`
* To **zsh** `chsh -s $(which zsh)`

	* zsh on OSX [1](http://stackoverflow.com/questions/17648621/how-do-i-update-zsh-to-the-latest-version)

		1. Install zsh `brew install --without-etcdir zsh`
		2. Add shell path `sudo vim /etc/shells` add to end `/usr/local/bin/zsh`
		3. Change default shell `chsh -s /usr/local/bin/zsh`
		4. To reload shell settings use `exec zsh` [1](http://unix.stackexchange.com/questions/217905/restart-bash-from-terminal-without-restarting-the-terminal-application-mac)

* To **fish** `chsh -s $(which fish)`

	* fish on OSX [1](https://hackercodex.com/guide/install-fish-shell-mac-ubuntu)

		1. Install fish `brew install fish`
		2. Add shell path `echo "/usr/local/bin/fish" | sudo tee -a /etc/shells`
		3. Change default shell `chsh -s /usr/local/bin/fish`

### Shebangs

For an explanation why to use `env` read [1](https://en.wikipedia.org/wiki/Shebang_%28Unix%29#Portability)

* For **sh** `#!/usr/bin/env sh`
* For **bash** `#!/usr/bin/env bash`
* For **zsh** `#!/usr/bin/env zsh`
* For **fish** `#!/usr/bin/env fish`

### Programming sh

### array

* Concat array [1](http://stackoverflow.com/questions/9522631/how-to-put-line-comment-for-a-multi-line-command), [2](http://stackoverflow.com/questions/18599711/how-can-i-split-a-shell-command-over-multiple-lines-when-using-an-if-statement)

	```
	brew_packages=(
		ansible		# Comment1
		go		# Comment2
	)

	brew install "${brew_packages[@]}"
	```

### for

* `for i in "ci" "stage" "prod"; do (export ENVI=$i; echo $ENVI); done` [1](http://stackoverflow.com/questions/8880603/loop-through-array-of-strings-in-bash),[2](https://www.cyberciti.biz/faq/linux-unix-bash-for-loop-one-line-command/),[3](http://stackoverflow.com/questions/10856129/setting-an-environment-variable-before-a-command-in-bash-not-working-for-second)

* for + sleep, writing message every second [1](https://unix.stackexchange.com/questions/10646/repeat-a-unix-command-every-x-seconds-forever/10647#10647)

	````
	while true
	do 
		echo "Hi"
		sleep 1
	done
	````

### if

* Bash version => 4 [1](http://unix.stackexchange.com/questions/250778/should-i-check-bash-version)

	````
	if [[ ${BASH_VERSION%%.*} -lt 4 ]]; then
	echo "This script requires bash version > 4. Currently running is ${BASH_VERSION%%.*}"
	exit 1
	fi
	````

* Compare two string parameters `if [ "$S1" = "$S2" ]; then 	echo "YES"; else echo "FALSE"; fi`

### until

* `until ssh aws-host; do echo "Try again"; sleep 2; done`

### pasting

```
# With parameter expanding
cat <<EOF >> bash-paste_expanding
export ME=`whoami`
EOF
## Result: export ME=lony
```

```
# Without parameter expanding (look at the ')
cat <<'EOF' >> bash-paste_not-expanding
export ME=`whoami`
EOF
## Result: export ME=`whoami`
```


### pipe

* `> FILE` same as `1> FILE` - Pipe standard out (stdout) into file and overwrites content
* `2> FILE` [1](http://stackoverflow.com/questions/818255/in-the-shell-what-does-21-mean) - Pipe errors (stderr) into file and overwrites content
* `2>&1 >> FILE` [1](http://serverfault.com/questions/196734/bash-difference-between-and-operator) - Pipe errors (stderr) and standard out (stdout) into file and append content

### read

* `read -p "Enter username to check:" USERNAME && echo $USERNAME`

### error-handling

* set -? [1](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html#The-Set-Builtin)

	* `-e` - Failed command causes exit of script.
	* `-u` - Treat unset parameters as error and exit.
	* `-x` - Trace of simple commands and their arguments


## Databases

Overview of [SQL](https://db-engines.com) and [No-SQL](http://nosql-database.org) databases.

* [SQL](#sql)
	* [MySQL](#mysql)
* [NoSQL](#nosql)
	* [Mongo](#mongo)
	* [ElasticSearch](#elasticsearch)

----

### SQL

#### MySQL

Run `mysql -u root -h localhost -p` to open the MySQL console, which lets you interact with the database.

* `SELECT User FROM mysql.user;` [1](http://stackoverflow.com/questions/1135245/how-to-get-a-list-of-mysql-user-accounts) - Show users
* Change user password [1](http://stackoverflow.com/questions/22774739/change-mysql-user-password-using-command-line)

	```
	USE mysql;
	SET PASSWORD FOR 'USER'@'localhost' = PASSWORD('CLEAR_TEXT_PASSWORD');
	FLUSH PRIVILEGES;
	```

* `SHOW SLAVE STATUS\G` [1](https://dev.mysql.com/doc/refman/5.7/en/replication-administration-status.html) - To check replication status

### NoSQL

#### Mongo

Run `mongo` to open the mongo console, which lets you interact with the database. To connect to specific host and port use `mongo --host ShouldIAutomate.It --port 27017`.

* `show dbs` - Show databases (same as show databases)
* `show collections` - Show collections
* `show users` - Show users
* `db.changeUserPassword("USERNAME", "NEWPASSWORD")` - Change user password
* Authenticate
	1. `use admin` - To select table
	2. `db.auth("USER", "PASSWORD")`
* `rs.status()` - Show cluster status (replica set)
* `rs.conf()` - Returns current replica set configuration
* `rs.stepDown()` - Trigger primary to become secondary and start election
* `db.printReplicationInfo()` [1](https://docs.mongodb.com/master/reference/method/db.printReplicationInfo/) - Info about the replication timings

#### ElasticSearch

* [localhost:9200/_cluster/health?pretty](http://localhost:9200/_cluster/health?pretty) [1](https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-health.html) - Simple info about cluster health
* [localhost:9200/_nodes](http://localhost:9200/_nodes) [1](https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-nodes-info.html) - Info about cluster nodes
* [localhost:9200/_plugin/head](http://localhost:9200/_plugin/head/) - Plugin for interacting with ES
* Disable shard allocation [1](https://www.elastic.co/guide/en/elasticsearch/reference/current/rolling-upgrades.html) e.g. for a rolling update of the OS (Alternativly: Delay the allocation [2](https://www.elastic.co/guide/en/elasticsearch/reference/current/delayed-allocation.html))

	```
	PUT _cluster/settings
	{
	"transient": {
		"cluster.routing.allocation.enable": "none"
	}
	}
	```

## Distributions

* `uname -a` - Show kernel version and private system information

### Ubuntu

* `lsb_release -a` - Print version 

# Meta

* How to structure this document? __Answer__: as the UNIX wikipedia 
	* [article](https://en.wikipedia.org/wiki/List_of_Unix_commands)
	* [book](https://en.wikipedia.org/wiki/Book:Unix_Commands)

----

Now that you read that far - thank you and please remember, if you find a bug or want to recommend something, please feel free to open an [issue](https://github.com/lony/lony.github.io/issues) and help me get better!