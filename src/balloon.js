//Constants for balloon and MOAB size
const BALLOON_SIZE_X = 49;
const BALLOON_SIZE_Y = 63;
const MOAB_SIZE_X = 170;
const MOAB_SIZE_Y = 110;

//POP_SIZE is the size factor of the popped balloons
const POP_SIZE = 2.3;
const LARGE_POP_SIZE = 5;
var balloonIDcount = 1

//BALLOONS_INFO contains information about balloons by level
const BALLOONS_INFO = [ // money is the money the player gets every time the balloon is popped or becomes a different balloon
  { speed: 1, health: 1, money: 1, children: [] }, // red balloon
  { speed: 1.4, health: 1, money: 1, children: [{ type: 1, count: 1 }] }, // blue balloon
  { speed: 1.8, health: 1, money: 1, children: [{ type: 2, count: 1 }] }, // green balloon
  { speed: 3.2, health: 1, money: 1, children: [{ type: 3, count: 1 }] }, // yellow balloon
  { speed: 3.5, health: 1, money: 2, children: [{ type: 4, count: 1 }] }, // pink balloon
  { speed: 1.8, health: 1, money: 2, children: [{ type: 5, count: 2 }] }, // black balloon
  { speed: 2, health: 1, money: 2, children: [{ type: 5, count: 2 }] }, // white balloon
  { speed: 1, health: 1, money: 1, children: [{ type: 6, count: 2 }] }, // lead balloon
  { speed: 1.8, health: 1, money: 1, children: [{ type: 6, count: 1 }, { type: 7, count: 1 }] }, // zebra balloon
  { speed: 2.2, health: 1, money: 3, children: [{ type: 9, count: 2 }] }, // rainbow balloon
  { speed: 2.5, health: 10, money: 5, children: [{ type: 10, count: 2 }] }, // ceramic balloon
  { speed: 1, health: 200, money: 10, children: [{ type: 11, count: 4 }] }, // blue MOAB
];

class Balloon {
	constructor({ x, y, type, next = 0 }) {
		// x, y and next are the coordinates of the balloon on the screen
		this.x = x;
		this.y = y;
		this.id = balloonIDcount
		balloonIDcount++
		// next is the index of the waypoint the balloon is moving towards
		this.next = next;
		this.type = type;
		this.health = BALLOONS_INFO[type - 1].health;
		this.hidden = false
		this.pop = false
		this.freeze = {speedEffect: 1, cooldown: 100, lastFrozen: 0}
	}

	// hit function to handle when balloon takes damage
	hit(arrow) {
		// Handle when balloon takes damage
		let damage = arrow.strength
		if (this.type == 8 & !arrow.armoredBalloons) {
			damage = 0
		}
		let health = this.health - damage
		if (arrow.freeze) {
			this.freeze.speedEffect = arrow.freeze.speedEffect
			this.freeze.cooldown = arrow.freeze.cooldown
			this.freeze.lastFrozen = time
			return
		}

		// Keep decrementing health until it becomes non-positive
		while (health <= 0) {
			// Get children for this balloon type
			let children = BALLOONS_INFO[this.type - 1].children;
			arrow.monkeyParent.updateBalloonsPopped()

			money += arrow.moneyMultiplier * BALLOONS_INFO[this.type - 1].money

			if (children.length == 0 | this.isMOAB()) {
				this.createBalloonChildren()
				this.pop = true
				return
			}
			
			if ((children.length == 1) & (children[0].count == 1)) {
				let child_health = BALLOONS_INFO[children[0].type - 1].health;
				health += child_health;
				this.type = children[0].type;
			} else {
				this.createBalloonChildren()
				this.deleteBalloon()
				return
			}
		}

		// Update balloon's health if it has not been removed
		this.health = health;
	}

	createBalloonChildren() {
		const balloonInfo = BALLOONS_INFO[this.type-1] // Get the balloon info object for the balloon type
		var children = balloonInfo.children // Get the children array from the balloon info object
		children.forEach(child => { // Loop through each child object in the children array
			for (let i = 0; i < child.count; i++) { // Loop through the number of children to create
				var b = new Balloon({
					x: this.x,
					y: this.y,
					type: child.type,
					next: this.next
				}) // Create a new balloon object with the child type, position, and next value of the parent balloon
				balloons.push(b) // Add the new balloon object to the balloons array
				for (let m = 0; m < i; m++) { // Move the balloon multiple times based on the current index to avoid overlapping balloons
					b.moveBalloon()
				}
			}
		})
	}

	distanceFromWayPoint(waypoint) {
		let diffX = WAYPOINTS[waypoint].x - this.x; // Calculate difference in x coordinates
		let diffY = WAYPOINTS[waypoint].y - this.y; // Calculate difference in y coordinates
		let pMagnitute = calcMag(diffX, diffY, 0, 0); // Calculate the magnitude of the difference using the calcMag() function
		return pMagnitute
	}

	// Calculates the percentage of completion for the current waypoint
	calculatePercentDoneOfWayPoint() {
		// Calculate distance from target waypoint using the distanceFromWayPoint method
		// The next waypoint is used as the target
		return this.distanceFromWayPoint(this.next)
	}

	updatePosition(xPos, yPos) {
		this.x += xPos;
		this.y += yPos;
	}

	isMOAB() {
		return this.type >= 12;
	}

	turningFunc(x) {
		// x between 0 and 1, and so as the output
		return Math.pow(x, 3.8);
	}

	moveBalloon() {
		// get balloon info
		if ((time-this.freeze.lastFrozen) % Math.round(this.freeze.cooldown/speedFactor) == 0) {
			this.freeze.speedEffect = 1
			this.freeze.cooldown = 10000
		}
		// get the balloon object from the 'balloons' array using the provided 'index'
		const balloonInfo = BALLOONS_INFO[this.type-1] // get the balloon information from 'BALLOONS_INFO' using the balloon type
		var speed = this.freeze.speedEffect * balloonInfo.speed * (speedFactor)/GAME_SPEEDS[0] // calculate the balloon speed by multiplying the balloon information speed with the constant 'SPEED_FACTOR'
		var next = WAYPOINTS[this.next] // get the next waypoint from the 'WAYPOINTS' array using the 'next' property of the balloon object

		// calculate balloon movement
		var angle = Math.atan2(next.y - this.y, next.x - this.x) // calculate the angle between the balloon and the next waypoint using 'Math.atan2'
		var sx = speed * Math.cos(angle) // calculate the horizontal component of the speed using 'Math.cos'
		var sy = speed * Math.sin(angle) // calculate the vertical component of the speed using 'Math.sin'
		var dis = calcMag(next.x, next.y, this.x, this.y) // calculate the distance between the balloon and the next waypoint using the 'calcMag' function

		// if balloon reached waypoint
		if (dis < speed) { // if the balloon has reached the next waypoint
			this.next++ // move the 'next' property of the balloon object to the next waypoint
			if (this.next == WAYPOINTS.length) { // if the balloon has reached the last waypoint
				this.deleteBalloon()
				lives -= balloonInfo.health
			}
		}
		this.updatePosition(sx, sy) // update by speed in x axis and y axis
		this.hidden = this.isUnderTunnel()
	}

	isUnderTunnel() {
		for (let i = 0; i < TUNNELS.length; i++) {
			let t = TUNNELS[i]
			if (t.under.includes(this.next) & insideTunnel(this, i)) {
				return true
			}
		}
		return false
	}

	printExplosion() {
		let width = BALLOON_SIZE_X
		let height = BALLOON_SIZE_Y
		var size = this.isMOAB() ? LARGE_POP_SIZE : POP_SIZE
		c.img(
			this.x,
			this.y,
			width * size,
			height * size,
			generalImages['pop'],
		)
	}

	// This function is intended to print a balloon on a canvas.
	print() {
		if (this.hidden) {
			return
		}
		
		// if popped, print explosion only and self terminate
		if (this.pop) {
			this.printExplosion()
			this.deleteBalloon()
			return
		}

		let width = BALLOON_SIZE_X;
		let height = BALLOON_SIZE_Y;
		let deg = 0;
		// Check if the balloon is a MOAB and its next waypoint exists.
		if (this.isMOAB() & (this.next >= 1)) {
			// If it is a MOAB, update its width and height with predefined constants for MOAB.
			width = MOAB_SIZE_X;
			height = MOAB_SIZE_Y;

			// Calculate differences in x and y coordinates between the next and previous waypoints.
			let diffX = WAYPOINTS[this.next].x - WAYPOINTS[this.next - 1].x;
			let diffY = WAYPOINTS[this.next].y - WAYPOINTS[this.next - 1].y;
			let diffX2 = diffX, diffY2 = diffY
			if (this.next + 1 != WAYPOINTS.length) { // if the balloon is on the last waypoint then not rotate
				diffX2 = WAYPOINTS[this.next + 1].x - WAYPOINTS[this.next].x;
				diffY2 = WAYPOINTS[this.next + 1].y - WAYPOINTS[this.next].y;
			}


			// Calculate the current and next degree values for the MOAB.
			let current_deg = -Math.atan2(diffY, diffX) / RADIAN;
			let next_deg = -Math.atan2(diffY2, diffX2) / RADIAN;
			let pre_deg = 0;

			// Calculate the previous degree value for the MOAB if the balloon has passed more than two waypoints.
			if (this.next >= 2) {
				let diffX3 = WAYPOINTS[this.next - 1].x - WAYPOINTS[this.next - 2].x;
				let diffY3 = WAYPOINTS[this.next - 1].y - WAYPOINTS[this.next - 2].y;
				pre_deg = -Math.atan2(diffY3, diffX3) / RADIAN;
			}

			// Set the degree value of the MOAB to the current degree value.
			deg = current_deg;

			// Calculate the distance of the balloon from the next and previous waypoints.
			let d_next = this.distanceFromWayPoint(this.next);
			let d_pre = this.distanceFromWayPoint(Math.abs(this.next - 1));

			// Set a margin value.
			const margin = 20;

			// If the balloon is within the margin distance of the next waypoint, calculate its degree value based on the turning function.
			if (d_next < margin) {
				let per = 1 - d_next / margin;
				let origin_deg = current_deg;
				let target_deg = (current_deg + next_deg) / 2;
				deg = origin_deg + (target_deg - origin_deg) * this.turningFunc(per);
			}

			// If the balloon is within the margin distance of the previous waypoint, calculate its degree value based on the turning function.
			if (d_pre < margin) {
				let per = 1 - d_pre / margin;
				let origin_deg = (current_deg + pre_deg) / 2;
				let target_deg = current_deg;
				deg = target_deg + (origin_deg - target_deg) * this.turningFunc(per);
			}
		}
		let imageBalloon = balloonImages[this.type - 1]
		if (this.freeze.speedEffect<1) {
			imageBalloon = frozenBalloonImages[this.type - 1]
		}
		c.img(this.x, this.y, width, height, imageBalloon, deg);

	}

	deleteBalloon() {
		var index = balloons.indexOf(this)
		if (index != -1) {
			balloons.splice(index, 1)
		}
	}
}
