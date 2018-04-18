module.exports = (app) =>  {
	const notes = require('../controllers/note.controller.js');

	//Crée une note 
	app.post('/notes', notes.create);

	//Récupère toutes les notes
	app.get('/notes', notes.findAll);

	//Récupère une note via l'id 
	app.get('/notes/:notesID', notes.findOne);

	//Update une node via id
	app.put('/notes/:notesID', notes.update);

	//Supprime une note via id
	app.delete('/notes/:notesID',notes.delete);
}