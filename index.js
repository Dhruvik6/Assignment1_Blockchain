const { Web3 } = require("web3")

var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545/'));

let contract;
const contractAddress = "0xA85B828317c0A2d3eFeE53626C2C110510b695Ce";
const contractABI = [
	{
		"inputs": [],
		"name": "getDocument",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_content",
				"type": "string"
			}
		],
		"name": "storeDocument",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


const InitializeAccount = async () => {
    // const accounts = await web3.eth.requestAccounts();
    const accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];
    contract = new web3.eth.Contract(contractABI, contractAddress, {
        from: accounts[0]
    });
}

const content = "My name is Dhruvik";

const CallGanacheToStoreDocument = async () => {
    await contract.methods.storeDocument(content).send();
}

const RetrieveDocumentFromGanache = async () => {
    const result = await contract.methods.getDocument().call();
    console.log("Result is:", result)
}

InitializeAccount()
.then(() => {
    CallGanacheToStoreDocument()
    .then(async () => {
        console.log("Document saved successfully")
        await RetrieveDocumentFromGanache()
    })
    .catch((error) => {
        console.log("Error in saving the document")
        console.log(error)
    })
})
.catch((error) => {
    console.log("Initialization failed")
    console.log(error)
})
