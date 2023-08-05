export const handleDate = (timeStamp: string) => {
  const c = timeStamp.length === 10 ? 1000 : 1;
  return new Date(+timeStamp * c).toDateString();
};
