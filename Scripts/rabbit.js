class Rabbit
{
    constructor(x, y, age)
    {
        this.x = x;
        this.y = y;
        this.position = createVector(x, y);
        this.age = age;
        this.alive = true;
        this.infected = false;
        this.canReproduce = false;
        //this.countDownTimer = die_after;
        this.start = 0;
        num_not_infected++;

        // for natural movement
        this.xoff = random(1000); // For perlin noise
        this.yoff = random(1000);
    }

    update()
    {

        let vx = map(noise(this.xoff), 0, 1, -rabbit_speed, rabbit_speed);
        let vy = map(noise(this.yoff), 0, 1, -rabbit_speed, rabbit_speed);
        let v = createVector(vx, vy);
        this.xoff += 0.01;
        this.yoff += 0.01;
        this.position.add(v);
        // if left side of screen
        if (this.position.x <= 0)
            this.position.x = w;
        // if right side of screen
        else if (this.position.x >= w)
            this.position.x = 0;

        // if top of the screen
        if (this.position.y <= 0)
            this.position.y = h;
        // if bottom of the screen
        else if (this.position.y >= h)
            this.position.y = 0;
    }

    show()
    {
        let rabbit_color = newborn_color;
        if (this.canReproduce && reproduction_on) rabbit_color = adult_color;
        if (this.infected)
        {
            rabbit_color = infected_color; // red for infected   
        }
        fill(rabbit_color);
        circle(this.position.x, this.position.y, rabbit_size);
    }

    move()
    {
        if (this.alive)
        {
            // comment out update to make them stand still
            this.update();
            this.show();
        }
        
        // kill off the bunny once it reaches the end of it's lifespan
        if (this.age == bunny_life_span)
        {
            this.alive = false;
        }

    }

    checkInRangeAndInfect(other_rabbit)
    {
        // if one is NOT infected and the other is infected...
        if (!(this.infected && other_rabbit.infected) && (this.infected || other_rabbit.infected) && (dist(this.position.x, this.position.y, other_rabbit.position.x, other_rabbit.position.y) < rabbit_size)) // then they do be colliding
        {
        // random chance rabbit gets infected 0->100
            if (random(0, 100) < infection_rate)
            {
                this.infected = true;
                other_rabbit.infected = true;

                num_infected++;
                num_not_infected--;
            }

        }
    }

    die()
    {
        this.alive = false;
        num_deaths++;
        num_infected--;
    }
}