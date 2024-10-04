import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv'
import conectDB from "./db/index.js";

dotenv.config({
    path:'./.env'
})

conectDB();