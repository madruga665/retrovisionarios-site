export type Event = {
  id: number;
  date: Date;
  name: string;
  flyer: string | null;
};

export type EventResponse = {
  result: Event[];
};
