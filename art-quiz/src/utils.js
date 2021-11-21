const createFragmentFromString = (str) => {
  const template = document.createElement('template');
  template.innerHTML = str;
  return template.content;
};

const parseRequestURL = () => {
  // eslint-disable-next-line no-restricted-globals
  const url = location.hash.slice(1).toLowerCase() || '/';

  const r = url.split('/');

  return {
    resource: r[1] || null,
    id: r[2] || null,
    verb: r[3] || null,
  };
};

const getRoute = () => {
  const request = parseRequestURL();

  return (request.resource ? `#/${request.resource}` : '#/')
  + (request.id ? '/:id' : '')
  + (request.verb ? `/${request.verb}` : '');
};

export default { createFragmentFromString, parseRequestURL, getRoute };
