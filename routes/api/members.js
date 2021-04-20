const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

// Get all members
router.get('/', (req, res) => res.json(members));

// Get selected member
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const found = members.some((member) => member.id === id);
  found
    ? res.send(members.filter((member) => member.id === id))
    : res.status(400).send({ error: `No member with the id ${id} found!` });
});

// Create member
router.post('/', (req, res) => {
  const updMember = req.body;
  const newMember = {
    id: uuid.v4(),
    name: updMember.name,
    email: updMember.email,
    status: 'active',
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ error: 'Please enter name and email!' });
  }

  members.push(newMember);

  res.send(members);
});

// Update a member
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updMember = req.body;
  const found = members.some((member) => member.id === id);
  if (found) {
    members.forEach((member) => {
      if (id === member.id) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({
          message: `Member with the id ${member.id} Updated!`,
          members,
        });
      }
    });
  } else {
    res.status(400).send({ error: `No member with the id ${id} found!` });
  }
});

// Delete a member
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const found = members.some((member) => member.id === id);
  if (found) {
    res.json({
      members: members.filter((member) => member.id !== id),
      message: `Member with the id ${id} Deleted!`,
    });
  } else {
    res.status(400).send({ error: `No member with the id ${id} found!` });
  }
});

module.exports = router;
