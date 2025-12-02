import {verify} from "argon2";

import {getCredentials} from "@/data/dataManager";
import {UnauthorizedError} from "@/utils/errors";


export async function login(identifier: string, password: string){
    const credentials = getCredentials();

    if (credentials.identifier !== identifier.toLowerCase())
        throw new UnauthorizedError("Mauvais identifiants");

    const match = await verify(credentials.password, password);
    if (!match)
        throw new UnauthorizedError("Mauvais identifiants");
    else
        return true;
}

export async function checkPassword(password: string) {
    const credentials = getCredentials();
    const match = await verify(credentials.password, password);
    if (!match)
        throw new UnauthorizedError("Mauvais identifiants");
    else
        return true;
}