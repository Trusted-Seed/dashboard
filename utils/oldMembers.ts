export type OldMember = {
  address: string;
  duesPaid: number;
  paymentDate: string;
  expireDate: string;
};

export const oldMembers: OldMember[] = [
  {
    address: '0xa32aECda752cF4EF89956e83d60C04835d4FA867', // kristofer
    duesPaid: 450,
    paymentDate: '2022-04-19T00:00:00.000Z',
    expireDate: '2023-04-19T00:00:00.000Z',
  },
];
