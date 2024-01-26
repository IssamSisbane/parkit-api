export type TDataStoredInToken = {
    _id: string;
    username: string;
}

export interface TDataToken {
    accessToken: string;
    refreshToken: string;
}