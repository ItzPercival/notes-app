import Express from 'express'
import {getNotes, getId, createNote, deleteItem, updateNote} from './database.js'
const app = Express()
app.use(Express.json())



app.get('/notes', async (req, res) => {
    const notes = await getNotes()
    res.send(notes);
})

app.get('/notes/:id', async (req, res) => {
    const note = await getId(req.params.id)
    res.send(note);
})

app.post('/', async (req, res) => {
    const note = await createNote(req.body.title, req.body.contents)
    res.send(note)
})

app.post('/api/update', async (req, res) => {
    const updated = await updateNote(req.body.title, req.body.contents, req.body.id)
    
})

app.delete('/', async (req, res) => {
    const note = await deleteItem(req.body.id)
    res.send(note)
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('Something broke!')
})



const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}`))

