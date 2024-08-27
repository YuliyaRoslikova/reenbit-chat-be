import mongoose from 'mongoose';
import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('invalid id');
  const contact = await ContactsCollection.findById(id);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (Id, payload) => {
  const rawContact = await ContactsCollection.findOneAndUpdate(
    { _id: Id },
    payload,
    { new: true },
  );

  if (!rawContact) return null;

  return rawContact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findByIdAndDelete(contactId);
  return contact;
};
