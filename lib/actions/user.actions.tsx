'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/actions/Appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        
        // Use the existing email and password to create a session
        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return JSON.parse(JSON.stringify(session));
    } catch (error) {
        console.error('Error', error);
    }
}

export const signUp = async ({ email, password, firstName, lastName }: SignUpParams) => {
    try {
        const { account } = await createAdminClient();
        
        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );
        
        const session = await account.createEmailPasswordSession(email, password);
        
        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        
        return parseStringify(newUserAccount);
        return JSON.parse(JSON.stringify(newUserAccount));
    } catch (error) {
        console.error('Error', error);
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        return null;
    }
}
