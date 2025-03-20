const router = require('express').Router();
const thoughtController = require('../../controllers/thoughtController');

router.route('/')
  .get(thoughtController.getThoughts)
  .post(thoughtController.createThought);

router.route('/:thoughtId')
  .get(thoughtController.getSingleThought)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

router.route('/:thoughtId/reactions')
  .post(thoughtController.addReaction);

router.route('/:thoughtId/reactions/:reactionId')
  .delete(thoughtController.removeReaction);

module.exports = router;