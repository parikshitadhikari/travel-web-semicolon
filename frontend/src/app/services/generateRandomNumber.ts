export const generateRandomNumber = (max = 10) => {
  let rand = Math.random() * max;
  rand = Math.floor(rand); // 99
  return rand;
};
