export interface ResponseForFiltered {
  Req: {
    status: number;
    totalChunks: number | undefined;
    data: Object[] | undefined;
  };
}

export interface ResponseForSearched {
  Req: {
    status: number;
    previouslyAccepted: Object[] | undefined;
    data: Object[] | undefined;
  };
}

export interface Response {
  Req: { status: number; data: Object[] | undefined };
}

export interface Cab {
  registration_number: string[];
  model_name: string;
  model_no: string;
  imageurl: string;
  colour: string;
  location: string;
  no_of_seats: number;
  hrs_rate: number;
  kms_rate: number;
  fuel_type: string;
  no_of_available: number;
  type: string;
}
