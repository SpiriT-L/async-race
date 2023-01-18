'use strict';

const urlApi = 'http://localhost:3000';

// requests
const garage = `${urlApi}/garage`;
const engine = `${urlApi}/engine`;
const winners = `${urlApi}/winners`;

export const getCars = async (page: string, limit = 7) => {
  const response = await fetch(`&{garage}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

