import {readFileSync} from "fs";
import {join} from "path";

interface Account {
    identifier: string,
    password: string;
}

export const getCredentials = (): Account => {
    return JSON.parse(readFileSync(join(process.cwd(), "/data/account.json")).toString());
}