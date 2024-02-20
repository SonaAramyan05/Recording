import { Chunk } from '../types';
import { dbConnectionProvider } from './db-connection-provider';
import { STORE_NAMES } from '../constants';

class RecordingDBProvider {

  getItems(): Promise<Chunk[] | undefined> {
    return dbConnectionProvider.getItems<Chunk[]>(STORE_NAMES.RECORDING);
  }

  async addItem(chunk: Chunk): Promise<Chunk | undefined> {
    return dbConnectionProvider.addItem<Chunk>(chunk, STORE_NAMES.RECORDING);
  }
}

export const recordingDBProvider = new RecordingDBProvider();
