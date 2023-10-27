import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.css';
import configuration from '../build/contracts/CharityDonation.json'

const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

let account;

const accountEl = document.getElementById('account');
// const getTotalDonationsBtn = document.getElementById('getTotalDonations');
const getTotalDonationsEl = document.getElementById('totalDonations');
function stripZeros(input) {
    return parseFloat(input).toString();
}

const getTotalDonation = async () => {
    const organization = document.getElementById('organization').value;
    const totalDonations = await contract.methods.getTotalDonation(organization).call();
    stripZeros(totalDonations);
    getTotalDonationsEl.innerText = totalDonations;
}
const donate = async () => {
    const donationAmount = document.getElementById('amount').value;
    stripZeros(donationAmount);
    const organization = document.getElementById('organization').value;
    const reason = document.getElementById('reason').value;
    console.log(donationAmount, organization, reason);
     if (isNaN(parseFloat(donationAmount))) {
        console.error('Invalid donation amount');
        return;
    }
    const transaction = await contract.methods.donate(web3.utils.toWei(donationAmount,'ether'),organization, reason).send({
        from: account
    });
    console.log(transaction);
    await getTotalDonation();
}
const donateBtn = document.querySelector('button');
donateBtn.onclick = (event) => {
    event.preventDefault();
    donate();
}


const main = async () => {
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    accountEl.innerText = account;
    await donate();
}

main();