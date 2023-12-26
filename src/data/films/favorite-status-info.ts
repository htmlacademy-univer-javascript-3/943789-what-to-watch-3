export enum FavoriteStatus {
  DoNothing=0,
  ToWatch=1
}

export type FavoriteStatusInfo = {
  status: FavoriteStatus;
  filmId: string;
}
