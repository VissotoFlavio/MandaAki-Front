// Função para calcular a diferença em milissegundos entre duas datas
export const diffEmMilissegundos = (data1: Date, data2: Date): number => {
  // Obtém a diferença em milissegundos entre as duas datas
  const diffEmMilissegundos = Math.abs(new Date(data2).getTime() - new Date(data1).getTime());

  return diffEmMilissegundos;
};

// Função para calcular a diferença em segundos entre duas datas
export const diffEmSegundos = (data1: Date, data2: Date): number => {
  // Obtém a diferença em milissegundos entre as duas datas
  const diffEmMilissegundos = Math.abs(data2.getTime() - data1.getTime());

  // Converte a diferença em milissegundos para segundos
  const diffEmSegundos = diffEmMilissegundos / 1000;

  return diffEmSegundos;
};
