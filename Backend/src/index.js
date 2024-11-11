import express from "express";
import cors from "cors";
import { getItemCardInfo } from './handledb.js';
import fs from "fs/promises"; // Import fs for file handling

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000; 

app.get('/iteminfo', async (req, res) => {
    const itemCardInfo = await getItemCardInfo();
    res.json(itemCardInfo);
});


app.post('/updateStock', async (req, res) => {
    const cart = req.body;

    try {
        const itemCardInfo = await getItemCardInfo();

        cart.forEach(purchasedItem => {
            const item = itemCardInfo.find(i => i.id === purchasedItem.id);
            if (item && item.stock >= purchasedItem.quantity) {
                item.stock -= purchasedItem.quantity;
            }
        });

        await fs.writeFile('./src/itemCardInfoDB.json', JSON.stringify(itemCardInfo, null, 2));

        res.status(200).send("Lagersaldo uppdaterat");
    } catch (error) {
        console.error("Något gick fel, lagersaldot uppdaterades inte:", error);
        res.status(500).send("Något gick fel, lagersaldot uppdaterades inte");
    }
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});