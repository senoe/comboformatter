const fs = require("fs");
const chalk = require("chalk");
const rl = require("readline-sync");
const { version } = require("./package.json");

function main() {
    console.log(chalk.blueBright(`comboformatter v${version}`));

    let [fileName, accts] = getAccounts();
    accts = accts.toString().split("\n");

    let acctsFormatted = [];
    for (const line of accounts) {
        const elements = line.split(":");
        acctsFormatted.push(`${elements[0]}:${elements[1]}`);
    }

    const newFileName = fileName.split(".").slice(0, -1).join(".") + "-edited.txt";
    fs.writeFile(newFileName, acctsFormatted.join("\n"), function (err) {
        if (err) {
            console.log(err);
            return sleep(10000);
        }
        console.log(`\n[${chalk.blueBright("!")}] Saved account list to ${chalk.cyan(newFileName)}!`);
        return sleep(30000);
    });
}

function getAccounts() {
    while (true) {
        try {
            fileName = rl.question("account list: ");
            accts = fs.readFileSync(fileName);
            return [fileName, accts];
        } catch (err) {
            if (err.code == "ENOENT") {
                console.log(`[${chalk.red("x")}] The file ${chalk.cyan(fileName)} does not exist.\n`);
            } else {
                console.log(err);
            }
        }
    }
}

async function sleep(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
}

main();