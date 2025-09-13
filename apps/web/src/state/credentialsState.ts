
import { create } from "zustand";
import { CredentialResponseData } from "@/types/credentials";

interface CredentialsStore {
    credentials: CredentialResponseData[];
    setCredentials: (creds: CredentialResponseData[]) => void 
    addCredentials: (cred: CredentialResponseData) => void
    removeCredentials: (id: string) => void
}

export const useCredentialStore = create<CredentialsStore>((set) => ({
    credentials: [],

    setCredentials: (creds) => set({ credentials: creds }),

    addCredentials: (cred) => set((state) => ({
        credentials: [cred, ...state.credentials]
    })),

    removeCredentials: (id) => set((state) => ({
        credentials: state.credentials.filter((c) => c._id !== id)
    }))
}))