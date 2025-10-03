---
title: 'NixOS - A brief review'
date: 2024-05-18
author: 'Yomi Ikuru'
excerpt: The best linux distro I have ever used
cover:
  image: ../../../assets/blog/nixos/unsplash-nixos.jpeg
  alt: NixOS neofetch screenshot
tags: ['project']
---

So, I recently picked up a [Thinkpad X1 Carbon Gen 6](<https://www.lenovo.com/gb/en/p/laptops/thinkpad/thinkpadx1/thinkpad-x1-carbon-(6th-gen)/22tp2txx16g>) and I decided to try out NixOS. And this is a short one on my experience using [NixOS](https://nixos.org).

NixOS is amazing and likely the best linux distro I've ever used. And here are the pros and cons:

The pros:

- Declarative builds - define what you want and rebuild, its that simple
- Reproduceable - with [flakes](https://www.tweag.io/blog/2020-05-25-flakes) builds are not just repeatable (think Docker) but also reproduceable
- Nix the programming language - a readable functional programming language
- [Nixpkgs](https://search.nixos.org/packages) packages - a large repo with more packages than the Arch AUR
- [Nix generations](https://nixos.wiki/wiki/Overview_of_the_NixOS_Linux_distribution) - roll back to a previous system version. Never will a system update break things
- [Nix shell](https://nix.dev/tutorials/first-steps/declarative-shell.html) - very useful for quickly checking or testing a package or app
- [Nix flakes](https://nixos.wiki/wiki/Flakes) - a powerful way to compose a system, multiple systems or a dev environment
- A growing nix community and appreciation for nix

The cons:

- Non-[FHS](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard) compatible - nix stores things in different places which often means you can't download any binary or app and expect it to work
- Increased storage space - the roll back feature means previous package versions are kept on the system
- Cryptic error messages - rebuilding your system is not always so straightforward when errors can not be found
- Complexities of declarative abstractions - some modules can only be fully understood by looking at how it is built in the nixpkgs or home-manager repo
- Inadequate documentation - there is a [new wiki](https://wiki.nixos.org/wiki/NixOS_Wiki) but generally the documentation is lacking or geared towards an experienced linux user. The [Arch wiki](https://wiki.archlinux.org) is still the GOAT

NixOS with the [Hyprland](https://hyprland.org) desktop has been a joy to use and I have gained a lot of knowledge along the way. I also made my first contribution to the home-manager repo. See the resources below that helped me get started:

- [Zero To Nix](https://zero-to-nix.com) - simple as
- [Misterio77/nix-starter-configs](https://github.com/Misterio77/nix-starter-configs) - a repo template to get started which is what my [nix-dotfiles](https://github.com/abayomi185/nix-dotfiles) repo is largely modelled on
- [Determinate Systems posts](https://determinate.systems/posts) - all posts from here all chef's kiss
- [Vimjoyer - YouTube](https://www.youtube.com/@vimjoyer) - great, easy to digest video tutorials on using Nix
- [LibrePheonix - YouTube](https://www.youtube.com/@librephoenix) - more advanced tutorials on using Nix
- [NixOS](https://www.youtube.com/watch?v=CwfKlX3rA6E): Everything Everywhere All At Once - chef's kiss video (as usual) on NixOS
- [Nerding out about Nix and NixOS with Jon Seager, Canonical](https://www.youtube.com/watch?v=9l-U2NwbKOc&t=1198s) - detailed video discussing nix in Production from a Canonical dev
