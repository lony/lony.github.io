+++
title = "Internet Protocol version 6"
tags = [ "programming", "network", "osi", "ipv6" ]
date = "2018-08-22T11:00:00+02:00"
slug = "network-ipv6"
+++

[IPv6](https://en.wikipedia.org/wiki/IPv6) is the replacement version of the existing [IPv4](https://en.wikipedia.org/wiki/IPv4) protocol version for transmitting packages on the internet. Its most visible change is the change of 32-bit addresses to 64-bit, which you can notice having characters on top of the already used numbers.

The transition is happening slowly. Looking at a [statistic compiled by Google](https://www.google.com/intl/en/ipv6/statistics.html) so far only ~25% of the global internet is able to use IPv6.

Still as you may plan to select your new internet service provider (ISP) there are some things to consider about IPv6.

As the IPv4 address space is getting smaller many ISPs move their new customers to IPv6 directly. Therefore, you get an IPv6 address and no regular IPv4 address on top. To still be able to reach the "old" internet the Internet Engineering Task Force (IETF) developed a couple of [standards as transition mechanisms](https://en.wikipedia.org/wiki/IPv6_transition_mechanism).

Most ISP's use the Dual Stack Lite ([DE](https://www.elektronik-kompendium.de/sites/net/2010211.htm), [EN](https://www.juniper.net/documentation/en_US/junos/topics/concept/ipv6-dual-stack-lite-overview.html)) way of delivering content from IPv4 servers to clients. This way uses a pool of IPv4 addresses to map request from your IPv6 out to an IPv4 receiver and back again. Sadly, this implies that you are not able to use certain services as before e.g. NAS or Fritbox remote.

Understanding IPv6 and the transition mechanisms helps your choice your ISP wisely.