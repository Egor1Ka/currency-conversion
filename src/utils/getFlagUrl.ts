const getFlagUrl = (currencyCode: string) => {
  const countryCode = currencyCode.slice(0, 2).toLowerCase();
  return `https://flagcdn.com/16x12/${countryCode}.png`;
};

export default getFlagUrl;
