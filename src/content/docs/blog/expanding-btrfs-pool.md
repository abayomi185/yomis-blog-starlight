---
title: 'Expanding BTRFS Pool'
date: 2025-04-10
author: 'Yomi Ikuru'
excerpt: Guide to expanding an existing BTRFS pool
tags: ['guide']
---

To create the BTRFS pool:

```bash
sudo mkfs.btrfs /dev/nvme --label mofp0
```

```bash
sudo mkdir -p /mnt/mofp0
```

```bash
sudo mount LABEL=mofp0 /mnt/mofp0
```

Then modify `/etc/fstab` to mount the pool on boot:

```bash
LABEL=mofp0 /mnt/mofp0 btrfs defaults 0 0
```

To add a new device to the existing BTRFS pool:

```bash
sudo btrfs filesystem show
```

```txt
Label: 'drive0_wd_2tb'  uuid: 4451c98c-4577-43ab-b4c2-59832905d010
        Total devices 2 FS bytes used 2.37TiB
        devid    1 size 1.82TiB used 1.21TiB path /dev/nvme2n1
        devid    2 size 1.82TiB used 1.21TiB path /dev/nvme1n1
```

```bash
sudo btrfs device add /dev/nvme /mnt/mofp0
```

```bash
sudo btrfs balance start /mnt/mofp0 --bg # run in the background
```

```txt
WARNING:

        Full balance without filters requested. This operation is very
        intense and takes potentially very long. It is recommended to
        use the balance filters to narrow down the scope of balance.
        Use 'btrfs balance start --full-balance' option to skip this
        warning. The operation will start in 10 seconds.
        Use Ctrl-C to stop it.
10 9 8 7 6 5 4 3 2 1
Starting balance without any filters.
```

```bash
sudo btrfs device stats /mnt/mofp0
```
