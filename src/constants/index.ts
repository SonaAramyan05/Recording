export const TIME_EVENTS = {
  ON_UPDATE: 'ON_UPDATE',
}

type StoreModel = {
  name: string;
  keyPath: string;
}

export const STORE_NAMES = {
  RECORDING: 'recording',
  USERS: 'users',
};

export const STORE_KEY_PATHS = {
  CHUNK_ID: 'chunkId',
  USER_ID: 'userId',
};

export const STORES: StoreModel[] = [
  {
    name: STORE_NAMES.RECORDING,
    keyPath: STORE_KEY_PATHS.CHUNK_ID,
  },
  {
    name: STORE_NAMES.USERS,
    keyPath: STORE_KEY_PATHS.USER_ID,
  },
];
