export type TDataStoredInToken = {
    _id: string;
}

export interface TDataToken {
    token: string;
    expiresIn: number;
}