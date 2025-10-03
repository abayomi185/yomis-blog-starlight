---
title: 'Crypto-currency Trading Bot'
date: 2023-04-01
author: 'Yomi Ikuru'
excerpt: A simple cryptocurrency bot for Pump and Dump schemes
cover:
  image: ../../../assets/blog/crypto-trading/crypto-bot.jpg
  alt: Crypto Trading Bot CLI
tags: ['project']
---

<small>CLI interface for the bot</small>

---

To go straight to the **GitHub** repo, follow this link;<br/>
[abayomi185 - simple-binance-pump-dump-bot](https://github.com/abayomi185/simple-pump-and-dump-bot)

<!-- Place this tag where you want the button to render. -->

<a class="github-button" href="https://github.com/abayomi185" data-show-count="true" aria-label="Follow @abayomi185 on GitHub">Follow @abayomi185</a> <a class="github-button" href="https://github.com/abayomi185/simple-pump-and-dump-bot" data-icon="octicon-star" data-show-count="true" aria-label="Star abayomi185/currys-pc-order-bot on GitHub">Star</a>

**01-05-21**: Now with support for Kucoin Exchange.

---

I recently got into cryptocurrency trading and mining. It's been great and I've learnt a lot. There still a lot to the technical aspects of the network and the blockchain I have yet to learn but I am slowly building my knowledge.

During the hype of Doge coin stemming from tweets by Elon Musk earlier this year, I got to find out about pump and dump groups. During this period, the number of pump and dump groups grew rapidly and I got many invites to join new groups. As a disclaimer, these schemes are largely considered as scams where only the organisers make good profits. This article is also not financial advice.

---

What is Pump and Dump? Check this **Investopedia** article; [Pump and Dump](https://www.investopedia.com/terms/p/pumpanddump.asp)

---

For the first pump and dump event I participated in, I was able to make a 15% profit by being quick to the website and executing the buy and sell order in an instant. I wasn't so lucky for the next two events. The group organisers often show graphs of "successful pumps" but restrict discussions in the Discord groups, a tell-tale sign that very few people in the groups are actually able to make profits.

I began to think that I could make a bot to be even faster at making orders as opposed to navigating the interface of the crypto exchange site. I looked into highly optimised code designed for speed often using C++ and learned a bit about the industry of [High-Frequency Trading](https://www.investopedia.com/terms/h/high-frequency-trading.asp) (HFT). I ultimately settled for Python, a programming language I am familiar with and found an API wrapper for Binance, the crypto exchange service I use. **See below for a summary on How the bot works**.

My first few pump events using the bot were over-optimistic. I was expecting gains of more than a 100%, influenced by the graphs in the groups often showing peak profits of over 400% during the events. I soon got to know about pre-pumping from the Investopedia article linked above and lowered my expectations.

My last attempt at a pump with the bot was great earning me a profit of 12%. My config file was setup to sell when the value of the Altcoin increased by 10%. The bot in its current state is very rudimentary and does not implement sophisticated algorithms of any kind. The next steps would be to incorporate trend analysis and identifiers, and possibly rewrite the bot in cython or C++.

---

## How the bot works

The bot works by waiting for an input for the coin (usually an altcoin) to be pumped in a CLI interface. For this I need to quickly enter the altcoin when it is announced (A web scraping method will be implemented soon). The bot then buys the altcoin using the coin pairing in the config file (often BTC). A market order is then executed using an async function, after which the bot queries the Binance server every fixed amount of time (this can also be configured) until the value of the altcoin reaches a configured threshold or the timeout for the bot has been reached. The timeout is in place to ensure that the bot would always sell all the altcoins in the event that the profit threshold was not reached to minimise loses.

---
