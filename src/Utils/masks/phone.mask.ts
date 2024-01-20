export type PhoneLangType = 'Br' | 'US';

export const PhoneMask = (value: string, lang: PhoneLangType = 'Br'): string => {
  // Remove caracteres não numéricos da string do número de telefone
  const cleaned = value.replace(/\D/g, '');
  switch (lang) {
    case 'Br': {
      console.log(cleaned);
      const match = cleaned.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/);

      if (match) {
        return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9, 13)}`;
      }
      const match2 = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
      if (match2 && cleaned.substring(0, 2) !== '55') {
        return `+55 (${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
      }
      return value;
    }
    case 'US':
      // Aplica a máscara de telefone (assumindo o formato padrão de 10 dígitos)
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    default:
      return value;
  }
};
