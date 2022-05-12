import  express , { Application } from "express";
import {createServer ,  Server as HttpServer} from "http";
import cors from "cors";
import { Server  as SocketSever} from "socket.io";
import {config} from "dotenv";

import configs from  "../configs/index";
import Client from "./socket";
const {crossOrigin} =  configs;

config();


class Server {
	private readonly app:Application;
	private port:string;
	private server:HttpServer;
	private io:SocketSever;

	constructor(){
		this.app = express();
		this.port = process.env.PORT || "5000";
		this.middlewares(); 
		this.server = createServer(this.app) ;
		this.io =  new SocketSever(this.server,{
			cors:{
				origin:crossOrigin,
				credentials:true,
			}
		});
		this.socketClient();
	}

	private middlewares(){
		this.app.use(express.json());
		this.app.use(cors());
		this.app.use(express.static("public"));
	}
   
	private socketClient(){
		new Client(this.io);
	}


	public listen () {
		this.server.listen(this.port, () => {
			console.log("Server running in http://localhost" + this.port);
		});
	}
}

export default Server;