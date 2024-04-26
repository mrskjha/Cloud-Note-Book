const route = require('express').Router();
const fetchuser = require('../middlerware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Route 1: Get all the notes using : POST "/api/auth/getuser". login required

route.get('/fetchallnotes',fetchuser,async (req, res) => {
    const notes =await Note.find({ user: req.user.id });
    res.json(notes);
});
//Route 2: Add a new notes using : POST "/api/auth/addnotes". login required

route.post('/addnotes',fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Enter a valid description').isLength({min:5}),
],async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Route 3: Update existing notes using : POST "/api/auth/updatenotes". login required
route.put('/updatenotes/:id',fetchuser,async (req, res) => {
   const {title, description, tag} = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")};

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json({note});

});
//Route 4: delete existing notes using : POST "/api/auth/updatenotes". login required
route.delete('/deletenotes/:id',fetchuser,async (req, res) => {
    
    //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")};

    //Allow deletion only if user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success": "Note has been deleted", note: note});

    
 
 });
module.exports = route;