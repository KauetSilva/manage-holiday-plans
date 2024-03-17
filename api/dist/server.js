"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(index_1.default);
app.listen(PORT, async () => {
    try {
        await prisma.$connect();
        console.log('Database connection established successfully! ✅');
    }
    catch (error) {
        console.error('Error during Database connection: ❌ ', error);
        if ((error === null || error === void 0 ? void 0 : error.code) === '28P01') {
            console.error('Authentication failed. Please check your database credentials.');
        }
        else {
            console.error('Unexpected error occurred. Details:', error.message || error);
        }
        if (error.code === 'ECONNREFUSED') {
            console.error('Unable to connect to the database. Ensure that the database server is running.');
        }
        process.exit(1);
    }
    console.log(`Server is running on port ${PORT}`);
});
// Adicione este trecho para fechar a conexão com o Prisma quando a aplicação é encerrada.
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
