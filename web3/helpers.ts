export const formatAddress = (
  address: string | null | undefined,
  ensName?: string | null,
  chars = 5,
): string => {
  if (ensName) return ensName;
  else if (address)
    return `${address.substring(0, chars)}...${address.substring(
      address.length - chars,
    )}`;
  else return '';
};
