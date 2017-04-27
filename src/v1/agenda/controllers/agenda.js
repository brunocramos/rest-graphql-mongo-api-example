import Agenda from '../models/agenda';

class AgendaController {
  constructor(Agenda) {
    this.Agenda = Agenda;
  }

  getAgendasForUserId(userId) {
    return this.Agenda.find({ userId });
  }

  getAgendaById(userId, _id) {
    return this.Agenda.findOne({ userId, _id });
  }

  createAgendaForUserId(userId, data) {
    data.userId = userId;
    return this.Agenda.create(data);
  }

  async updateAgenda(userId, _id, data) {
    const agenda = await this.getAgendaById(userId, _id);
    if (!agenda) {
      return Promise.reject('Not found');
    }
    Object.assign(agenda, data);

    return agenda.save();
  }

  async deleteAgenda(userId, _id) {
    return this.Agenda.remove({ userId, _id });
  }

  async addInvitedUserToAgenda(userId, _id, data) {
    const agenda = await this.getAgendaById(userId, _id);
    if (!agenda) {
      return Promise.reject('Not found');
    }

    agenda.invitedUsers = agenda.invitedUsers || [];
    if (agenda.invitedUsers.indexOf(data.userId) === -1) {
      agenda.invitedUsers.push(data.userId);
      return agenda.save();
    }

    return Promise.resolve(agenda);
  }
}

export default new AgendaController(Agenda);
