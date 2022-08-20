export const selections = [
  { value: 0, label: 'milk' },
  { value: 1, label: 'diaper' },
  { value: 2, label: 'toy' },
  { value: 3, label: 'clothes' },
  { value: 4, label: 'care' },
  { value: 5, label: 'furniture' },
  { value: 6, label: 'food' },
  { value: 7, label: 'others' }
]

export function getSelectionsChinese (index: number) {
  const obj: any = {
    0: '奶粉',
    1: '尿布',
    2: '玩具',
    3: '衣服',
    4: '保養',
    5: '家具',
    6: '食物',
    7: '其他'
  };
  return obj[index];
}