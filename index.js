import express from 'express';
import fs from 'fs';
import path from 'path'; // Import the path module
import { format } from 'date-fns';

const app = express();
const PORT = 4000;
app.get('/',(req,res)=>{
    res.send("application is running successfully")
});

app.get('/write', (req, res) => {
    let today = format(new Date(), 'dd-mm-yyyy-HH-mm-ss');
    const filePath = `TimeStamp/${today}.txt`;
    fs.writeFileSync(filePath, `${today}`, 'utf8');
    res.send('File written successfully.');
});

app.get('/read', (req, res) => {
    let today = format(new Date(), 'dd-mm-yyyy-HH-mm-ss');
    const filePath = `TimeStamp/${today}.txt`;

    // Use fs.readdir to read the directory
    fs.readdir('TimeStamp', (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Filter out only text files
        const textFiles = files.filter((file) => path.extname(file) === '.txt');

        if (textFiles.length === 0) {
            res.status(404).send('No text files found.');
            return;
        }

        res.status(200).json(textFiles);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
