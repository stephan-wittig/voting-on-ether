<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [How to Set Up Developer Environment](#how-to-set-up-developer-environment)
	- [Step 0: Create new VM and install Lubuntu](#step-0-create-new-vm-and-install-lubuntu)
	- [Step 1: Insert guest additions](#step-1-insert-guest-additions)
	- [Step 2: Install guest additions](#step-2-install-guest-additions)
	- [Step 3: Install nodejs](#step-3-install-nodejs)
	- [Step 3: Get truffle:](#step-3-get-truffle)
	- [Step 4: Install Ganache (formerly known as Test RPC)](#step-4-install-ganache-formerly-known-as-test-rpc)
	- [Step 5: Install git](#step-5-install-git)
	- [Step 6: Install Atom](#step-6-install-atom)
	- [Step 7: Install a shitload of my favourite Atom packages](#step-7-install-a-shitload-of-my-favourite-atom-packages)
	- [Step 8: Install Browser with devtools](#step-8-install-browser-with-devtools)

<!-- /TOC -->

# How to Set Up Developer Environment
## Step 0: Create new VM and install Lubuntu
*   Get ISO here: [https://lubuntu.net/downloads/](https://lubuntu.net/downloads/)
*   Set up VM with >10Gb storage and >1Gb RAM

## Step 1: Insert guest additions
*   Click on 'Devices' in the VirtualBox window
*   Choose 'Insert guest additions'

## Step 2: Install guest additions
*   Navigate to media: `cd /media/username/VBox_GAs_5.2.16`
*   Install dependencies: `sudo apt-get install -y gcc make perl`
*   Run installer: `sudo sh VBoxLinuxAdditions.run`

## Step 3: Install nodejs
*   Install curl: `sudo apt-get -y install curl`
*   Get installer: `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`
*   Install: `sudo apt-get install -y nodejs`
*   Get module dependencies: `sudo apt-get -y install g++ build-essential`
*   Get yarn package manager:
```bash
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```
## Step 3: Get truffle:
```bash
sudo npm install -g truffle
```
## Step 4: Install Ganache (formerly known as Test RPC)
```bash
sudo npm install -g ganache-cli
```
## Step 5: Install git
```bash
sudo apt-get install git
git config --global user.name "yourname"
git config --global user.email your@email.com
```
## Step 6: Install Atom
```bash
curl -sL https://packagecloud.io/AtomEditor/atom/gpgkey | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] https://packagecloud.io/AtomEditor/atom/any/ any main" > /etc/apt/sources.list.d/atom.list'
sudo apt-get update
sudo apt-get install atom
```
## Step 7: Install a shitload of my favourite Atom packages
```bash
apm install pigments file-icons language-babel  linter linter-eslint autocomplete autocomplete-modules autocomplete-solidity autocomplete-paths scroll-through-time minimap minimap-git-diff open-terminal-here markdown-preview react-snippets language-solidity language-markdown markdown-pdf markdown-scroll-sync tool-bar markdown-writer markdown-toc linter-markdown tool-bar-markdown-writer project-manager
apm disable language-javascript
```
## Step 8: Install Browser with devtools
*   Install either Firefox or Chrome
*   Install redux and react developer tools addons
