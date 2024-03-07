#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const axios = require("axios");
const {
  fetchBalance,
  fetchTransactions,
  fetchUTXOs,
  fetchPrice,
} = require("./helper");
/*
  to do
    fetch-transactions sat value returning undefined
    possibly move some functionality to helper function file
*/

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
    fetchPrice
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
    fetchUTXOs
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
    fetchBalance
  )
  .command(
    "fetch-transactions <address>",
    "fetch all transactions for a specific Bitcoin address using Mempool.space API",
    (yargs) => {
      yargs.positional("address", {
        describe: "Bitcoin address to fetch transactions for",
        type: "string",
      });
    },
    fetchTransactions
  )
  .demandCommand(1, "You need at least one command before moving on")
  .help() // Enable the automatic help information
  .alias("help", "h") // Allow users to type either --help or -h to get help information
  .describe("help", "Show help information") // Optional: Describe what the help command does
  .wrap(null).argv; // This will set the help text to automatically match the width of the terminal // parse the arguments and execute the command handler
// .parse(); // parse the arguments and execute the command handler
