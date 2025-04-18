interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const sendMessage = async (message: string): Promise<ChatMessage> => {
  try {
    console.log('Enviando mensaje:', message);
    
    const response = await fetch('https://bcandia.app.n8n.cloud/webhook-test/54ac135c-3c8c-48b8-be15-be555db8cb51', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        timestamp: new Date().toISOString(),
        userId: 'anonymous'
      })
    });

    console.log('Estado de la respuesta:', response.status);
    const data = await response.json();
    console.log('Datos recibidos (raw):', JSON.stringify(data, null, 2));

    // Si la respuesta no es exitosa, lanzamos un error con el mensaje del servidor
    if (!response.ok) {
      throw new Error(data.message || `Error del servidor: ${response.status}`);
    }

    // Intentamos obtener el contenido de la respuesta de diferentes propiedades posibles
    let responseContent = '';
    console.log('Tipo de data:', typeof data);
    console.log('Propiedades disponibles:', Object.keys(data));

    if (typeof data === 'string') {
      responseContent = data;
      console.log('Usando data como string');
    } else if (data.message) {
      responseContent = data.message;
      console.log('Usando data.message');
    } else if (data.response) {
      responseContent = data.response;
      console.log('Usando data.response');
    } else if (data.content) {
      responseContent = data.content;
      console.log('Usando data.content');
    } else if (data.output) {  // Agregamos una propiedad más común en n8n
      responseContent = data.output;
      console.log('Usando data.output');
    } else {
      console.warn('Estructura de respuesta inesperada. Data completa:', data);
      responseContent = 'Recibí tu mensaje, pero no puedo procesar la respuesta correctamente.';
    }

    return {
      role: 'assistant',
      content: responseContent,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error completo en sendMessage:', error);
    console.error('Stack trace:', error.stack);
    
    return {
      role: 'assistant',
      content: `Lo siento, ocurrió un error: ${error.message}`,
      timestamp: new Date().toISOString()
    };
  }
}; 