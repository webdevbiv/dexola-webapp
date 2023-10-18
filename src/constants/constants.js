import dataContract from "../data/contractABI.json";
import dataToken from "../data/tokenABI.json";

export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const API_KEY = import.meta.env.VITE_ALCHEMY_KEY;
export const TOKEN = import.meta.env.VITE_TOKEN;
export const CONTRACT = import.meta.env.VITE_CONTRACT;
export const TOKEN_ABI = dataToken;
export const CONTRACT_ABI = dataContract;
export const MEDIUM_WIDTH = 744;
export const LARGE_WIDTH = 1440;
