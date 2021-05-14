class Plane{
	constructor(x,y,r)
	{
		var options={
			restitution :0,
            friction :1,
			//isStatic: true
			}
		this.x=x;
		this.y=y;
		this.r=r
		this.image=loadImage("Images/plane.png")
		this.body=Bodies.circle(this.x, this.y, this.r, options)
		World.add(world, this.body);
	}

	display()
	{
		var pos=this.body.position;	
		push()
		translate(pos.x, pos.y);
		rotate(this.body.angle)
		fill(255,0,255)
		imageMode(CENTER);
		image(this.image, 0,0,this.r*3, this.r*3)
		pop()
 }
}