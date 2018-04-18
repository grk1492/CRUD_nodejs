var Note = require('../models/note.model.js');

//Crée et save la new note
exports.create = (req,res) => {
		//valide req
		if(!req.body.content) {
			return res.status(400).send({
				message:"you must right something !!"
			});
		}

		//create a note
		const note = new Note({
			title: req.body.title || "No title",
			content: req.body.content
		});

		//save note into db
		note.save()
		.then(data => {
			res.send(data);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error during creating note"
			});
		});
};
//Récupère toutes les notes
exports.findAll = (req,res) => {
		Note.find()
		.then(notes => {
			res.send(notes);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error during retrieving of notes"
			});
		});
		
};

//cherche une note via id
exports.findOne = (req,res) => {
		Note.findById(req.params.noteId)
		.then(note => {
			if(!note) {
				return res.status(404).send({
					message: "Note not found with id " + req.params.noteId
				});
			}

			res.send(note);
		}).catch(err => {
			if(err.kind === "ObjectId") {
				return res.status(404).send({
					message: "Note not found with id " + req.params.noteId
				});
			}

			return res.status(500).send({
				message: "Error retrieving note with id " + req.params.noteId
			});
		});
};

//update une note via id
exports.update = (req,res) => {
		//valide req
		if(!req.body.content) {
			return res.status(400).send({
				message: "Note content can not be empty"
			});
		}
		//find note and update it
		Note.findByIdAndUpdate(req.params.noteId, {
			title: req.body.title || "No title",
			content: req.body.content
			//{new:true}renvoi l'objet update dans le then plutot que l'originale
		},{new:true})
		.then(note => {
			if(!note) {
				return res.status(400).send({
					message: "Note not found with id " + req.params.noteId
				});
			}

			res.send(note);
		}).catch(err => {
			if(err.kind === "ObjectId") {
				return res.status(400).send({
					message: "Note not found with id " + req.params.noteId
				});
			}

			return res.status(500).send({
				message: "Error updating note with id " + req.params.noteId
			});
		});
};

//supprime une note via id
exports.delete = (req,res) => {
		Note.findByIdAndRemove(req.params.noteId)
		.then(note => {
			if(!note) {
				return res.status(404).send({
					message: "Note not found with id " + req.params.noteId
				});
			}

			res.send({message:"Note deleted successfully !!!"});
		}).catch(err => {
			if(err.kind === "ObjectId" || err.name === "Notfound") {
				return res.status(404).send({
					message: "Note not found with id " + req.params.noteId
				});
			}

			return res.status(500).send({
				message: "Could not delete not with id " + req.params.noteId
			});
		});
};