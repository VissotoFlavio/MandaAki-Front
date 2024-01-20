export const CpfMask = (value: string): string => {
  const cpfRegex = /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/;
  const match = value.match(cpfRegex);

  if (match) {
    const maskedValue = match.slice(1).filter(Boolean).join('.');
    return maskedValue;
  }

  return value;
};
