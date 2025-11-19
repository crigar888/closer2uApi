import { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import CxRouteBuilderService from '../builder/CxRouteBuilderService';
import SheetService from '../sheets/SheetService';
import GeminiService from '../openai/OpenRouterService';
import CxIntentBuilderService from '../builder/CxIntentBuilderService';

dotenv.config();
const router = Router();

router.post("/products", async (req: Request, res: Response) => {
  try {
    console.log('incoming message:  sdf');

    const petProducts = [
    "Alimento seco para perros (sabor pollo)",
    "Juguete interactivo para gatos (ratón con catnip)",
    "Cama ortopédica para mascotas (talla M)",
    "Correa retráctil para perros (5 metros)",
    "Champú hipoalergénico para mascotas"
];

    const dialogflowResponse = {
        fulfillmentResponse: {
            messages: [
                {
                    text: {
                        text: [petProducts.join(", ")]
                    }
                }
            ]
        }
    };
    
    res.json(dialogflowResponse);     
  } catch (error) {
    console.error('[Error][incoming message]', error);
    res.status(500).json({ error: 'error processing message' });
  }
});

router.post("/stores", async (req: Request, res: Response) => {
  try {
    console.log('incoming message:  products');

    const mockStores = [
        "La Tienda de Juan",
        "Moda Express",
        "Electro Hogar",
        "Tecno Mundo",
        "Librería del Saber",
        "Deportes Extremos"
    ];

    const dialogflowResponse = {
        fulfillmentResponse: {
            messages: [
                {
                    text: {
                        text: [mockStores.join(", ")]
                    }
                }
            ]
        }
    };
    
    res.json(dialogflowResponse);     
  } catch (error) {
    console.error('[Error][incoming message]', error);
    res.status(500).json({ error: 'error processing message' });
  }
});

router.post("/product-info", async (req: Request, res: Response) => {
  try {
    
    const parameters = req.body.sessionInfo?.parameters;
    const productName = parameters?.product;
    const intentDisplayName = req.body.intentInfo?.displayName;
    console.log(req.body);
    
    let response = 'Ese te cuesta 50mil peso';
    if(intentDisplayName === 'product.feature.color') {
      response = 'tenemos en varios colores';
    }

    const dialogflowResponse = {
        fulfillmentResponse: {
            messages: [
                {
                    text: {
                        text: [response]
                    }
                }
            ]
        }
    };
    
    res.json(dialogflowResponse);  
  } catch (error) {
    console.error('[Error][incoming message]', error);
    res.status(500).json({ error: 'error processing message' });
  }
});

router.get("/test", async (req: Request, res: Response) => {
  try {
    console.log('incoming message:  hola');
    const response = await SheetService.readSheet();
    // await CxRouteBuilderService.createPage();

    res.json(response);
  } catch (error) {
    console.error('[Error][incoming message]', error);
    res.status(500).json({ error: 'error processing message' });
  }
});

router.get("/intent", async (req: Request, res: Response) => {
  try {
    console.log('incoming message:  hola');
    // const response = await SheetService.readSheet();
    // await CxIntentBuilderService.createIntent('test');
    // await CxRouteBuilderService.createPage();
    await 
    res.json(response);
  } catch (error) {
    console.error('[Error][incoming message]', error);
    res.status(500).json({ error: 'error processing message' });
  }
});

export default router;
