+++
title = "Docker and the likes - Are boxes really for dead people?"
tags = [ "programming", "hosting", "os", "virtualization", "hypervisor", "containerization" ]
date = "2017-12-19T20:00:00+02:00"
slug = "docker-and-the-likes"
+++

Virtualization was standard when Docker came around 2013 and made containerization the new state of the art. This new ecosystem shifted the landscape and was under heavy development, which today we want to make a snapshot of. This post should not only cover Docker but software abstraction in general.

As things change I constantly update this post and adjust it. If you find a bug or want to recommend something, please feel free to open an [issue](https://github.com/lony/lony.github.io/issues) and help me get better. - Thank you!

# TOC

* [Types and formats](#types-and-formats)
	* [Bare-Metal Type-1](#bare-metal-type-1)
	* [Hosted Type-2](#hosted-type-2)
		* [Virtualization](#virtualization)
		* [Containerization](#containerization)
* [Cluster Managers](#cluster-managers)
* [Cloud Hosting](#cloud-hosting)

----

# Types and formats

Running multiple operating system environments on the same hardware you have to abstract the hardware components from the OSes. This is called [virtualization](https://en.wikipedia.org/wiki/Hardware_virtualization).

The software to abstract the hardware away from the OS is often called [hypervisor](https://de.wikipedia.org/wiki/Hypervisor). The [different types](http://www.searchdatacenter.de/tipp/Hosted-und-Bare-Metal-Virtualisierung-Hypervisor-Typen-im-Vergleich) can be categorized in Bare-Metal Type-1, which is just installed directly onto the hardware, and Hosted Type-2 were first an OS is installed an then the hypervisor is put ontop of the OS. Type-1 is more direct and therefore faster as Type-2 has better driver support.

In this article we mainly look at [virtualization](https://en.wikipedia.org/wiki/Virtualization) of computing on physical hardware. Which already is a huge topic as can be seen looking at the incomplete [comparison site](https://en.wikipedia.org/wiki/Comparison_of_platform_virtualization_software) at Wikipedia. Still there is a lot more out there to abstract as for example networks, or the JVM with is abstracting OS specifics away from Java.

## Bare-Metal Type-1

* [VMware ESX](https://en.wikipedia.org/wiki/VMware_ESXi)
* [Microsoft Hyper-V](https://en.wikipedia.org/wiki/Hyper-V)
* [Citrix Systems XenServer](https://en.wikipedia.org/wiki/XenApp)

## Hosted Type-2

This type of virtualization always needs a host OS on which it is running. This [overview](https://en.wikipedia.org/wiki/Operating-system-level_virtualization) show's the most important ones. Even sometimes Type-2 virtualization is synonymously called containerization, in here I want to separate between just virtualization and containerization as if they were clearly separated to illustrate the new approach of shipping software in (Docker) containers more clearly.

### Virtualization

* OS independent

    * [VMware Workstation](https://en.wikipedia.org/wiki/VMware_Workstation)
    * [Microsoft VirtualPC](https://en.wikipedia.org/wiki/Windows_Virtual_PC)
    * [VirtualBox](https://en.wikipedia.org/wiki/VirtualBox)
    * [KVM](https://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine)

* Linux only

    * [Xen](https://en.wikipedia.org/wiki/Xen)
    * [OpenVZ](https://en.wikipedia.org/wiki/OpenVZ)
    * [LXC](https://en.wikipedia.org/wiki/LXC)

* BSD only

    * [FreeBSD jail](https://en.wikipedia.org/wiki/FreeBSD_jail)

* OSX only

    * [xhyve](https://github.com/mist64/xhyve)

### Containerization

Standardized [OCI Image Format](https://github.com/opencontainers/image-spec)

* [Docker](https://en.wikipedia.org/w/index.php?title=Docker_(software)&oldid=806239173)
* [CoreOS rkt](https://github.com/rkt/rkt) - Competitor for Docker see comparison [here](https://medium.com/@adriaandejonge/moving-from-docker-to-rkt-310dc9aec938)

# Cluster Managers

* CM for containers

    * IaaS

        * [OpenStack](https://www.openstack.org)
        * [CloudStack](https://cloudstack.apache.org/)
        * [OpenNebula](https://opennebula.org/)
        * [Apache Mesos](http://mesos.apache.org/)
            
            * [Marathon](https://mesosphere.github.io/marathon/)
            * [Data Center Operating System (DC/OS)](https://dcos.io)

    * PaaS

        * [Cloud Foundry](https://www.cloudfoundry.org)
        * [OpenShift Origin](https://www.openshift.com)

    * CaaS

        * [Kubernets aka K8s](https://kubernetes.io/)
        * [Docker Swarm](https://docs.docker.com/engine/swarm/)
        * [Nomad](https://www.nomadproject.io)
        * [Rancher](http://rancher.com/)

# Cloud Hosting

* CH for containers

    * AWS 
        * [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)
        * [AWS EC2 Container Service (ECS)](https://aws.amazon.com/ecs/)
        * [Amazon Elastic Container Service for Kubernetes (EKS)](https://aws.amazon.com/eks/)
        * [AWS Fargate](https://aws.amazon.com/fargate/)
    * Google
        * [Google Container Engine (GKE)](https://cloud.google.com/container-engine/)
        * [Google App Engine](https://cloud.google.com/appengine/)
    * Microsoft
        * [Microsoft Azure Container Service (AKS)](https://azure.microsoft.com/en-us/services/container-service/)
        * [Microsoft Azure Container Instances](https://azure.microsoft.com/en-us/services/container-instances/)
    * [Heroku Container Registry & Runtime](https://devcenter.heroku.com/articles/container-registry-and-runtime)
