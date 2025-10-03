---
title: 'Using an Nvidia GPU with Proxmox LXC'
date: 2023-12-29
author: 'Yomi Ikuru'
excerpt: Setting up an LXC container on Proxmox with a GPU passed through, in order to run Ollama with CUDA acceleration.
tags: ['guide']
---

I recently set up an LXC container on Proxmox with a second GPU passed through in order to run Ollama with CUDA.

> This cannot be done with a GPU that is passed through to a VM as it is likely to be in the kernel module blacklist.

Firstly, the Nvidia drivers need to be installed on the Proxmox host. I downloaded the driver with version `525.89.02` for Linux and ran the command:

```bash
sudo ./NVIDIA-Linux-x86_64-525.89.02.run --dkms
```

The dkms is important here to install the kernel modules. Keep in mind that if the kernel of the Proxmox host is updated. The installer will need to be run again for the specific kernel version. Also, whilst running the installer, xorg and related components should not be installed unless your Proxmox instance has a GUI?

It is possible that the drivers fail to install at this point - the error might reference something about kernel headers. If so, run the following command to install pve-headers.

```bash
# sudo apt install pve-headers-6.2.11-2-pve
sudo apt install pve-headers-${uname -r}
```

A reboot might be necessary at this point, after which the Nvidia drivers on the Proxmox host should now be installed. This can be confirmed by running:

```bash
sudo nvidia-smi
```

This should give an output similar to this

```
Fri Dec 29 04:06:59 2023
+---------------------------------------------------+
| NVIDIA-SMI 525.89.02  Driver Version: 525.89.02   |
| CUDA Version: 12.0                                |
|----------------+-------------------+--------------+
| GPU  Name      | Bus-Id        Disp| Volatile ECC |
| Fan Temp Perf  | Pwr:Usage/Cap     | Memory-Usage |
|                |                   | GPU-Util     |
|================+===================+==============|
|   0  GeForce.. | 00000000:02:00.0  | N/A          |
|  0%  32C  P8   | 9W / 180W         | 2234/12288MiB|
|                |                   | 0%           |
+----------------+-------------------+--------------+

+---------------------------------------------------+
| Processes:                                        |
|  GPU   PID   Type   Process name       GPU Memory |
|        ID    ID                       Usage       |
|===================================================|
|    0   454871 C      python             2232MiB   |
+---------------------------------------------------+
```

With this done, our focus can be moved to the container. To pass the Nvidia GPU through to the container. The container will need access to the GPU (obviously), this can be done by editing the lxc `.conf` file.

Before editing the `.conf` file, be sure to check the major number associated with your nvidia GPU. It should typically be 195 and 507, the following command can be used to verify this.

```bash
$ sudo ls -al /dev/nvidia*
crw-rw-rw- 1 root root 195,   0 Sep  6 21:23 /dev/nvidia0
crw-rw-rw- 1 root root 195, 255 Sep  6 21:23 /dev/nvidiactl
crw-rw-rw- 1 root root 507,   0 Sep  6 21:23 /dev/nvidia-uvm
crw-rw-rw- 1 root root 507,   1 Sep  6 21:23 /dev/nvidia-uvm-tools
```

So, onto editing the LXC conf file; My VMID is 250 in this case.

```bash
sudo nvim /etc/pve/lxc/250.conf
```

Append the following to the `.conf`

```
lxc.cgroup2.devices.allow: c 195:* rwm
lxc.cgroup2.devices.allow: c 507:* rwm
lxc.mount.entry: /dev/nvidia0 dev/nvidia0 none bind,optional,create=file
lxc.mount.entry: /dev/nvidiactl dev/nvidiactl none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-uvm dev/nvidia-uvm none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-uvm-tools dev/nvidia-uvm-tools none bind,optional,create=file
```

The final `.conf` should look something like this:

```
arch: amd64
cpulimit: 10
features: nesting=1
hostname: machine-learning
memory: 32768
net0: name=eth0,bridge=vmbr0,firewall=1,hwaddr=4A:23:40:4C:78:7B,ip=dhcp,type=veth
net1: name=eth1,bridge=vmbr2,firewall=1,hwaddr=42:EB:1A:B1:49:F2,ip=10.0.7.250/24,type=veth
onboot: 1
ostype: ubuntu
rootfs: mofp0:250/vm-250-disk-1.raw,size=250G
swap: 16384
unprivileged: 1
lxc.cgroup2.devices.allow: c 195:* rwm
lxc.cgroup2.devices.allow: c 507:* rwm
lxc.mount.entry: /dev/nvidia0 dev/nvidia0 none bind,optional,create=file
lxc.mount.entry: /dev/nvidiactl dev/nvidiactl none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-uvm dev/nvidia-uvm none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-uvm-tools dev/nvidia-uvm-tools none bind,optional,create=file
```

With this all setup and the container rebooted, the same installer for the Nvidia drivers on the Proxmox host will need to be run on the container. To get the installer into the container, the following command can be used. I have put this in the root user directory of the container.

```bash
sudo pct push <VMID> ./NVIDIA-Linux-x86_64-525.89.02.run /root/NVIDIA-Linux-x86_64-525.89.02.run
```

All that is left to do is install the drivers again without the kernel modules because they have already been installed. Look up what `cgroup` is for more details on how this works - the LXC container shares the host's kernel.

```bash
sudo ./NVIDIA-Linux-x86_64-525.89.02.run --no-kernel-module
```

Et voila. After the driver installation is complete, `nvidia-smi` can be run once more to confirm that things have been installed as expected.

Ollama or any other process that requires GPU acceleration should now have access to the Nvidia GPU. The best part is that the same GPU can be shared with multiple LXC containers with the only caveat I believe is the limit on the number of processes that can use the video encoder/decoder on consumer grade Nvidia GPUs.
