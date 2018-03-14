'use strict';

async function gracefulShutdown(server) {
    try {
        await server.close();
    } catch (err) {
        console.error(`Не удалось корректно завершить работу сервера. Ошибка: ${err.message}`);
    }
}

module.exports = { gracefulShutdown };
