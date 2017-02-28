---
title: List of tools
date: 2017-02-27 08:00:00
tags:
- tech
- it
- tooling
- devops
---
List of tools
=====

Curated list of resources for system development and maintenance. Copycatted from awesome [sysadmin](https://github.com/kahun/awesome-sysadmin) and [DevOps](https://github.com/AcalephStorage/awesome-devops).

## Metric & Metric Collection

*Metric gathering and display software.*

* [Collectd](http://collectd.org/) - System statistic collection daemon.
* [Collectl](http://collectl.sourceforge.net/) - High precision system performance metrics collecting tool.
* [Dashing](http://dashing.io/) - Ruby gem that allows for rapid statistical dashboard development. An all HTML5 approach allows for big screen displays in data centers or conference rooms.
* [Diamond](https://github.com/BrightcoveOS/Diamond) - Python based statistic collection daemon.
* [Facette](http://facette.io) - Time series data visualization and graphing software written in Go.
* [Freeboard](https://github.com/Freeboard/freeboard) - A damn-sexy front-end real-time dashboard. Transforms raw JSON into delicious UI.
* [Ganglia](http://ganglia.sourceforge.net/) - High performance, scalable RRD based monitoring for grids and/or clusters of servers. Compatible with Graphite using a single collection process.
* [Grafana](http://grafana.org/) - A Graphite & InfluxDB Dashboard and Graph Editor.
* [Graphite](http://graphite.readthedocs.org/en/latest/) - Open source scalable graphing server.
* [InfluxDB](http://influxdb.com/) - Open source distributed time series database with no external dependencies.
* [KairosDB](https://code.google.com/p/kairosdb/) - Fast distributed scalable time series database, fork of OpenTSDB 1.x.
* [OpenTSDB](http://opentsdb.net/) - Store and server massive amounts of time series data without losing granularity.
* [Packetbeat](http://packetbeat.com/) - Captures network traffic and displays it in a custom Kibana dashboard for easy viewing.
* [Prometheus](http://prometheus.io/) - Service monitoring system and time series database.
* [RRDtool](http://oss.oetiker.ch/rrdtool/) - Open source industry standard, high performance data logging and graphing system for time series data.
* [Statsd](https://github.com/etsy/statsd/) - Application statistic listener.

*Monitoring software.*

* [Alerta](https://github.com/guardian/alerta) - Distributed, scaleable and flexible monitoring system.
* [Cacti](http://www.cacti.net) - Web-based network monitoring and graphing tool.
* [Cabot](http://cabotapp.com/) - Monitoring and alerts, similar to PagerDuty.
* [Centreon](http://www.centreon.com) - IT infrastructure and application monitoring for service performance.
* [check_mk](http://mathias-kettner.com/check_mk.html) - Collection of extensions for Nagios.
* [Flapjack](http://flapjack.io/) - Monitoring notification routing & event processing system.
* [LibreNMS](https://github.com/librenms/librenms/) - fork of Observium.
* [Monit](http://mmonit.com/monit/#home) - Small Open Source utility for managing and monitoring Unix systems.
* [Munin](http://munin-monitoring.org/) - Networked resource monitoring tool.
* [Naemon](http://www.naemon.org/) - Network monitoring tool based on the Nagios 4 core with performance enhancements and new features.
* [Nagios](http://www.nagios.org/) - Computer system, network and infrastructure monitoring software application.
* [Icinga2](https://www.icinga.org/) - Fork of Nagios.
* [Node-Bell](https://github.com/eleme/node-bell) _not maintained_ - Real-time anomalies detection for periodic time series, metrics monitor.
* [Observium](http://www.observium.org/) - SNMP monitoring for servers and networking devices. Runs on linux.
* [Opsview](http://www.opsview.com/solutions/core) - Based on Nagios 4, Opsview Core is ideal for small IT and test environments.
* [Riemann](http://riemann.io/) - Flexible and fast events processor allowing complex events/metrics analysis.
* [Sensu](http://sensuapp.org/) - Open source monitoring framework.
* [Sentry](https://getsentry.com/) - Application monitoring, event logging and aggregation.
* [Seyren](https://github.com/scobal/seyren) - An alerting dashboard for Graphite.
* [Shinken](http://www.shinken-monitoring.org/) - Another monitoring framework.
* [Xymon](http://www.xymon.com/) - Network monitoring inspired by Big Brother.
* [Zabbix](http://www.zabbix.com/) - Enterprise-class software for monitoring of networks and applications.
* [Zenoss](http://community.zenoss.org) - Application, server, and network management platform based on Zope.
* [DataDog](https://www.datadoghq.com/) [Commercial] - Cloud based monitoring as a service.
* [AWS CloudWatch](https://aws.amazon.com/de/cloudwatch/) [Commercial] - AWS monitoring as a service.
* [New Relic](https://newrelic.com/) [Commercial] - Monitoring as a service.
* [Wave Scope](https://www.weave.works/products/weave-scope/) [Commercial] - Container monitoring.

*Monitoring dashboards.*

* [Adagios](http://adagios.org/) - Web based Nagios configuration interface.
* [Dash](https://github.com/afaqurk/linux-dash) - A low-overhead monitoring web dashboard for a GNU/Linux machine.
* [Thruk](http://www.thruk.org/) - Multibackend monitoring web interface with support for Naemon, Nagios, Icinga and Shinken.
* [Uchiwa](https://uchiwa.io) - Simple dashboard for the Sensu monitoring framework.

*Monitoring distributions.*

* [OMD](http://omdistro.org/) - The Open Monitoring Distribution.

## Service Discovery

Before you start please consider reading [HumaneRegistry from Martin Fowler](https://martinfowler.com/bliki/HumaneRegistry.html).

* [Consul](http://www.consul.io/) - Consul is a tool for service discovery, monitoring and configuration.
* [Doozerd](https://github.com/ha/doozerd) - Doozer is a highly-available, completely consistent store for small amounts of extremely important data.
* [ZooKeeper](http://zookeeper.apache.org/) - ZooKeeper is a centralized service for maintaining configuration information, naming, providing distributed synchronization, and providing group services.

## Log Management

*Log management tools: collect, parse, visualize ...*

* [Echofish](http://www.echothrust.com/projects/echofish) - A web based real-time event log aggregation, analysis, monitoring and management system.
* [Elasticsearch](http://www.elasticsearch.org/) - A Lucene Based Document store mainly used for log indexing, storage and analysis.
* [Fluentd](http://www.fluentd.org/) - Log Collector and Shipper.
* [Flume](https://flume.apache.org/) - Distributed log collection and aggregation system.
* [Graylog2](http://graylog2.org/) - Pluggable Log and Event Analysis Server with Alerting options.
* [Heka](http://hekad.readthedocs.org/en/latest/) - Stream processing system which may be used for log aggregation.
* [Kibana](http://www.elasticsearch.org/overview/kibana/) - Visualize logs and time-stamped data.
* [Logstash](http://logstash.net/) - Tool for managing events and logs.
* [Octopussy](http://www.octopussy.pm) - Log Management Solution (Visualize / Alert / Report).
