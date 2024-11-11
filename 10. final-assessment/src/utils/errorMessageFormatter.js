export const errorMessageFormatter = (message) => {
  return message.split('\n').at(-1);
}