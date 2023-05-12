const {Contact} = require('../models/models')

class ContactController {
  async create(req, res) {
    const {fullName, address, email, phone} = req.body;
    const {id} = req.user;
    const contact = await Contact.create({fullName, address, email, userId: id, phone});
    return res.json(contact);
  }

  async getAll(req, res) {
    const {id} = req.user;
    const contacts = await Contact.findAll({where: {userId: id}})
    return res.json(contacts);
  }

  async update(req, res) {
    const {id} = req.params;
    const {fullName, address, email, phone} = req.body;
    const {id: userId} = req.user;
    const contact = await Contact.update({fullName, address, email, userId, phone},
        {where: {userId, id}}
    );
    return res.json(contact);
  }

  async delete(req, res) {
    const {id} = req.params;
    const contact = await Contact.destroy({where: {id}});
    return res.json(contact);
  }
}

module.exports = new ContactController();
