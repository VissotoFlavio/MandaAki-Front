export const CookieManager = () => ({
  // Função para obter um cookie pelo nome
  getCookie: (name: string): string | null => {
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookies.split('; ');

    for (const cookie of cookiesArray) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }

    return null;
  },

  // Função para definir um cookie
  setCookie: (name: string, value: string, expiratioMinutes: number): void => {
    const date = new Date();
    date.setTime(date.getTime() + expiratioMinutes * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  },

  // Função para excluir um cookie pelo nome
  deleteCookie: (name: string): void => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
});

/**
// Exemplo de uso:
CookieManager.setCookie('usuario', 'joao', 7); // Define um cookie chamado 'usuario' com valor 'joao' que expira em 7 dias
const usuarioCookie = CookieManager.getCookie('usuario'); // Obtém o valor do cookie 'usuario'
console.log(usuarioCookie); // Exibe o valor do cookie 'usuario' no console
CookieManager.deleteCookie('usuario'); // Exclui o cookie 'usuario'
 */
