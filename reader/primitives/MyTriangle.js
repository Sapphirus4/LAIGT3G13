function MyTriangle(scene, v1, v2, v3) {
    CGFobject.call(this,scene);

    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;

    this.a = Math.sqrt((v1[0] - v3[0]) * (v1[0] - v3[0]) +
        (v1[1] - v3[1]) * (v1[1] - v3[1]) +
        (v1[2] - v3[2]) * (v1[2] - v3[2]));

    this.b = Math.sqrt((v2[0] - v1[0]) * (v2[0] - v1[0]) +
        (v2[1] - v1[1]) * (v2[1] - v1[1]) +
        (v2[2] - v1[2]) * (v2[2] - v1[2]));

    this.c = Math.sqrt((v3[0] - v2[0]) * (v3[0] - v2[0]) +
        (v3[1] - v2[1]) * (v3[1] - v2[1]) +
        (v3[2] - v2[2]) * (v3[2] - v2[2]));

    this.cosAlpha = (-this.a*this.a + this.b*this.b + this.c * this.c) / (2 * this.b * this.c);
    this.cosBeta =  ( this.a*this.a - this.b*this.b + this.c * this.c) / (2 * this.a * this.c);
    this.cosGamma = ( this.a*this.a + this.b*this.b - this.c * this.c) / (2 * this.a * this.b);

    this.beta = Math.acos(this.cosBeta);
    this.alpha = Math.acos(this.cosAlpha);
    this.gamma = Math.acos(this.cosGamma);
    this.sum = this.beta + this.alpha + this.gamma;

    if(Math.abs(this.sum - Math.PI) > 0.001){
        console.error("This triangle is wrong. The sum of its internal angles are different from 180.");
    }

    //console.log(Math.round(this.beta * 180 / Math.PI) + " :::: " + Math.round(this.alpha * 180 / Math.PI) + " :::::: " + Math.round(this.beta * 180 / Math.PI));
    //console.log(Math.round(this.a * 100) / 100 + " ::: " + Math.round(this.b * 100) / 100 + " ::: " + Math.round(this.c * 100) / 100);
    this.initBuffers();
}

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor = MyRectangle;

MyTriangle.prototype.initBuffers = function () {
    this.vertices = [
        this.v1[0], this.v1[1], this.v1[2],
        this.v2[0], this.v2[1], this.v2[2],
        this.v3[0], this.v3[1], this.v3[2]
    ];

    var u = [
        this.v2[0] - this.v1[0],
        this.v2[1] - this.v1[1],
        this.v2[2] - this.v1[2]
    ];

    var v = [
        this.v3[0] - this.v1[0],
        this.v3[1] - this.v1[1],
        this.v3[2] - this.v1[2]
    ];
    var n = [
        u[1] * v[2] - u[2] * v[1],
        u[2] * v[0] - u[0] * v[2],
        u[0] * v[1] - u[1] * v[0]
    ];

    this.normals = [
        n[0], n[1], n[2],
        n[0], n[1], n[2],
        n[0], n[1], n[2]
    ];

    this.updateTexCoords(1.0,1.0);

    this.indices = [
        0, 1, 2
    ];

    this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
    this.initGLBuffers();

};

MyTriangle.prototype.updateTexCoords = function(amplifS, amplifT){
    this.texCoords = [
        0.0, 1.0,
        this.b / amplifS, 1.0,
        this.a * Math.cos(this.gamma) / amplifS, 1.0 - 1.0 / amplifT
    ];
};