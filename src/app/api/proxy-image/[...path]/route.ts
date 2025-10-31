import { NextResponse, type NextRequest } from 'next/server';

// Función GET para manejar las solicitudes del proxy de imagen
export async function GET(
    request: NextRequest, 
    { params }: { params: { path: string[] } }
) {
    // Reconstruye la URL original de Amazon
    // Ejemplo: http://images.amazon.com/images/P/0440234743.01.LZZZZZZZ.jpg
    const imageUrl = `http://images.amazon.com/${params.path.join('/')}`;

    try {
        console.log(`[PROXY] Intentando obtener: ${imageUrl}`);
        
        // Realiza la solicitud a Amazon con encabezados de navegador
        const response = await fetch(imageUrl, {
            headers: {
                // Simula un navegador Chrome estándar para evadir bloqueos de User-Agent
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                // Simula que la solicitud proviene de la página de Amazon (CLAVE para el bloqueo 403)
                'Referer': 'https://www.amazon.com/',
            },
            // Asegura que siempre se obtenga la versión más reciente, no una cacheada
            cache: 'no-store', 
        });

        // 1. Manejo de códigos de estado no OK (ej. 404, 403, 500)
        if (!response.ok) {
            // Intenta leer el cuerpo de la respuesta de error para diagnóstico
            try {
                const errorText = await response.text(); 
                console.error(`[ERROR AMAZON] Código: ${response.status}. URL: ${imageUrl}. Respuesta: ${errorText.substring(0, 200)}...`);
            } catch (readError) {
                console.error(`[ERROR AMAZON] Código: ${response.status}. URL: ${imageUrl}. No se pudo leer el cuerpo de error.`, readError);
            }
            return new NextResponse(`Error al cargar la imagen desde el origen (${response.status})`, { status: response.status });
        }

        // 2. Obtener el Content-Type
        const contentType = response.headers.get('Content-Type');

        // 3. Revisar si la respuesta es realmente una imagen
        if (!contentType || !contentType.startsWith('image/')) {
            // Si no es un tipo de imagen, Amazon está enviando otra cosa (probablemente HTML)
            const textContent = await response.text();
            console.error(`[ERROR CONTENIDO] URL: ${imageUrl}. Tipo recibido: ${contentType}. Contenido (primeros 200 chars): ${textContent.substring(0, 200)}...`);
            // Devolvemos un 400 Bad Request, ya que el recurso no es lo esperado
            return new NextResponse("El recurso de Amazon no devolvió un Content-Type de imagen.", { status: 400 });
        }
        
        // 4. Obtener el ArrayBuffer (datos binarios) para servir la imagen
        const arrayBuffer = await response.arrayBuffer();
        
        // 5. Servir la imagen al optimizador de Next.js
        return new NextResponse(arrayBuffer, {
            status: 200,
            headers: {
                // Solución al error de TypeScript: contentType no puede ser null aquí
                'Content-Type': contentType, 
                // Headers de cache para un buen rendimiento
                'Cache-Control': 'public, max-age=31536000, immutable', 
            },
        });

    } catch (error) {
        // Manejo de errores de red o DNS (fallos de conexión)
        console.error(`[ERROR RED] Fallo de conexión en el proxy para ${imageUrl}:`, error);
        return new NextResponse('Error de red en el servidor proxy.', { status: 500 });
    }
}
