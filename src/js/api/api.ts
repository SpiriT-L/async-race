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

export const getCar = async (id: number) =>
  (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body: string) =>
  (
    await fetch(garage, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'appLication/json' },
    })
  ).json();

export const deleteCar = async (id: number) =>
  (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();
