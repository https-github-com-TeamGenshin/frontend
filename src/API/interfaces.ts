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
