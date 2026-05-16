export async function POST(request) {
  try {
    const { question } = await request.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `You are a professional beauty advisor. Give practical, helpful beauty tips for women. Keep answers friendly and easy to understand.\n\nQuestion: ${question}`
          }
        ]
      })
    });

    const data = await response.json();
    const answer = data.content ? data.content[0].text : JSON.stringify(data);
    return Response.json({ answer });

  } catch (error) {
    return Response.json({ answer: "Error: " + error.message });
  }
}
