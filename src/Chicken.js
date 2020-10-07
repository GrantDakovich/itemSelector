import React from 'react';



export default function Chicken(props) {


	var chickenImgs = [
		{
			left: process.env.PUBLIC_URL + "leftchicken.png",
			right: process.env.PUBLIC_URL + "rightchicken.png"
		},
		{
			left: process.env.PUBLIC_URL + "leftchicken_rotate2.png", 
			right: process.env.PUBLIC_URL + "rightchicken_rotate2.png"
		},
		{
			left: process.env.PUBLIC_URL + "leftchicken_rotate3.png", 
			right: process.env.PUBLIC_URL + "rightchicken_rotate3.png"
		},
		{
			left: process.env.PUBLIC_URL + "leftchicken_rotate4.png",
			right: process.env.PUBLIC_URL + "rightchicken_rotate4.png"
		}
	]

	var walkingImgs = {
		left: [process.env.PUBLIC_URL + "leftchicken_walkingout.png", process.env.PUBLIC_URL + "leftchicken.png", process.env.PUBLIC_URL + "leftchicken_walkingin.png"],
		right: [process.env.PUBLIC_URL + "rightchicken_walkingout.png", process.env.PUBLIC_URL + "rightchicken.png", process.env.PUBLIC_URL + "rightchicken_walkingin.png"]
	}


	const [imgId, setImgId] = React.useState(0); // index of the chicken image 
	const [direction, setDirection] = React.useState("down"); // direction chicken is moving
	const [facing, setFacing] = React.useState(true) // true if facing left left
	const [walkingInd, setWalkingInd] = React.useState(null); // chicken walking image


	// Determines next walking action of the chicken if the chicken is walking
	React.useEffect(() => { // Walking
		const interval = setInterval(() => {
			if (walkingInd != null) {
				if (walkingInd === 1) {
					var randStop = Math.floor(Math.random() * Math.floor(2));
					if (randStop === 0) { // Stop walking
						setWalkingInd(null)
						setImgId(1)
					}
					else { // Start walking
						setWalkingInd(0);
					}
				}
				else if (walkingInd === 0) {
					setWalkingInd(2);
				}
				else if (walkingInd === 2) {
					setWalkingInd(1);
				}
			}
		}, 200);
	  	return () => clearInterval(interval);
		
	}, [walkingInd])


	// Determines next move the chicken will make

	React.useEffect(() => {
		var time = 500
		if ((direction === "down" && imgId === chickenImgs.length - 2) || (direction === "up" && imgId === chickenImgs.length - 1)) {
			time = 200
		}


		const interval = setInterval(() => {

			if (chickenImgs.length != 1) {
				if (direction === "up" && imgId === 0) { // if we are all of the way up
					var randFace = Math.floor(Math.random() * Math.floor(3));
					if (randFace === 0) { // Flip face
						setFacing(!facing);
					}
					else if (randFace === 1) { // Go back down
						setDirection("down");
						setImgId(imgId + 1);
					}
					else { // Start walking
						setWalkingInd(0);
					}
					
				}
				else if (direction === "down" && imgId === chickenImgs.length - 1) { // if we are all of the way down
					setDirection("up");
					setImgId(imgId - 1);
				}
				else if (direction === "down") {
					setDirection("down");
					setImgId(imgId + 1);
				}
				else if (direction === "up" && imgId === chickenImgs.length - 2) {
					var randDir = Math.floor(Math.random() * Math.floor(2))
					if (randDir === 0) {
						setDirection("down");
						setImgId(imgId + 1)
					}
					else {
						setDirection("up");
						setImgId(imgId - 1);
					}
				}
				else if (direction === "up") {
					setDirection("up");
					setImgId(imgId - 1);
				}
				else {
					console.log("error")
				}
		    }
	  	}, time);
	  	return () => clearInterval(interval);
	}, [imgId]);


	const getChickenImg = () => {


		var chickenImg = null;
		if (walkingInd) {
			if (facing) {
				chickenImg = (<img src={walkingImgs.left[walkingInd]} style={{ position: "absolute", top: props.top, left: props.left, width: "135px", display: "block"}} />);
			}
			else {
				chickenImg = (<img src={walkingImgs.right[walkingInd]} style={{ position: "absolute", top: props.top, left: props.left, width: "135px", display: "block"}} />);
			}
		}
		else {
			if (facing) {
				chickenImg = (<img src={chickenImgs[imgId].left} style={{ position: "absolute", top: props.top, left: props.left, width: "135px", display: "block"}} />);
			}
			else {
				chickenImg = (<img src={chickenImgs[imgId].right} style={{ position: "absolute", top: props.top, left: props.left, width: "135px", display: "block"}} />);
			}
	 	}
	 	return chickenImg;
	}

	

	return (
		<div>
			{getChickenImg()}
		</div>
	);
}