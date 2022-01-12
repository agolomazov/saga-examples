export const createEventProvider = () => {
  let value = 0;

  const subscribers = {};

  const triggerEvents = (event, payload) => {
    return (subscribers[event] || []).map(cb => cb(payload));
  }

  setInterval(() => {
    value += 1;
    triggerEvents('value', { payload: value })
  }, 1000);

  return {
    subscribe: (event, handler) => {
      if (!subscribers[event]) {
        subscribers[event] = [];
      }

      subscribers[event].push(handler);
    },
    unsubscribe: (event, handler) => {
      subscribers[event] = subscribers[event].filter((sub) => sub.handler !== handler);
    }
  }
}