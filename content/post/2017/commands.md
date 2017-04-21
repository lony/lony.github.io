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
	* [Configuration management](#configuration-management)
		* [Ansible](#ansible)
		* [Chef](#chef)
	* [Package management](#package-management)
* [Processes](#processes)
	* [Docker](#docker)
	* [Vagrant](#vagrant)
	* [VirtualBox](#virtualbox)
* [User environment](#user-environment)
* [Text processing](#text-processing)
* [Shell bulletins](#shell-bulletins)
* [Networking](#networking)
* [Searching](#searching)
* [Documentation](#documentation)
* [Miscellaneous](#miscellaneous)
	* [Programming sh](#programming-sh)
		* [array](#array)
		* [for](#for)
		* [if](#if)
		* [until](#until)
		* [pasting](#pasting)
		* [pipe](#pipe)
		* [read](#read)
	* [Databases](#databases)
		* [NoSQL](#nosql)
			* [Mongo](#mongo)
	* [Setup](#setup)
		* [Prompt](#prompt)
		* [Distribution](#distribution)
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
	
* mkfifo - Create named pipe

	```
	mkfifo in 
	ssh -A -l LOGIN BASTIAN_HOST nc TARGET_HOST TARGET_PORT <in | nc -l LOCAL_PORT >in
	rm in
	```

* openssl [1](http://snazzylabs.com/tutorial/five-advanced-tricks-for-mac-users/), [2](http://www.czeskis.com/random/openssl-encrypt-file.html), [3](https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs) - SSL encryption library

	* `openssl enc -aes-256-cbc -e -in {path-in} -out {path-out}` - Encrypt file with password (aes-256)
	* `openssl enc -aes-256-cbc -d -in {path-in} -out {path-out}` - Decrypt file with password (aes-256)
	* `openssl rsa -des3 -in {path-in} -out {path-out}` - Encrypt key with password (rsa)
	* `openssl rsa -in {path-in} -out {path-out}` - Decrypt key with password (rsa)
	* `echo | openssl s_client -host IP_OF_TARGET -port 443 2>&1 | openssl x509 -noout -subject` - Get SSL certificate subject of target machine
	* `openssl rand -base64 12` - Create a random string with 12 characters (password generator)

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

## Configuration management

### Ansible

* ansible-playbook - Runs Ansible playbooks

	* `ansible-playbook site.yml -i localhost, --connection=local`

### Chef

* chef-client
	* `chef-client -W` - Test run without actually changing anything

* chef-server-ctl
	* `chef-server-ctl org-user-add -a <ORGA> <USER>` - Create user in organization using chef ACL

* knife
	* `knife node list` - Show systems
	* `knife node from file nodes/<MASCHINE_NAME>.rb` - Loads local node configuration to Chef server
	* `knife data bag list`
	* `knife data bag show <DATA_BAG_FOLDer> <DATA_BAG_FILE> --format=json`
	* `knife data bag show <DATA_BAG_FOLDer> <DATA_BAG_FILE> -z --secret-file <SYMMETRIC_SECRET_KEY> -Fjson` - Shows locally stored encrypted data bag
		* `-z` - Local chef mode, uses local files
			* HINT: Needs chef-repo structure as on the server
		* `--secret-file` - Specifies symmetric key used to encrypted and decrypted
		* `-Fjson` same as `--format=jso` - Output data as JSON

	* `knife vault list`
	* `knife vault show <DATA_BAG_FOLDer> <DATA_BAG_FILE>`
	* `knife cookbook download -s "https://<SERVER_URL>" <COOKBOOK_NAME> 0.3.0`

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
	* `apt-get install --only-upgrade linux-generic`
	* `apt-get autoremove --purge`
	* `apt-get upgrade --dry-run` [1](http://askubuntu.com/questions/99834/how-do-you-see-what-packages-are-available-for-update)
	* `apt-get dist-upgrade` [1](https://www.cyberciti.biz/faq/how-do-i-update-ubuntu-linux-software) - Update newer version of distribution
	* `apt-cache policy` [1](http://stackoverflow.com/questions/8647454/how-to-get-a-list-of-repositories-apt-get-is-checking), [2](https://wiki.ubuntuusers.de/sources.list/) - Show list of repositories

* aptitude [1](http://unix.stackexchange.com/questions/767/what-is-the-real-difference-between-apt-get-and-aptitude-how-about-wajig) - cli GUI for package management

* dpkg - Debian/Ubuntu package manager (without dependencies)
	* `dpkg -l`

* pip - Python package manager

	* `pip install ansible` - Install package
	* `pip install -r requirements.txt` - Install all packages listed in requirements.txt

* `sudo update-alternatives --config java` - Set default Java version on system

## [Version control systems](https://en.wikipedia.org/wiki/Version_control) (VCS)

* git [1](https://git-scm.com/) - Distributed VCS

	* `git update-index --assume-unchanged FILE_NAME` [1](http://stackoverflow.com/questions/9794931/keep-file-in-a-git-repo-but-dont-track-changes) - Ignore file for comparison (HINT: only set locally on repository)
	* `git update-index --no-assume-unchanged FILE_NAME` - Regard file again for comparison

# Processes

* atop [1](http://www.tecmint.com/how-to-install-atop-to-monitor-logging-activity-of-linux-system-processes/) - System & Process Monitor like top or htop

* df - Display free disk space

	* `df -h`

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
* `docker build` - Build an image from a Dockerfile
* `docker run -p 8080:8080 jenkins:2.32.1` - Starts existing docker image and maps port
* `docker run -it -d shykes/pybuilder /bin/bash` [1](http://stackoverflow.com/questions/26153686/how-to-run-a-command-on-an-already-existing-docker-container) - Run image and start bash
* `docker exec -it f151aff2b21e /bin/bash` - Starts docker image f151aff2b21e and open interactive shell
* `docker ps -a` - List instances (derived from images)
* `docker rm -f 2247780d0b39` - Delete instance
* `docker images` - List images
* `docker rmi ae12afb99714 a78344b99ebc` - Delete images

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

* jq [1](https://stedolan.github.io/jq/) - CLI JSON processor
* xargs [1](https://www.cyberciti.biz/faq/linux-unix-bsd-xargs-construct-argument-lists-utility/) - Sub-list generator 

# Shell bulletins

# Networking

* curl - Client for URLs

	* `curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{ "username" : "xxx", "pw" : "xxx"}' "http://localhost:8080/user/authenticate"`

* dig - DNS querying tool using OS resolver

	* `dig +short myip.opendns.com @resolver1.opendns.com` [1](http://unix.stackexchange.com/questions/22615/how-can-i-get-my-external-ip-address-in-a-shell-script) - Retrieve your external IP address using DNS

* httpie [1](https://httpie.org/),[2](https://github.com/jkbrzt/httpie) - Better curl with JSON support

* ifconfig [1](https://en.wikipedia.org/wiki/Ifconfig) - Display network interface configuration for Unix-systems

* ipcalc [1](https://pypi.python.org/pypi/ipcalc) - IP subnet calculator

* iptables [1](https://en.wikipedia.org/wiki/Iptables), [2](https://manpages.debian.org/jessie/iptables/iptables.8.en.html), [3](https://wiki.archlinux.org/index.php/iptables) - IPv4 firewall interface for Linux

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

* iptraf [1](http://unix.stackexchange.com/questions/71456/check-outgoing-network-traffic) - Network statistic tool

* netcat aka nc - Tool to read and write from network connections

	* `nc -vz external.host 6379` - Just test Redis port with verbose output
	* `netcat -vv localhost 3306`

* netstat - Host based network statistic tool 

	* `sudo netstat -tulpn | grep LISTEN`
	* `sudo netstat -an | grep 8080 | grep ESTABLISHED`

* ngrep [1](https://en.wikipedia.org/wiki/Ngrep) - Similar to tcpdump

* nmap [1](https://www.digitalocean.com/community/tutorials/how-to-test-your-firewall-configuration-with-nmap-and-tcpdump) - Network mapping and port scanning tool

* `nscd -i hosts` [1](http://serverfault.com/questions/16299/how-do-i-flush-the-dns-cache-on-win-mac-linux-computers) - Flush DNS cache

* nslookup [1](https://en.wikipedia.org/wiki/Nslookup),[2](http://unix.stackexchange.com/questions/93808/dig-vs-nslookup) - DNS querying tool incl. own resolver

* ntop [1](https://en.wikipedia.org/wiki/Ntop) - Interactive network monitor

* ntpdate 

	* `ntpdate -q de.pool.ntp.org` - Query NTP service without changing something

* route [1](https://en.wikipedia.org/w/index.php?oldid=749414632) - View IP routing table of host (replaced with `iproute2`)

* scp - secure copy

	* `scp server:source/ dest/` - Copy from external server to local

* ssh - Secure Shell commands (more on how to setup [here](https://github.com/lony/dotFiles/tree/master/.ssh))

	* `ssh -vT git@github.com` [1](http://stackoverflow.com/questions/2643502/git-permission-denied-publickey) - Testing GIT via SSH connection using verbose mode
	* `ssh -L 27017:localhost:27017 ec2-FOO.eu-west-1.compute.amazonaws.com` [1](https://www.howtoforge.com/reverse-ssh-tunneling) - Tunnel Mongo port from local machine to ec2 machine using SSH
	* `ssh -i ${SSH_KEY} -L ${PORT}:${TARGET_HOST}:${PORT} ec2-user@${BASTION_HOST} -N` - Tunnel port using a bastian host

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

# Searching

* find

	* `find / -type d -name "lony.github.io"` - Search for lony... folder in root
	* `find download/ -mtime +60  -delete` - Search in download-folder for files last modified before +60 and delete
	* `find /path/to/directory/ -mindepth 1 -mtime +365 -type f -name "*.tmp" -print` [1](http://unix.stackexchange.com/questions/194863/delete-files-older-than-x-days), [2](http://askubuntu.com/questions/413529/delete-files-older-than-one-year-on-linux), [3](http://stackoverflow.com/questions/5927369/recursively-look-for-files-with-a-specific-extension)
		then `find /path/to/directory/ -mindepth 1 -mtime +365 -type f -name "*.tmp" -delete`
	* `find /path/to/directory/ -mindepth 1 -maxdepth 1 -mtime +365 -type d -print -exec rm -r "{}" \;` - [1](http://unix.stackexchange.com/questions/89925/how-to-delete-directories-based-on-find-output), [2](http://askubuntu.com/questions/377438/how-can-i-recursively-delete-all-files-of-a-specific-extension-in-the-current-di) Delete directories recursivly

* grep [1](https://www.cyberciti.biz/faq/grep-regular-expressions/)

	* `grep foo /home/lony/bar` - Search for foo in bar
	* `grep -e ERROR -e WARN YOURLOG.log | grep -v IgnoreException` - Searches in YOURLOG for ERRORs and WARnings but ignores your IgnoreException
	* `grep -r foo /home/lony/bar` - Search recursively for foo in bar
	* `grep -nr 'foo*' .` [1](http://stackoverflow.com/questions/4121803/how-can-i-use-grep-to-find-a-word-inside-a-folder) - Search for foo* in `.` showing relative line number
	* `zgrep foo /home/lony/log.1.gz | less` - Search inside gzip log file for foo

# Documentation

# Miscellaneous

* watch [1](https://en.wikipedia.org/w/index.php?oldid=725168377)

	* `watch -d=cumulative -n 5 'ls -lah | grep data.pcap'` [1](http://askubuntu.com/questions/430382/repeat-a-command-every-x-interval-of-time-in-terminal) - Runs ls every 5s and highlighting changes

		* `-d=cumulative` - Highlight differences that ever changed since start
		* `-n <SECONDS>` - Run every X seconds (default=2s)

## Programming sh

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

### if

* Bash version => 4 [1](http://unix.stackexchange.com/questions/250778/should-i-check-bash-version)

	````
	if [[ ${BASH_VERSION%%.*} -lt 4 ]]; then
	echo "This script requires bash version > 4. Currently running is ${BASH_VERSION%%.*}"
	exit 1
	fi
	````

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

## Databases

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

### NoSQL

#### Mongo

Run `mongo` to open the mongo console, which lets you interact with the database.

* `show dbs` - Show databases
* `show collections` - Show collections
* `show users` - Show users
* `db.changeUserPassword("USERNAME", "NEWPASSWORD")` - Change user password
* Authenticate
	1. `use admin` - To select table
	2. `db.auth("USER", "PASSWORD")`
* `rs.status()` - Show cluster status (replica set)
* `rs.conf()` - Returns current replica set configuration
* `rs.stepDown()` - Trigger primary to become secondary and start election


## Setup

### Prompt

```
ERRORLEVEL TIME USER@HOST PATH #
2 [14:03:07] lony@hobbes /var/log/upstart # echo $PS1
$? \[\e[01;34m\][$(date "+%H:%M:%S")] \[\e[01;31m\]\u\[\e[1;34m\]@\[\e[1;31m\]\h\[\e[1;34m\] \w # \[\e[0m\]
```

### Distribution

* `uname -a` - Show kernel version and private system information

#### Ubuntu

* `lsb_release -a` - Print version 

# Meta

* How to structure this document? __Answer__: as the UNIX wikipedia 
	* [article](https://en.wikipedia.org/wiki/List_of_Unix_commands)
	* [book](https://en.wikipedia.org/wiki/Book:Unix_Commands)

----

Now that you read that far - thank you and please remember, if you find a bug or want to recommend something, please feel free to open an [issue](https://github.com/lony/lony.github.io/issues) and help me get better!