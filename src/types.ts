export type RoomObject = {
  objectId: string;
  content?: {
    fields: {
      stake: number;
      host: string;
      player: string;
      host_symbol: 1 | 2;
      status: 0 | 1;
    };
  };
};
