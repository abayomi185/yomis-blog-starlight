---
title: 'Remote Access on Server PC'
date: 2021-01-18
author: 'Yomi Ikuru'
excerpt: Setting up internet access to selfhosted personal server-apps with Tinc VPN and Nginx
cover:
  image: ../../../assets/blog/remote-access-on-server-pc/server-pc-remote.jpg
  alt: Diagram showing remote access setup on Server-PC
tags: ['project']
---

I’m joyed with all the server applications I’ve set up on [Server-PC](https://yomis.blog/server-pc) but the joy is lost when I’m away from home (although not common these days) and I need to access my data in my home network. Services like google drive and the likes do work at a cost, but I'm a student and my building concern for privacy urges me to find a solution. Finding a solution is just what I did and alas, my joy when I’m away from home is restored.

This set up would be easier if I had a self-managed internet modem and/or router from an ISP, with the ability to request/set a static public IP but such convenience I find doesn't help with developing creative solutions. My solution with the help of this fantastic [guide by John Crawford](https://jordancrawford.kiwi/setting-up-tinc/), a pen and a paper is as follows.

As the network diagram above shows, I'm able to access my containerised docker application from any device in the Airport network. This works fine in my student room but access from the internet into the network is not possible due to the network structure at my accomodation. This structure is standard across other managed accomodations and public internet access points, as it ensures a level of security in the network.

To remotely access my Server-PC, I needed to set up a [Virtual Private Network (VPN)](https://en.wikipedia.org/wiki/Virtual_private_network) connection to a known computer with a fixed public IP address. This known computer, a [Hetzner](https://www.hetzner.com) CX11 cloud instance would act as a buffer between the clients and the server, forwarding requests through the VPN tunnel.

---

The CX11 cloud instance costs 2.99 Euros a month with 10gb of persistent storage.

---

A pen and paper although not compulsory was required at this stage to map out the flow of requests from the client to the server. My server applications are all containerised and can be accessed via a reverse proxy for convenience. The reverse proxy ([Nginx](https://www.nginx.com)) in this case allows me to access running services using a domain name like **nextcloud.home** as opposed to **10.0.1.8:8080** with the help of [Pihole](https://pi-hole.net) as a DNS resolver.

[Tinc](https://www.tinc-vpn.org), the open source VPN package is unlike the typical conception of a VPN in society, with an app and a pricing model but it is also similar. Tinc is able to create an encrypted VPN tunnel between two computers if one of them has a static IP address. The two computers would then appear to be in the same network much like my devices in the Airport network.

Tinc and Nginx are both installed on the cloud instance. Tinc is set up with shared encryption keys on Server-PC and CX11 for security purposes and Nginx is set up to forward requests from port 80 to Tinc (Server-PC) via Tinc (CX11) both running in docker containers (I'm using [jenserat - tinc](https://hub.docker.com/r/jenserat/tinc) docker image). Request are made to CX11 port 80 via a purchased domain name making use of Hetzner nameservers.

The request is received at Tinc (Server-PC) where another Nginx reverse proxy server awaits to forward the request to the desired docker container. This request channel is then tied to different subdomains like **photoprism.example.com** or **jellyfin.example.com** with the help of Nginx to forward the request to the right containerised application in a docker internal network (for security purposes).

---

With all this done, I have learned a great deal about reverse proxy servers, load balancers and the means by which http requests are sent with http headers. This project has been fun and I've been happy to share data and files with friends and family from my own server in true [r/selfhosted](https://www.reddit.com/r/selfhosted/) fashion.

---
