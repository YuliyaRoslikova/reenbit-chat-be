const parseIsFavourite = (isFavourite) => {
  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;
  return null;
};

const parseType = (type) => {
  const isValidType = ['work', 'home', 'personal'].includes(type);
  return isValidType ? type : null;
};

export const parseFilterParams = (query) => {
  const { isFavourite, type } = query;

  const parsedIsFavourite = parseIsFavourite(isFavourite);
  const parsedType = parseType(type);

  return {
    isFavourite: parsedIsFavourite,
    type: parsedType,
  };
};
