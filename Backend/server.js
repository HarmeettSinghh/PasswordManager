import express from 'express'
import 'dotenv/config'
import connectDB from './Connections/connectDb.js'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 3000
import { Keysy } from './models/Schema.js'
import { v4 as uuidv4 } from 'uuid'




app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//third party middlewRE
app.use(cors())
//Connect to database
connectDB()


// get the passwords
app.get('/', async (req, res) => {
    try {
        const datas = await Keysy.find({})
        res.json(datas);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// create the data
app.post('/', async (req, res) => {
    try {
        await Keysy.create({
            id: uuidv4(),
            siteURL: req.body.siteURL,
            userName: req.body.userName,
            password: req.body.password,
        })
        res.status(201).json({ create: true });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// update the data
app.put('/', async (req, res) => {
    try {
        const data = await Keysy.findOneAndUpdate(
            { id: req.body.id },
            {
                siteURL: req.body.siteURL,
                userName: req.body.userName,
                password: req.body.password,
            },
            { new: true }
        )
        if (!data) {
            return res.status(404).json({ message: "Entry is not found" })
        }
        res.status(200).json({ update: true })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// delete the data
app.delete('/', async (req, res) => {
    try {
        const result = await Keysy.deleteOne(
            { id: req.body.id }
        )
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Entry is not found" })
        }
        res.status(200).json({ message: "Entry Deleted successfully" })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`))