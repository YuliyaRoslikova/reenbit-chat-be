import mongoose from 'mongoose';
import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  type = null,
  isFavourite = null,
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const filter = {};
  if (typeof type === 'string') filter.contactType = type;
  if (typeof isFavourite === 'boolean') filter.isFavourite = isFavourite;

  const contactsQuery = ContactsCollection.find(filter);

  contactsQuery.where('userId').equals(userId);

  const contactsCount = await ContactsCollection.find(filter)
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContact = async (id, userId) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('invalid id');
  const contact = await ContactsCollection.findOne({ _id: id, userId });
  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await ContactsCollection.create({
    ...payload,
    userId,
  });
  return contact;
};

export const updateContact = async (id, payload, userId) => {
  const rawContact = await ContactsCollection.findOneAndUpdate(
    { _id: id, userId },
    payload,
    { new: true },
  );

  if (!rawContact) return null;

  return rawContact;
};

export const deleteContact = async (id, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: id,
    userId,
  });
  return contact;
};
