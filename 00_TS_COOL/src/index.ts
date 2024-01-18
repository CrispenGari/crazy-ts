export const groupBy = <
  TObj extends Record<string, unknown>,
  TKey extends keyof TObj
>(
  arr: TObj[],
  key: TKey
) => {
  const result = {} as Record<TObj[TKey] & PropertyKey, TObj[]>;
  arr.forEach((ele) => {
    const resolvedKey = ele[key] as TObj[TKey] & PropertyKey;
    if (result[resolvedKey]) {
      result[resolvedKey].push(ele);
    } else {
      result[resolvedKey] = [ele];
    }
  });
  return result;
};
