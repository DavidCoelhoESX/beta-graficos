export const getMonthFirstLetter = (): string[] => {
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(0, i); // Cria uma data com o mês específico
    return new Intl.DateTimeFormat("pt-BR", { month: "short" })
      .format(date)
      .charAt(0)
      .toUpperCase();
  });
};

export const getMonthAbbreviations = (): string[] => {
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(0, i); // Cria uma data com o mês específico
    return new Intl.DateTimeFormat("pt-BR", { month: "short" })
      .format(date)
      .replace(".", "")
      .toUpperCase();
  });
};
