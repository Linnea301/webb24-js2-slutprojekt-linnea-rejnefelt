import fs from "fs/promises";

export async function getItemCardInfo() {
    const rawdata = await fs.readFile('./src/itemCardInfoDB.json');
    return JSON.parse(rawdata);
}

