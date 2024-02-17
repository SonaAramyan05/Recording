class DbConection {
    openDB () {
        const request = window.indexedDB.open("MyTestDatabase", 3);
    }
    
}