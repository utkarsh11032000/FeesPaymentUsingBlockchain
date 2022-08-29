# Fees Payment Using BlockChain
Hello, I have create a DAPP application in Ethereum blockchain, where university can register students and the students can pay fees in ETH from their metamask wallets.
Technologies Used :

 - Node.js - BackEnd
 - React.js - FrontEnd
 - Web3.js - Integrating the Blockchain
 - Solidity - Smart Contracts 
 - Truffle - Solidity Compiler
 - Ganache - local blockchain

Reference :- [Dapp University (Youtube)](https://www.youtube.com/playlist?list=PLS5SEs8ZftgUTXs0OJD2LFpYBPr4L54id)

## Prerequisites
You must have [node](https://nodejs.org/en/download/) installed on your system. The next thing you will require is [ganache tool](https://trufflesuite.com/ganache/), for the wallet to make transactions on blockchain you need to install [metamask chrome extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) on the browser.
One more thing we will need to compile smart contracts written in solidity is truffle, one can install it using the following command after node is installed.

    npm install truffle


## Steps to run Project
Clone the repository ugin git clone command or downloading the file to the location you wish.
The next step would be to install all the dependencies that are required in the project, you need to go to the root directory of the project and type following command in command prompt.

    npm install
This will load all the dependencies required for the project.
Next thing one need to do is set up a local ethereum blockchain in ganache suite. After the blockchain is created lokgin to metamask wallet and click on the Add network named ganache local. In the field of RPC url you can find the url in ganache suite labelled as RPC server. Let the chain ID remain as it is ( in case it is blank just enter 1337 in that field). In the field of currency symbol you cna enter the symbol of currency according to user's choice, but in this project we will be using ETH as the symbol of our currency.

Next step is to import the account from blockchain to metamask, copy the private key from the key symbol given beside the account balance in ganache suite. Click on imort account in metamask and the paste the private key over there, now you can see the balance and the account address in the wallet.

_Voilà_ your local blockchain is ready to be used for transactions. Dont get your hopes high after looking at the ETH balance ;).

Now we will be running our DAPP by using the following command in command prompt.

    npm run start
this will run the DAPP in localhost:3000 in browser.
