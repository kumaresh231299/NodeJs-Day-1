//import space
import express from "express";
import fs from 'fs';
import path from  'path';
import moment from 'moment';
import { fileURLToPath } from "url";


//Declaration / initalization
const app = express();
const PORT = 4000;

//Middleware
app.use(express.json())

//Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Folder creation
const FOLDER_PATH = path.join(__dirname, 'file')

// Ensure the folder exists
if (!fs.existsSync(FOLDER_PATH)) {
    fs.mkdirSync(FOLDER_PATH);
}

app.post('/create',(req,res)=>{
    //Get the current date and time
    const now = new Date();
    // const timestamp = format(now, 'yyyy-mm-dd_hh-mm-ss');
    const timestamp =  moment(now).format("MMM-DD YYYY__hh-mm-ss a");

    //create the filename based on the current date and time
    const filename = `${timestamp}.txt`
    const filepath = path.join(FOLDER_PATH, filename);

    //Write the current timestamp as content in the file
    fs.writeFile(filepath,`Timestamp: ${timestamp}`, (err)=>{

        if(err){
            console.error('error writing file:', err)
            return res.status(500).send('Error creating file');
        }
        
        res.send('File created successfully');

    });
});


//CreateApi
// api.get('/create',(req,res)=>{
//     res.status(200).json({message: "Created"})
// })

//Get
app.get('/list',(req,res)=>{

    fs.readdir(FOLDER_PATH,(err,files)=>{
        if(err){
            console.error('Error reading directory',err);
            return res.status(500).send('error reading directory');
        }

            const textFiles = files.filter(file => file.endsWith('.txt'));

            res.json(textFiles);
    })
})

//Running port
app.listen(PORT,()=>{
    console.log(`App is listening on the port ${PORT}`);
})