import { createDefer } from "../helpers/async";
import { STORES } from "../constants";

const DB_NAME: string = "my-db";
const DB_VERSION: number = 1;

class DBConnectionProvider {
    db: IDBDatabase | null = null;
    isDBOpenedDefer = createDefer();

    openDB() {
        if (this.db) {
            return this.db;
        }
        const indexedDB =
            window.indexedDB ||
            (window as any).mozIndexedDB ||
            (window as any).webkitIndexedDB ||
            (window as any).msIndexedDB ||
            (window as any).shimIndexedDB;

        if (!indexedDB) {
            console.error("Browser does not support indexedDB");
            return;
        }
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = this.onError;
        request.onupgradeneeded = this.onUpgradeNeeded;
        request.onsuccess = this.onsuccess;
    }

    private onError = (event: Event) => {
        const { code, message, name } =
            (event.target as IDBOpenDBRequest).error || {};

        console.error(`Error code - ${code}: ${message}, ${name}`);
    };

    private onUpgradeNeeded = async (event: IDBVersionChangeEvent) => {
        this.db = (event.target as IDBOpenDBRequest).result;

        STORES.forEach(({ name, keyPath }) => {
            if (!this.db!.objectStoreNames.contains(name)) {
                console.log(`Creating object store: ${name}`);
                this.db!.createObjectStore(name, { keyPath });
            }
        });

        this.isDBOpenedDefer.resolve();
    };

    private onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        this.isDBOpenedDefer.resolve();
        console.log("IndexedDB is opened.");
    };

    async getItems<T>(storeName: string) {
        if (!this.db) {
            return;
        }
        const defer = createDefer<T>();
        const transaction = this.db!.transaction(storeName, "readonly");
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.getAll();

        request.onsuccess = (event) => {
            defer.resolve((event.target as IDBOpenDBRequest).result as T);
        };
        request.onerror = (event) => {
            defer.reject(new Error(`Can not get items.`));
        };
        return defer.promise!;
    }

    async addItem<T>(item: T, storeName: string) {
        if (!this.db) {
            return;
        }
        const defer = createDefer<T>();
        const transaction = this.db!.transaction(storeName, "readwrite");
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.add(item);

        request.onsuccess = () => {
            defer.resolve(item);
        };
        request.onerror = (event) => {
            defer.reject(new Error(`Item is not added.`));
        };

        return defer.promise!;
    }
}

export const dbConnectionProvider = new DBConnectionProvider();
