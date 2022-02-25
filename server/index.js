const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const FriendModel = require('./models/Friends')


app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', 
    { useNewUrlParser: true }
)

app.post('/addfriend', async (req, res) => {

    const name = req.body.name
    const age = req.body.age

    const friend = new FriendModel({name: name, age: age})
    await friend.save()
    res.send(friend)
})

app.get('/read', async (req, res) => {
    FriendModel.find({}, (err, result) => {
        if(err){
            res.send(err)
        } else{
            res.send(result)
        }
    })
})

app.put('/update', async (req, res) => {
    const newAge = req.body.newAge
    const newName = req.body.newName
    const id = req.body.id

    try {
        await FriendModel.findById(id, (err, friendToUpdate) => {
            friendToUpdate.age = Number(newAge);
            friendToUpdate.name = String(newName);
            friendToUpdate.save()

        })
    } catch (error) {
        console.log(error);
    }
    res.send('Updated')
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    await FriendModel.findByIdAndRemove(id)
    res.send('item deleted')
})

app.listen(3008, () => {
    console.log('You are connected');
})