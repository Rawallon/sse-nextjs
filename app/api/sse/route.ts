export async function GET(request: Request) {
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      start(controller) {
        // Função para enviar mensagens periodicamente
        const send = (msg: string) => {
          const data = `data: ${msg}\n\n`;
          controller.enqueue(encoder.encode(data));
        };
  
        // Envia uma mensagem a cada segundo
        const intervalId = setInterval(() => {
          send(JSON.stringify({ message: 'Oi =) - Numero da sorte: '+(Math.random()*1000).toFixed(0), timestamp: new Date() }));
        }, 2000);
  
        // Fecha a conexão quando o cliente desconecta
        request.signal.addEventListener('abort', () => {
          clearInterval(intervalId);
          controller.close();
        });
      }
    });
  
    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  export async function POST(request: Request) {
    const body = await request.json();
    const { userId } = body;
  
    // Simula um processamento e cria a resposta com base no ID
    const responseData = {
      was_successful: false,
      user_id: userId,
      request_id: userId,
      remarks: ["primeiro erro", "segundo erro"]
    };
  
    return new Response(JSON.stringify(responseData), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
  