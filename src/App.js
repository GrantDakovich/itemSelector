


import React from 'react';

import Chicken from "./Chicken.js";
import ItemViewer from "./ItemViewer/ItemViewer.js";


const bgImage = require("./farm_img.jpg")

function App() {
	
	return (
	    <div className="App" style={{ backgroundImage: `url(${require('./farm_img.jpg')})`, height: "864px", width: "100%", backgroundPosition: "center top", backgroundSize: "cover"}}>
	      	<ItemViewer />
	      	<Chicken top = "690px" left = "30%" />
	    </div>
	);
}

export default App;



































