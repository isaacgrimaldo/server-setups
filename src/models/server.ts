import  express , { Application } from "express";
import cors from "cors";

import {config} from "dotenv";
config();


class Server {
	private readonly app:Application;
	private port:string;

	constructor(){
		this.app = express();
		this.port = process.env.PORT || "5000";
		this.middlewares(); 
	}

	private middlewares(){
		this.app.use(express.json());
		this.app.use(cors());
		this.app.use(express.static("public"));
	}


	public listen () {
		this.app.listen(this.port, () => {
			console.log("Server running in http://localhost" + this.port);
		});
	}
}

export default Server;