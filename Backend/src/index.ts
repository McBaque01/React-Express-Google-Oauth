import express, { Response, Request, NextFunction} from "express";
import cors from "cors";
import helmet from 'helmet'
import { OAuth2Client , TokenPayload } from 'google-auth-library';

import dotenv from 'dotenv';
const app = express();
const port: number = 8080;

app.use(express.json());
app.use(helmet());

dotenv.config();

interface corsvalues {
    origin: string[],
    methods:string[],
    credentials: boolean,
    allowedHeaders: string[],
    optionsSuccessStatus: number,
}
const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["POST", "GET"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions))


app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})

// Error handling for server setup
app.on('error', (err) => {
    console.error('Server error:', err);
});

const client = new OAuth2Client();

app.post('/verify', async (req: Request, res: Response) => {
  const token = req.body.credential;
  const CLIENT_ID = req.body.clientId;

  let ticket: any;
 
  try {
      console.log(token);
      console.log(CLIENT_ID);
      ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
      
        const payload: TokenPayload | undefined = await ticket.getPayload();
          
        if (payload) {
          const data = {
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
          }
          console.log(payload)
          const userid = payload.sub;
          console.log(userid);
          res.status(200).json({ message: 'Success', data});
        } else {
          // Handle the case where payload is undefined
          console.error('Payload is undefined');
          res.status(400).json({ message: 'Payload is undefined' });
        }
  }
  catch (error) {
      console.log(ticket)
      console.error("Error verifying ID token:", error);
  }

});
