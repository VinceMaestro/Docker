const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  Web3 = require('web3')
  fs = require('fs')
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

  code = fs.readFileSync('Voting.sol').toString()
  solc = require('solc')
  compiledCode = solc.compile(code)

  abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
  VotingContract = web3.eth.contract(abiDefinition)

  byteCode = compiledCode.contracts[':Voting'].bytecode
  deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})

  contractInstance = VotingContract.at(deployedContract.address)
  res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
