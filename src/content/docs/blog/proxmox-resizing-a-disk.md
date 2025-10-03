---
title: 'Proxmox - Resizing a LXC Disk'
date: 2021-11-12
author: 'Yomi Ikuru'
excerpt: The Proxmox Web-UI is great but it doesn't allow for reducing the size of a LXC disk that you may have overdone. Here's how to do it.
tags: ['guide']
---

The Proxmox Web-UI is great but it doesn't allow for reducing the size of a VM disk or Container disk that you may have overdone. Here's how to do it.

You will need access to your Proxmox node via SSH or directly.

This applies to the standard Proxmox setup using LVM.

On your Proxmox node, do the following:

List containers

```bash
pct list
```

Stop the container you want to resize

```bash
pct stop 420
```

Find out it's path on the node

```bash
lvdisplay | grep "LV Path\|LV Size"
```

Run a file system check

```bash
e2fsck -fy /dev/pve/vm-420-disk-0
```

Resize the file system

```bash
resize2fs /dev/pve/vm-420-disk-0 10G
```

Resize the local volume

```bash
lvreduce -L 10G /dev/pve/vm-420-disk-0
```

Edit the container's conf file

```bash
nano /etc/pve/lxc/420.conf
```

Update the following line accordingly

```bash
FROM:

rootfs: local-lvm:vm-420-disk-0,size=20G

TO:

rootfs: local-lvm:vm-420-disk-0,size=10G
```

Start the container

```bash
pct start 420
```

Enter and check the resize container disk

```bash
pct enter 420
df -h
```

---

**Source:** Proxmox Forum \[Online\] Available: https://forum.proxmox.com/threads/resize-lxc-disk-on-proxmox.68901/
