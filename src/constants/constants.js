import dataContract from "../data/contractABI.json";
import dataToken from "../data/tokenABI.json";

export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const API_KEY = import.meta.env.VITE_ALCHEMY_KEY;
export const TOKEN = "0x59Ec26901B19fDE7a96f6f7f328f12d8f682CB83";
export const TOKEN_ABI = dataToken;
export const CONTRACT = "0x2F112ED8A96327747565f4d4b4615be8fb89459d";
export const CONTRACT_ABI = dataContract;
export const MEDIUM_WIDTH = 744;
export const LARGE_WIDTH = 1440;
