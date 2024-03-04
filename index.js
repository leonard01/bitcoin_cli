#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const axios = require("axios");

yargs(hideBin(process.argv))
  .command(
    "greet", // the command name
    "print a greeting message", // description
    () => {}, // command builder function to specify command-specific options
    (argv) => {
      console.log("Welcome To The Bitcoin CLI");
    } // the function to execute when the command is invoked
  )
  .command(
    "btc-price", // the command name
    "fetch the current price of Bitcoin from the Coinbase API", // description
    () => {}, // command builder function to specify command-specific options
    async () => {
      // make the function async to use await for the HTTP request
      try {
        const response = await axios.get(
          "https://api.coinbase.com/v2/prices/spot?currency=USD"
        );
        console.log(
          `The current price of Bitcoin is $${response.data.data.amount} USD`
        );
      } catch (error) {
        console.error("Error fetching the Bitcoin price:", error.message);
      }
    }
  )
  .command(
    "eth-price",
    "fetches the current price of ETH from the coinbase API?",
    () => {
      console.log("Buy Bitcoin");
    }
  )
  .command(
    "fetch-utxos <address>",
    "fetch UTXOs for a specific Bitcoin address using Mempool.space API",
    (yargs) => {
      yargs.positional("address", {
        describe: "Bitcoin address to fetch UTXOs for",
        type: "string",
      });
    },
    async (argv) => {
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
  )
  .command(
    "fetch-balance <address>",
    "fetch the balance of a specific Bitcoin address using Mempool.space API",
    (yargs) => {
      yargs.positional("address", {
        describe: "Bitcoin address to fetch balance for",
        type: "string",
      });
    },
    async (argv) => {
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
  )
  .demandCommand(1, "You need at least one command before moving on")
  .help() // Enable the automatic help information
  .alias("help", "h") // Allow users to type either --help or -h to get help information
  .describe("help", "Show help information") // Optional: Describe what the help command does
  .wrap(null).argv; // This will set the help text to automatically match the width of the terminal // parse the arguments and execute the command handler
// .parse(); // parse the arguments and execute the command handler