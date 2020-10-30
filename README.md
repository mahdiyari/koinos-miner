![Koinos Miner](assets/images/koinos-cli-miner-banner.png)

[![GitHub Issues](https://img.shields.io/github/issues/open-orchard/koinos-miner.svg)](https://github.com/open-orchard/koinos-miner/issues)
[![GitHub License](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://github.com/open-orchard/koinos-miner/blob/master/LICENSE.md)

# Koinos Miner: Wolf Edition

This miner has been enhanced with some great features, you can read more about them under the section **Getting Started**.

For the official version from OpenOrchard, please go [here](https://github.com/open-orchard/koinos-miner). 

OpenOrchard have given their green-light for the idea behind this miner version! 👍 They, however, have not verified nor checked the code nor are they affiliated with this version. I am using it extensively myself, but there *could* be bugs.

## Table of Contents
  - [Dependencies](#dependencies)
  - [Installation](#installation)
  - [Getting Started](#getting-started)
  - [Key Management](#key-management)
  - [Example Run](#example-run)
  - [FAQ](#FAQ)

## Dependencies

Prior to installation, you'll need to install the necessary dependencies.

### Linux (Debian based)

```
sudo apt-get install git cmake build-essential libssl-dev
```

### macOS

On macOS, installing `gcc` is required to support OpenMP parallelization. Using the `brew` package manager, install OpenSSL and gcc.
```
brew install openssl gcc cmake
```

### Windows

On Windows, ensure that you are using the `MingW` compiler and you have installed `CMake`. Using the cholocately package manager, install OpenSSL.

```
choco install openssl
```

## Installation

For both Windows and Linux, you should be able to simply invoke the standard `npm` installer.

```
npm install
```

For macOS, you will need to specify the C compiler as `gcc`.

```
CC=gcc-10 npm install
```

For macOS, you also might need to set the correct openssl directory:

```
#1: Find your local ssl path (example: /usr/local/Cellar/openssl@1.1 or /usr/local/Cellar/openssl)
#2: Open package.json, change "postinstall" to "postinstall:other" and "postinstall:osx" to "postinstall"
#3: Look at "postinstall" and change the ssl paths for "DOPENSSL_ROOT_DIR" and "DOPENSSL_LIBRARIES". The second path is the same as the first just with "/lib" at the end
```

## Getting started

You can view the CLI miner arguments by using `npm` like so:

```
npm start -- --help
```

And get the following output:

```
❯ npm start -- --help

> koinos-miner@1.0.4 start /path/to/koinos-miner
> node app.js "--help"

Usage: app [OPTIONS]...

Options:
  -v, --version                      output the version number
  -a, --addr <addr>                  An ethereum address
  -e, --endpoint <endpoint>          An ethereum endpoint (default: "http://mining.koinos.io")
  -t, --tip <percent>                The percentage of mined coins to tip the developers (default: "5")
  -p, --proof-period <seconds>       How often you want to submit a proof on average (default: "86400")
  -k, --key-file <file>              AES encrypted file containing private key
  -m, --gas-multiplier <multiplier>  The multiplier to apply to the recommended gas price (default: "1")
  -l, --gas-price-limit <limit>      The maximum amount of gas to be spent on a proof submission (default: "1000000000000")
  -l, --gwei-limit <limit>           [NEW] The maximum amount of gas in gwei unit to be spent on a proof submission (default: "1000")
  -l, --gwei-minimum <minimum>       [NEW] The minimum amount of gas in gwei unit to be spent on a proof submission (default: "15")
  -s, --speed <speed>                [NEW] How fast should the transaction be: slow | medium | optimal | fast | fastest (default: "optimal")
                                     (https://fees.upvest.co/estimate_eth_fees)`
  --import                           Import a private key
  --export                           Export a private key
  --use-env                          [NEW] Use private key from .env file (privateKey=YOUR_PRIVATE_KEY)
  --wolf-mode                        [NEW] Using this option is going to reward 1% (or --tip if > 0) of your mined coins to the maintainer of this version
  -h, --help                         display help for command
```

**Recipient Address**: The `--addr` argument specifies the recipient address, this is where KOIN will be rewarded.

**Ethereum Endpoint**: The `--endpoint` argument specifies the Ethereum node to be used when querying contract information and submitting proofs.

**Developer Tip**: The `--tip` argument specifies the percentage of rewarded KOIN to donate to the development team, thank you!

**Proof Period**: The `--proof-period` argument specifies the number of seconds on average the miner will attempt to mine and submit proofs.

**Speed [NEW]**: The `--speed` arguments determines how fast should the transaction be: slow | medium | optimal | fast | fastest (https://fees.upvest.co/estimate_eth_fees) - (default: optimal => golden middle between medium and fast)

**Gas Multiplier**: The `--gas-multiplier` argument specifies a multiplier to apply to the calculated gas price. This can be used to get your proofs submitted when the Ethereum network gas fees are spiking or are unpredictable.

**Gas Price Limit**: The `--gas-price-limit` argument specifies a cap in the acceptable gas price for a proof submission.

**Gwei Limit [NEW]**: The `--gwei-limit` argument specifies a cap in the acceptable gas price (in gwei unit) for a proof submission.

**Gwei Minimum [NEW]**: The `--gwei-minimum` argument specifies the minimum amount of gas (in gwei unit) to be paid for a proof submission.

- *Info:* `--gwei-limit` and `--gwei-minimum` were added later to make it easier, as gwei prices are simpler to read. To provide backwards compatability, `--gas-price-limit` is still supported and will be used if `--gwei-limit` is not set. However, `--gwei-price-limit` is recommended.
- 1 Gwei = 1000000000 Gas (https://eth-converter.com/)
- A more detailed explanation of the different miner configurations can be found in the [Koinos GUI Miner](https://github.com/open-orchard/koinos-gui-miner) `README.md`.

## Key Management

The CLI miner provides the arguments `--import`, `--export`, and `--key-file`. These are used in handling the private key of the funding address. The user may import a private key and optionally store it in a key file in which case exporting the key is now possible.

If you know what you're doing, you can also use `--use-env` to get the key from an `.env` file:

```
echo privateKey=YOUR_PRIVATE_KEY | tee .env
```

## Example Run

A simple example of running the miner:

```
❯ npm start -- --endpoint http://mining.koinos.io --addr 0x98047645bf61644caa0c24daabd118cc1d640f62 --use-env --speed optimal --tip 5 --proof-period 20000 --gwei-minimum 30 --wolf-mode

> koinos-miner@1.0.3 start /path/to/koinos-miner
> node app.js "--endpoint" "http://mining.koinos.io" "--addr" "0x98047645bf61644caa0c24daabd118cc1d640f62" "--use-env" "--speed" "optimal" "--proof-period" "20000" "--gwei-minimum" "30" "--tip" "5" "--wolf-mode"

 _  __     _                   __  __ _
| |/ /    (_)                 |  \/  (_)
| ' / ___  _ _ __   ___  ___  | \  / |_ _ __   ___ _ __
|  < / _ \| | '_ \ / _ \/ __| | |\/| | | '_ \ / _ \ '__|
| . \ (_) | | | | | (_) \__ \ | |  | | | | | |  __/ |
|_|\_\___/|_|_| |_|\___/|___/ |_|  |_|_|_| |_|\___|_|
------------- Version 1.0.4 (Wolf Edition) -------------
--------------------------------------------------------

[JS](app.js) Mining with the following arguments:
[JS](app.js) Ethereum Receiver Address: 0x98047645bf61644caa0c24daabd118cc1d640f62
[JS](app.js) Ethereum Miner Address: 0x9d2DfA86488fSSF1f41bC02CE94C74Bb0dE47Da6
[JS](app.js) Ethereum Endpoint: http://mining.koinos.io
[JS](app.js) Proof every 6h (20000)
[JS](app.js) Open Orchard Developer Tip: 5%
[JS](app.js) Wolf Mode Engaged! Gracias!


```
# FAQ

## What is “Proof Frequency?”

The key to understanding the proof frequency is that this number isn’t a “real” setting in the miner. Instead what you are modifying is the *difficulty* of the problem your miner is trying to solve. Harder problems take longer to solve, but the time it takes to solve them is just a guesstimation. The miner might solve the problem right away, or take an unusually long time. It will only rarely take exactly the time you expect it to take.

## Why Set a Low Frequency?

In the case of PoW KOIN mining, increased difficulty results in a higher *potential* KOIN reward. But again, there is randomness here too. The KOIN reward *might* be large, but it might also be small. So a lower number (e.g. 1 per day or 2 per day) is likely to win you larger KOIN rewards. But an added benefit is that it minimizes your Ethereum fees as well.

## Why Set a High Frequency?

Low frequency proofs (i.e. high difficulty) give you bigger potential rewards, so why would you increase the frequency especially considering it will result in higher Ethereum fees? One way to think about mining is like it’s a lottery (except it has slightly better odds ;) ). If you buy enough tickets, you can expect to win an approximate number of times. But you know that your odds of winning with any single ticket is very low. So what do you do? You increase the number of tickets you buy. You make sure that you’re playing the game enough times so that *over the long run* you receive the rewards that the probabilities say you should.

## What Happens if I Shut Down the Miner?

Note that setting a higher frequency doesn’t help you beat someone else to the punch. Your computer is solving hundreds of thousands (or millions) of “losing” hashes every second that it is throwing in the trash, just as you would a losing lottery ticket. It is not saving those hashes, it is searching for one “winning” hash and when it finds that hash it immediately submits a proof to the Ethereum network. This is why it doesn’t matter if your computer loses access to the internet or you just turn off the miner for a moment. You don’t “lose” anything other than the opportunity costs associated with the time that could have been spent mining.

# Why Mine?

It’s important to remember that our mission is to give everyone ownership and control over their digital selves. The foundational product we are releasing to serve that mission is the Koinos mainnet and the purpose of this mining phase is to decentralize the token distribution and ensure that when it launches, the Koinos mainnet is as decentralized as any blockchain out there, if not more!

KOIN will be the cryptocurrency that powers a decentralized computer built from the ground up to enable developers to offer delightful user experiences while protecting the user’s digital information through blockchain integration. The purpose of this phase is to get KOIN into the hands of developers and users who want be able to use the types of applications that Koinos is capable of powering.

## License

Copyright 2020 Open Orchard, Inc.

Koinos Miner is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Koinos Miner is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Koinos Miner.  If not, see <https://www.gnu.org/licenses/>.
