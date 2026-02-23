export type Event = {
  id: number;
  date: Date;
  name: string;
  flyer: string | null;
  location: string | null;
};

export type EventResponse = {
  result: Event[];
};
