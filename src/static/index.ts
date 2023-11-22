export const gridColumnType: { readonly [key: string]: string } = {
  number: 'id',
  createdAt: 'created_at',
  status: 'status',
  applicantAddress: 'applicant.address',
  applicantName: 'applicant.name',
  applicantPhone: 'applicant.phone',
  destAddress: 'dest.address',
  destName: 'dest.name',
  destPhone: 'dest.phone',
} as const;
export type gridColumnType =
  (typeof gridColumnType)[keyof typeof gridColumnType];

export const gridColumnTypeToLabel = {
  [gridColumnType.number]: '번호',
  [gridColumnType.createdAt]: '생성일시',
  [gridColumnType.status]: '상태',
  [gridColumnType.applicantAddress]: '신청지',
  [gridColumnType.applicantName]: '신청인',
  [gridColumnType.applicantPhone]: '신청인 연락처',
  [gridColumnType.destAddress]: '수령지',
  [gridColumnType.destName]: '수령인',
  [gridColumnType.destPhone]: '수령인 연락처',
} as const;
