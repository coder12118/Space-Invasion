class Slingshot{
    constructor(body1, point2){
        var options = {
            bodyA: body1,
            pointB: point2,
            stiffness: 0.04,
            length: 5
        }
        this.pointB = point2;
        this.sling = Constraint.create(options);
        World.add(world, this.sling)
    }

    attach(plane1){
        this.sling.bodyA = plane1;
    }

    fly(){
        this.sling.bodyA = null;
    }

    display(){
        if(this.sling.bodyA!==null){
            var pointA = this.sling.bodyA.position;
            var pointB = this.pointB;
            strokeWeight(2);
            stroke("black")
            line(pointA.x, pointA.y, pointB.x, pointB.y);
        }
    }
}