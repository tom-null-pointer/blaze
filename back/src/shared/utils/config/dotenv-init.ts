import path from "path";
import dotenv from 'dotenv';

const envPath = path.join(process.cwd(), `.env${(process.env.NODE_ENV) ? `.${process.env.NODE_ENV}` : ''}`);
dotenv.config({path: envPath})