export const askGrowAI = async (userMessage: string) => {
  const response = await fetch("http://127.0.0.1:8000/auth/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: userMessage }),
  });
  console.log(userMessage);

  if (!response.ok) {
    throw new Error("Failed to communicate with TravelAI");
  }
 
  const data = await response.json();

  return data;
};
