+++
title = "Debug web apps with OSI"
tags = [ "programming", "network", "osi", "debug" ]
date = "2017-04-09T20:00:00+02:00"
slug = "debug-with-osi"
+++

Working with web applications every day, a lot of my time is spend troubleshooting problems with them. In this post I write what I learned about debugging web applications in production, and during testing. Using the famous OSI layers, I try to navigate through all the important parts someone should look at.

`Update 2018-02-18` If you are interest in the details of how the internet is working I highly recommend you the following amazing Ars Technica article ["How the Internet works: Submarine fiber, brains in jars, and coaxial cables"](https://arstechnica.com/information-technology/2016/05/how-the-internet-works-submarine-cables-data-centres-last-mile/). When you then inspired to build your own ISP first have a look at ["Starting an ISP is really hard, don’t do it"](http://www.slashgeek.net/2016/05/31/starting-isp-really-hard-dont/), and keep on reading [here](https://startyourownisp.com/)!

As things change I constantly update this post and adjust it. If you find a bug or want to recommend something, please feel free to open an [issue](https://github.com/lony/lony.github.io/issues) and help me get better. - Thank you!

# TOC

* [Scenario](#scenario)
* [OSI model](#osi-model)
* [Debug](#debug)

----

# Scenario

To have a common ground for debugging I sketch a scenario which I will use for the debugging journey later on. To keep it simple we have a web application written in Go which runs behind an nginx and is accessed through Chrome. It is delivering static HTML and runs on a remote server.

![Scenario sketch](/img/blog/2017/osi-debug/scenario.png)	

# OSI model

Everyone learns it during her/his IT education but usually nobody looks at it after the exam. This has to do with, the way many people work, but also with the fact that the OSI model is an [abstract, theoretical model](http://networkengineering.stackexchange.com/questions/6380/osi-model-and-networking-protocols-relationship).

The [open systems interconnection model](https://en.wikipedia.org/wiki/OSI_model) (OSI model) was designed in the 1970s to develop an open standard against the upcoming proprietary protocols by big companies. In difference to TCP/IP you had to pay for the specification and thats why TCP/IP gained ground much faster and took the lead. Thats also the reason OSI was never implemented in reality.

Still OSI is a really good tool to [understand and debug network connections](https://www.youtube.com/watch?v=HEEnLZV2wGI). It is a container for models used at each level of the communication and as higher it gets as more abstract it is.


| # | OSI layer          | Protocol data unit             | Examples                   |
|---|--------------------|--------------------------------|----------------------------|
|   | USER               |                                |                            |
| 7 | Application layer  | Data                           | Chrome, Firefox            |
| 6 | Presentation layer | Data                           | Mac OS X, Windows drivers  |
| 5 | Session layer      | Data                           | HTTP Cookies               |
| 4 | Transport layer    | Segment (TCP) / Datagram (UDP) | TCP Windowing              |
| 3 | Network layer      | Packet                         | Router, IP, ICMP           |
| 2 | Data Link layer    | Frame                          | Switch, MAC addresses, ARP |
| 1 | Physical layer     | Bit                            | Cable                      |
|   | OTHER SIDE         |                                |                            |

You should now understand what `layer 8 problems` are, what shouldn't be clear is how to find problems regarding each layer and more important debugging an application most efficiently using the model.

# Debug

As usually the more user facing layers of the OSI model are easier to interact with we start from top to bottom to debug along the layers. This should help us finding problems in our network system and avoid missing complexity along the way.

## On the client side

* 7. __Application layer__: Something is wrong with your browser. To find the issue use Firefox, instead of your default Chrome, see if you can open our example URI e.g. `www.go-project-hello.com`. You could also use the Chrome debug bar `More Tools > Developer Tool` and look at console tab for errors, maybe something went wrong with the JavaScript application delivered.
    * Hint: If the developer tools network tab is not enough for you debugging AJAX of your JavaScript application there is also [Charles](https://www.charlesproxy.com/) an HTTP reverse proxy.
* 6. __Presentation layer__: This was a big problem back in the days starting a LAN-party. Having different operating systems and different network protocols some operating drivers were missing - someone remembers [IPX](https://en.wikipedia.org/wiki/Internetwork_Packet_Exchange)? To fix this today, check your system drivers and see if every device has a working driver set.
* 5. __Session layer__: There is not much to do at the client. Connecting to a website, you could check if you have session cookies set. Using the Chrome debug bar `More Tools > Developer Tool` and there the `Application` tab then on the left side `Storage > Cookies` and see if something is set from your application.
* 4. __Transport layer__: The transport layer is mostly [about ports](https://networkengineering.stackexchange.com/questions/16996/what-layer-of-the-osi-model-deals-with-ports). It also manages so called windowing, which determines how much data should be send in one package. The windowing is mostly left to the protocols used (mostly TCP) and if you are interested read [this](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Data_transfer). This part either works or something is messed up with the protocol, therefore we can not look into it and lean only towards ports.
    * We use `netcat -vz go-project-hello.com 80` to test if our application is reachable at a predefined port
        * Hint: The so called `well-known ports` from 0 to 1023 are preset and widely used for specific network services. If you are interested look into the list [here](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers). The opposite are [ephemeral ports](https://en.wikipedia.org/wiki/Ephemeral_port) which are short lived and automatically allocated.
* 3. __Network layer__: This is the area of IP or ICMP and is the layer where routers life and operate.
    * To debug this you could start looking up if you have an existing IP address using `ifconfig` does your ethernet device show a IP address
    * If you have one, you could try if you could reach another machine using `ping www.go-project-hello.com`
    * If this is not working, try the IP instead of the domain e.g. `ping 10.10.1.12` and read this amazing [guide to DNS](http://www.integralist.co.uk/posts/dns-101/).
        * Hint 1: To get the IP from a domain use `dig`
        * Hint 2: For your local machine you could set `/etc/hosts` mapping DNS names to IP addresses and avoiding the long number.
* 2. __Data Link layer__: This is the area of switches and used for address resolution. In this layer [ARP](https://en.wikipedia.org/wiki/Address_Resolution_Protocol) is used to translate your MAC address into an IP address. The [Media access control](https://en.wikipedia.org/wiki/Media_access_control) (MAC) address is assigned to your network device during manufacturing. Many think it is unique but using `ifconfig` you could manipulate and change it.
    * For starters we again use `ifconfig` this time to see if our ethernet device shows a MAC address
    * If this isn't the case we use `tcpdump -i eth0 arp` to debug the ARP packages and search for the cause, as no IP is assigned.
        * HINT: `tcpdump` is the swiss army knife of networking. It can inspect not only layer 2 but also higher level packets and is widely used for debugging network communication problems. Its well known twin [Wireshark](https://www.wireshark.org/), can also sniff traffic and look at the packages, but has a nice UI and is therefore preferable if a window system is installed.
* 1. __Physical layer__: Is the damn cable plugged in or does your wifi is blocked by lead walls?

## On the server side

* 7. __Application layer__: As at the other side there has to be something delivering content, here is where your Go application and nginx lives.
    * To debug this part you could check the logs using `less /var/log/nginx/error.log` for nginx or similar your Go application. I hope your application writes logs!
    * You could also use `ps -aux | grep -E (go-project-hello|nginx)` to look if there is a process for both your application and nginx running.
    * To see the resources (e.g. CPU, RAM) usage for your process you could use `top`.
* 6. __Presentation layer__: Nothing to do, see client side.
* 5. __Session layer__: In contrast to the client, the server has an influence on the session layer. Our Go application for example uses cookies to store session information. If we extend the live time of the cookies we may enhance the user experience and fix a timeout problem.
    * Hint: For old fashioned PHP have a look into `php.ini`
* 4. __Transport layer__: As for the client we are back to ports. This time we have to see if our application can be reached from the outside.
    * We use `netstat -tulpn | grep LISTE` to see which ports are open and what applications are listening on each specific port.
* 3. __Network layer__, 2. __Data Link layer__ and 1. __Physical layer__ are the same as for the client and can be debugged the same way.
    * Hint: If you use a firewall at the client or server run `iptables -nvL` (for Linux machines) to see its settings. Depending on the implementation of your firewall it [can reside on every layer up from level two](https://networkengineering.stackexchange.com/questions/17115/how-to-know-at-what-osi-layers-does-a-firewall-operate). You could also use especially the Linux `iptables` firewall to build your own router or switch!

----

Now that you read that far - thank you and please remember, if you find a bug or want to recommend something, please feel free to open an [issue](https://github.com/lony/lony.github.io/issues) and help me get better!