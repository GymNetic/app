/**
 * Utilitário para debounce de eventos do sistema
 * Evita que múltiplos eventos sejam processados em um curto intervalo de tempo
 */

const eventDebounceTimers = {};

/**
 * Aplica debounce a um evento, garantindo que o handler seja chamado no máximo
 * uma vez dentro do período de tempo especificado
 * 
 * @param {string} eventName - O nome do evento para aplicar debounce
 * @param {Function} handler - A função de callback para processar o evento
 * @param {number} delay - O tempo de espera em ms antes de processar outro evento
 * @returns {Function} - Um wrapper para o handler com debounce aplicado
 */
export const debounceEvent = (eventName, handler, delay = 300) => {
    return (event) => {
        if (eventDebounceTimers[eventName]) {
            clearTimeout(eventDebounceTimers[eventName]);
        }
        
        eventDebounceTimers[eventName] = setTimeout(() => {
            handler(event);
            eventDebounceTimers[eventName] = null;
        }, delay);
    };
};

/**
 * Adiciona um event listener com debounce
 * 
 * @param {Element|Window} element - O elemento para adicionar o listener
 * @param {string} eventName - O nome do evento
 * @param {Function} handler - O handler do evento
 * @param {number} delay - Tempo de debounce em ms
 * @returns {Function} - Uma função para remover o listener
 */
export const addDebouncedEventListener = (element, eventName, handler, delay = 300) => {
    const debouncedHandler = debounceEvent(eventName, handler, delay);
    element.addEventListener(eventName, debouncedHandler);
    
    return () => {
        element.removeEventListener(eventName, debouncedHandler);
    };
};
