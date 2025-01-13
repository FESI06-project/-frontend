import { TabItem } from '@/types';

export type MainType = '전체' | '유산소형' | '무산소형' | '경기형';

export const LISTPAGE_MAINTYPE: { id: MainType; label: string }[] = [
  { id: '전체', label: '전체' },
  { id: '유산소형', label: '유산소형' },
  { id: '무산소형', label: '무산소형' },
  { id: '경기형', label: '경기형' },
];

export const LISTPAGE_SUBTYPE: { [key in MainType]: TabItem[] } = {
  전체: [{ id: '전체', label: '전체' }],
  유산소형: [
    { id: '전체', label: '전체' },
    { id: '런닝', label: '런닝' },
    { id: '자전거', label: '자전거' },
    { id: '기타', label: '기타' },
  ],
  무산소형: [
    { id: '전체', label: '전체' },
    { id: '헬스', label: '헬스' },
    { id: '기타', label: '기타' },
  ],
  경기형: [
    { id: '전체', label: '전체' },
    { id: '배드민턴', label: '배드민턴' },
    { id: '풋살', label: '풋살' },
    { id: '기타', label: '기타' },
  ],
};
