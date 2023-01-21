'use strict';

import { Cars, Car, AnyCar, Engine, Winner, Winners } from '../shared/types';

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

export const updateCar = async (id: number, body: string) =>
  (
    await fetch(`${garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const startEngine = async (id: number) =>
  (await fetch(`${engine}?id=${id}&status=started`)).json();

export const stopEngine = async (id: number) =>
  (await fetch(`${engine}?id=${id}&status=stopped`)).json();

export const getSortOrder = (sort: string | null, order: string | null) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
};

export const getWinners = async ({
  page,
  limit = 10,
  sort,
  order,
}: {
  page: number;
  limit?: number;
  sort?: string | null;
  order?: string | null;
}): Promise<Winners> => {
  const response = await fetch(
    `${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`
  );

  const items = await response.json();

  return {
    items: await Promise.all(
      items.map(async (winner: Winner) => ({
        ...winner,
        car: await getCarById(winner.id.toString()),
      }))
    ),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getWinner = async (id: number) =>
  (await fetch(`${winners}/${id}`)).json();

export const getWinnerStatus = async (id: number) =>
  (await fetch(`${winners}/${id}`)).status;

export const deletWinner = async (id: number) =>
  (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

export const createWinner = async (body: Winner): Promise<void> =>
  (
    await fetch(winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const updateWinner = async (id: number, body: Winner): Promise<void> =>
  (
    await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const saveWinner = async ({
  id,
  time,
}: {
  id: number;
  time: number;
}): Promise<void> => {
  const winner = await getWinner(id);
  await updateWinner(id, {
    id,
    wins: winner.wins + 1,
    time: time < winner.time ? time : winner.time,
  });
};
