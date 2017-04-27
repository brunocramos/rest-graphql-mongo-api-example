import userController from './src/v1/users/controllers/user';
import agendaController from './src/v1/agenda/controllers/agenda';

const errorHandler = (req, res, fn) => {
  fn()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(400).send({ error });
    })
};

export default (app, version) => {
  // Default
  app.get(`/${version}`, (req, res) => { res.json({ hello: 'Word' }); });

  // Users
  app.get(`/${version}/user`, (req, res) => errorHandler(req, res, () => userController.getUsers()));
  app.get(`/${version}/user/:_id`, (req, res) => errorHandler(req, res, () => userController.getUserById(req.params._id)));
  app.post(`/${version}/user`, (req, res) => errorHandler(req, res, () => userController.createUser(req.body)));
  app.put(`/${version}/user/:_id`, (req, res) => errorHandler(req, res, () => userController.updateUser(req.params._id, req.body)));
  app.delete(`/${version}/user/:_id`, (req, res) => errorHandler(req, res, () => userController.deleteUser(req.params._id)));

  // Agenda
  app.get(`/${version}/user/:_id/agenda`, (req, res) => errorHandler(req, res, () => agendaController.getAgendasForUserId(req.params._id)));
  app.post(`/${version}/user/:_id/agenda`, (req, res) => errorHandler(req, res, () => agendaController.createAgendaForUserId(req.params._id, req.body)));

  app.get(`/${version}/user/:_id/agenda/:agendaId`, (req, res) => errorHandler(req, res, () => agendaController.getAgendaById(req.params._id, req.params.agendaId)));
  app.put(`/${version}/user/:_id/agenda/:agendaId`, (req, res) => errorHandler(req, res, () => agendaController.updateAgenda(req.params._id, req.params.agendaId, req.body)));
  app.delete(`/${version}/user/:_id/agenda/:agendaId`, (req, res) => errorHandler(req, res, () => agendaController.deleteAgenda(req.params._id, req.params.agendaId)));

  app.post(`/${version}/user/:_id/agenda/:agendaId/users`, (req, res) => errorHandler(req, res, () => agendaController.addInvitedUserToAgenda(req.params._id, req.params.agendaId, req.body)));
}
