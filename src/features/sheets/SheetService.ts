import { google } from "googleapis";
import DataBaseService from "../database/DataBaseService";
import GeminiService from "../openai/OpenRouterService";

import { Product } from '../../models/Product';
const dotenv = require('dotenv');
dotenv.config();

class SheetService {


    constructor() {
    }

    public async readSheet() {
        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });
        const sheets = google.sheets({ version: 'v4', auth });

        const spreadsheetId = '18g0YOpfwfMiqeIV0k4tE83nZFv0CFxHfvUhMeVnXc2c';
        const range = 'Publico!A9:H106';
        // const range = 'Publico!A9:H14';

        const res = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = res.data.values;
        if (!rows || rows.length === 0) {
            console.error('❌ No se encontraron datos en la hoja');
            return;
        }

        let lastRow = ['', '', '', '', '', '', '', ''];
        const products: any[] = [];

        for (const row of rows) {
            const currentRow = row.map((cell, idx) => {
                if (cell && cell.trim() !== '') {
                    lastRow[idx] = cell;
                    return cell;
                } else {
                    return lastRow[idx];
                }
            });
            const [reference, description, size, color, price, category1, category2, type] = currentRow;

            if (reference && price) {
                products.push({
                    reference,
                    description: description || '',
                    size: size ? size.split(',').map((s: string) => s.trim()) : [],
                    color: color || '',
                    price: price,
                    category1,
                    category2,
                    type,
                });
            }
        }
        // console.log('✅ Productos leídos:', products);
        
        await DataBaseService.saveCollection('products1', products);
        const results = await Product.find({}, { _id: 1, description: 1 });
        const response = await GeminiService.sendMessage(results);
        try {
            if (response) {
                const parsed = JSON.parse(response);

                for (const item of parsed) {
                    await Product.updateOne(
                        { _id: item._id },
                        { $set: { features: item.features } }
                    );
                }

                console.log('✅ Features updated in MongoDB');
            }
        } catch (error) {
            console.error('❌ Error updating features in MongoDB:', error);
        }
        
        return response;
    }
}

export default new SheetService();