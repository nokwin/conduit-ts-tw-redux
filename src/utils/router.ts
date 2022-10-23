export const serializeSearchParams = (params: Record<string, string>) => {
  const strParams = new URLSearchParams(params);

  return strParams.toString();
};
