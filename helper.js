const axios = require("axios");

async function fetchBalance(argv) {
  const url = `https://mempool.space/api/address/${argv.address}`;
  try {
    const response = await axios.get(url);
    const balance =
      response.data.chain_stats.funded_txo_sum -
      response.data.chain_stats.spent_txo_sum;
    console.log(`Balance for address ${argv.address}: ${balance} satoshis`);
  } catch (error) {
    console.error(
      `Error fetching balance for address ${argv.address}:`,
      error.message
    );
  }
}

//returns all transactions for a specific address
async function fetchTransactions(argv) {
  const url = `https://mempool.space/api/address/${argv.address}/txs`;
  try {
    const response = await axios.get(url);
    const transactions = response.data;
    if (transactions.length > 0) {
      console.log(`Transactions for address ${argv.address}:`);
      transactions.forEach((tx, index) => {
        const status = tx.status.confirmed ? "Confirmed" : "Unconfirmed";
        console.log(
          `${index + 1}: Txid: ${tx.txid}, Satoshi Value: ${
            tx.value
          }, Status: ${status}, Time: ${
            tx.status.block_time
              ? new Date(tx.status.block_time * 1000).toLocaleString()
              : "N/A"
          }`
        );
      });
    } else {
      console.log(`No transactions found for address ${argv.address}.`);
    }
  } catch (error) {
    console.error(
      `Error fetching transactions for address ${argv.address}:`,
      error.message
    );
  }
}

async function fetchPrice() {
  console.log("got here"),
    () => {},
    async () => {
      // make the function async to use await for the HTTP request

      try {
        console.log("got here");
        const response = await axios.get(
          "https://api.coinbase.com/v2/prices/spot?currency=USD"
        );
        console.log(
          `The current price of Bitcoin is $${response.data.data.amount} USD`
        );
      } catch (error) {
        console.error("Error fetching the Bitcoin price:", error.message);
      }
    };
}

// fetch all UTXOs for an address
async function fetchUTXOs(argv) {
  const url = `https://mempool.space/api/address/${argv.address}/utxo`;
  try {
    const response = await axios.get(url);
    const utxos = response.data;
    if (utxos.length > 0) {
      console.log(`UTXOs for address ${argv.address}:`);
      utxos.forEach((utxo, index) => {
        console.log(
          `${index + 1}: Txid: ${utxo.txid}, Output Index: ${
            utxo.vout
          }, Amount: ${utxo.value} satoshis`
        );
      });
    } else {
      console.log(`No UTXOs found for address ${argv.address}.`);
    }
  } catch (error) {
    console.error(
      `Error fetching UTXOs for address ${argv.address}:`,
      error.message
    );
  }
}

module.exports = { fetchBalance, fetchTransactions, fetchUTXOs, fetchPrice };
