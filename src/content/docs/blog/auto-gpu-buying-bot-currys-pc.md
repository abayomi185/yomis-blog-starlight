---
title: "Auto GPU Buying Bot - Curry's PC"
date: 2021-03-02
author: 'Yomi Ikuru'
excerpt: In light of the silicon and GPU shortage, I made a bot to increase my chances of geting a GPU
cover:
  image: ../../../assets/blog/auto-gpu-buying-bot-currys-pc/mining-rig.jpg
  alt: Mining Rig
tags: ['project']
---

<small>6 GPU Mining Rig. Image source: [cryptosrus](https://cryptosrus.com/ethereum-mining-rig)</small>

---

To go straight to the **GitHub** repo, follow this link;<br/>
[abayomi185 - currys-pc-order-bot](https://github.com/abayomi185/currys-pc-order-bot)

<a class="github-button" href="https://github.com/abayomi185" data-show-count="true" aria-label="Follow @abayomi185 on GitHub">Follow @abayomi185</a> <a class="github-button" href="https://github.com/abayomi185/currys-pc-order-bot" data-icon="octicon-star" data-show-count="true" aria-label="Star abayomi185/currys-pc-order-bot on GitHub">Star</a>

---

The situation with GPU (Graphics Processing Unit) shortages and the general chip manufacturing shortages brought about partly by the increased demand of electronic hardware during the COVID-19 pandemic has caused compounding issues in many other industries and organisations.

The current market of GPUs has seen prices surging past than their MSRP to nearly 3x in some instances. Older GPUs are also demanding a much higher price than they should be on the second hand market.

There still lies an issue, typical shortages could be considered easy to deal with by waiting a little bit and getting the item when they are back in stock. Unfortunately for me and a lot of gamers, system builders and enthusiasts, we are also in a period of high profitability in the cryptocurrency mining scene.

The new GPUs perform extremely well for mining cryptocurrency with an average ROI (Return on Investment) of about 3 to 6 months mining Ethereum, the most profitable coin to mine for most GPUs at the moment. Due to this, miners are very eager to get their hands on these cards and often employ the use of bots to automatically buy GPUs when they are in stock, to build mining rigs with multiple GPUs.

This was the sole reason for making the Curry's PC Order Bot. It uses Python and Selenium to automatically interact with webpages. It handles checking the site periodically and buying the GPU once in stock.

This bot has been discovered by a few users on GitHub and a contributor who has helped a with idea suggestions and implementing additions via pull requests to improve the bot.

I would love to say the project was successful but I was unable to use this bot to acquire a GPU for myself. A user following this project on GitHub had limited success with acquiring a GPU. Only losing out due to a payment authentication which the user was unable to complete while asleep at night. I am unaware of other success stories.

The reason for the low success rate is due to the design of Curry's PC infrastructure. Users from a GPU stock alert group discovered they could send direct requests to Curry's PC API, getting more information about stock numbers and executing purchases before the website updates to reflect the updated GPU stock.

Regardless of the situation, I am glad to have learnt about web scraping using Python and Selenium and hope the shortage of GPUs improves soon to stop the blatant price hikes from independent retailers and established retailers.
