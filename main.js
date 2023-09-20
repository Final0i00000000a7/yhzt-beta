var canvas1,canvas2,canvas3,canvas4
var ctx1,ctx2,ctx3,ctx4
var mouseX,mouseY
var dX,dY,t
var bulletNewX,bulletNewY
var lingrad1,lingrad2
var bulletX = []
var bulletY = []
var bulletMoveX = []
var bulletMoveY = []
var bulletClass = []
var bulletLife = []
var enemyX = []
var enemyY = []
var enemyMoveX = []
var enemyMoveY = []
var enemyLife = []
var enemyFullLife = []
var enemyArmor = []
var score = 0
var s
var life = 1000
var coin = 1000
var gun = 1
var isDebug = 0
var timeout1
var maxBullet = 100
var maxEnemy = 100
var level = -1
var enemy
var skillCooldown2 = 0
var keepAttack,keepLeft,keepRight,keepUp,keepDown
var defaultSpeed,increaseSpeed
var noHelp = 0
var enemyMinLife,enemyMaxLife
var maxScore1 = [0,0,0,0,0,0,0,0,0,0]
var maxScore2 = [0,0,0,0,0,0,0,0]
var playerX = 0
var playerY = 0

var refresh = setInterval(function() {
    show();
    if (level >= 1) {
        draw2();
        show2(level);
    }
},10);

function key() {
    document.onmousedown = function(e) {
        if (level >= 1) {
            if (e.button == 0) {
                if (gun != 3 && gun != 4) {
                    attack();
                }
                else {
                    attack();
                    clearInterval(keepAttack);
                    if (gun == 3) {
                        keepAttack = setInterval(function () {
                            attack();
                        },10);
                    }
                    else if (gun == 4) {
                        keepAttack = setInterval(function () {
                            attack();
                        },100);
                    }
                }
            }
        }
    }
    document.onmouseup = function(e) {
        if (level >= 1) {
            if (e.button == 0) {
                if (gun == 3 || gun == 4) {
                    clearInterval(keepAttack);
                }
            }
        }
    }
    document.addEventListener("keydown", (e) => {
        if (level >= 1) {
            if (e.key == "a" && !e.repeat) {
                clearInterval(keepLeft);
                keepLeft = setInterval(function () {
                    if (playerX >= 12) {
                        playerX -= 1
                        draw1();
                    }
                },10);
            }
            if (e.key == "d" && !e.repeat) {
                clearInterval(keepRight);
                keepRight = setInterval(function () {
                    if (playerX <= canvas2.width - 12) {
                        playerX += 1
                        draw1();
                    }
                },10);
            }
            if (e.key == "w" && !e.repeat) {
                clearInterval(keepUp);
                keepUp = setInterval(function () {
                    if (playerY >= 12) {
                        playerY -= 1
                        draw1();
                    }
                },10);
            }
            if (e.key == "s" && !e.repeat) {
                clearInterval(keepDown);
                keepDown = setInterval(function () {
                    if (playerY <= canvas2.height - 12) {
                        playerY += 1
                        draw1();
                    }
                },10);
            }
            if (e.key == "1" && !e.repeat) {
                clearInterval(keepAttack);
                gun = 1
            }
            if (e.key == "2" && !e.repeat && ((score >= 100 && level < 20000) || (maxScore1[1] >= 100 && level >= 20000))) {
                clearInterval(keepAttack);
                gun = 2
            }
            if (e.key == "3" && !e.repeat && ((score >= 300 && level < 20000) || (maxScore1[3] >= 200 && level >= 20000))) {
                clearInterval(keepAttack);
                gun = 3
            }
            if (e.key == "4" && !e.repeat && ((score >= 400 && level >= 10021 && level < 20000) || (maxScore1[8] >= 450 && level >= 20000))) {
                clearInterval(keepAttack);
                gun = 4
            }
            if (e.key == "e" && !e.repeat) {
                test();
                clearTimeout(timeout1);
                document.getElementById("skill1").style.fontWeight = "bold";
                document.getElementById("skill1").style.color = "#0000ff";
                document.getElementById("skill1_3").style.color = "#ff8800";
                timeout1 = setTimeout(function () {
                    document.getElementById("skill1").style.fontWeight = "normal";
                    document.getElementById("skill1").style.color = "#000000";
                    document.getElementById("skill1_3").style.color = "#555555";
                },500);
            }
            if (e.key == "q" && !e.repeat && coin >= 50 && skillCooldown2 <= 0 && ((score >= 500 && level >= 10021 && level < 20000) || (maxScore1[5] >= 300 && level >= 20000))) {
                coin -= 50
                skillCooldown2 = 1000
                var j = 0
                while (j < 50) {
                    var i = 0
                    while (i < maxBullet) {
                        if (bulletX[i] == undefined && !(mouseX == playerX && mouseY == playerY)) {
                            bulletX[i] = playerX
                            bulletY[i] = playerY
                            bulletClass[i] = 0
                            var a = Math.atan(Infinity) + j * (2 * Math.PI / 50)
                            var x = 0.3 * 70
                            bulletMoveX[i] = x * Math.cos(a)
                            bulletMoveY[i] = x * Math.sin(a)
                            bulletLife[i] = 20000
                            break;
                        }
                        i++
                    }
                    j++
                }
            }
            if (e.key == "Escape" && !e.repeat && level >= 1) {
                exitLevel();
            }
        }
    });
    document.addEventListener("keyup", (e) => {
        if (e.key == "a" && !e.repeat) {
            clearInterval(keepLeft);
        }
        if (e.key == "d" && !e.repeat) {
            clearInterval(keepRight);
        }
        if (e.key == "w" && !e.repeat) {
            clearInterval(keepUp);
        }
        if (e.key == "s" && !e.repeat) {
            clearInterval(keepDown);
        }
    });
}

function draw0() {
    canvas1 = document.getElementById("canvas1");
    canvas2 = document.getElementById("canvas2");
    canvas3 = document.getElementById("canvas3");
    canvas4 = document.getElementById("canvas4");
    canvas2.style.cursor = "default";
    ctx1 = canvas1.getContext("2d");
    ctx2 = canvas2.getContext("2d");
    ctx3 = canvas3.getContext("2d");
    ctx4 = canvas4.getContext("2d");
    ctx1.clearRect(0,0,canvas2.width,canvas2.height);
    ctx1.fillStyle = "#63d739";
    ctx1.fillRect(0,0,canvas1.width,canvas1.height);
    ctx3.fillStyle = "#e4e4e4";
    ctx3.fillRect(0,0,canvas3.width,canvas3.height);
    ctx1.fillStyle = "#a1e640";
    var i = 0
    while (i < 80) {
        var x = randomNum(0,canvas2.width);
        var y = randomNum(0,canvas2.height);
        ctx1.fillRect(x,y - 5,4,10);
        ctx1.fillRect(x + 6,y,4,4);
        ctx1.fillRect(x - 6,y,4,4);
        i++
    }
    ctx1.fillStyle = "#18b936";
    var i = 0
    while (i < 70) {
        var x = randomNum(0,canvas2.width);
        var y = randomNum(0,canvas2.height);
        ctx1.fillRect(x,y - 10,4,15);
        ctx1.fillRect(x + 6,y,4,4);
        ctx1.fillRect(x - 6,y,4,4);
        ctx1.fillRect(x + 9,y - 3,4,4);
        ctx1.fillRect(x - 9,y - 3,4,4);
        i++
    }
    ctx1.fillStyle = "#ccddcc";
    var x = randomNum(0,canvas2.width / 3);
    var y = randomNum(0,canvas2.height / 3);
    ctx1.fillRect(x,y,12,12);
    ctx1.fillRect(x - 4,y + 4,4,8);
    ctx1.fillRect(x + 12,y + 8,4,4);
    var x = randomNum(canvas2.width / 3,2 * canvas2.width / 3);
    var y = randomNum(0,canvas2.height / 3);
    ctx1.fillRect(x,y,12,12);
    ctx1.fillRect(x - 4,y + 4,4,8);
    ctx1.fillRect(x + 12,y + 8,4,4);
    var x = randomNum(2 * canvas2.width / 3,canvas2.width);
    var y = randomNum(0,canvas2.height / 3);
    ctx1.fillRect(x,y,12,12);
    ctx1.fillRect(x - 4,y + 4,4,8);
    ctx1.fillRect(x + 12,y + 8,4,4);
    var x = randomNum(0,canvas2.width / 3);
    var y = randomNum(canvas2.height / 3,2 * canvas2.height / 3);
    ctx1.fillRect(x,y,12,12);
    ctx1.fillRect(x - 4,y + 4,4,8);
    ctx1.fillRect(x + 12,y + 8,4,4);
    var x = randomNum(2 * canvas2.width / 3,canvas2.width);
    var y = randomNum(canvas2.height / 3,2 * canvas2.height / 3);
    ctx1.fillRect(x,y,12,12);
    ctx1.fillRect(x - 4,y + 4,4,8);
    ctx1.fillRect(x + 12,y + 8,4,4);
    var x = randomNum(0,canvas2.width / 3);
    var y = randomNum(2 * canvas2.height / 3,canvas2.height);
    ctx1.fillRect(x,y,12,12);
    ctx1.fillRect(x - 4,y + 4,4,8);
    ctx1.fillRect(x + 12,y + 8,4,4);
    var x = randomNum(canvas2.width / 3,2 * canvas2.width / 3);
    var y = randomNum(2 * canvas2.height / 3,canvas2.height);
    ctx1.fillRect(x,y,12,12);
    ctx1.fillRect(x - 4,y + 4,4,8);
    ctx1.fillRect(x + 12,y + 8,4,4);
    var x = randomNum(2 * canvas2.width / 3,canvas2.width);
    var y = randomNum(2 * canvas2.height / 3,canvas2.height);
    ctx1.fillRect(x,y,12,12);
    ctx1.fillRect(x - 4,y + 4,4,8);
    ctx1.fillRect(x + 12,y + 8,4,4);
    var x = randomNum(0,canvas2.width);
    var y = randomNum(0,canvas2.height);
    ctx1.fillRect(x,y,12,12);
    ctx1.fillRect(x - 4,y + 4,4,8);
    ctx1.fillRect(x + 12,y + 8,4,4);
    canvas2.addEventListener("mousemove", (e) => {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
        dX = mouseX - playerX
        dY = mouseY - playerY
        t = (dX ** 2 + dY ** 2) ** 0.5
        bulletNewX = dX * 70 / t
        bulletNewY = dY * 70 / t
        if (level >= 1) {
            draw1();
        }
    });
}

function draw1() {
    ctx4.clearRect(0,0,canvas2.width,canvas2.height);
    canvas2.style.cursor = "none";
    ctx4.fillStyle = "#00b1e7";
    ctx4.fillRect(playerX - 10,playerY - 10,20,20);
    ctx4.fillStyle = "#5fd1f4";
    ctx4.fillRect(playerX - 6,playerY - 6,12,12);
    ctx3.fillStyle = "#e4e4e4";
    ctx3.fillRect(0,0,canvas3.width,canvas3.height);
    ctx4.beginPath();
    if (bulletNewX != undefined && bulletNewY != undefined && !(mouseX == playerX && mouseY == playerY)) {
        dX = mouseX - playerX
        dY = mouseY - playerY
        t = (dX ** 2 + dY ** 2) ** 0.5
        bulletNewX = dX * 70 / t
        bulletNewY = dY * 70 / t
        ctx4.lineWidth = 4;
        lingrad1 = ctx4.createLinearGradient(playerX,playerY,playerX + bulletNewX * 1.2,playerY + bulletNewY * 1.2);
        lingrad1.addColorStop(0,"#f00000aa");
        lingrad1.addColorStop(1,"#f0000000");
        ctx4.strokeStyle = lingrad1;
        ctx4.moveTo(playerX,playerY);
        ctx4.lineTo(playerX + bulletNewX * 1.2,playerY + bulletNewY * 1.2);
        ctx4.stroke();
        ctx4.lineWidth = 1;
    }
}

function draw2() {
    skillCooldown2--
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
    ctx2.fillStyle = "#ff0000aa";
    ctx2.fillRect(playerX - Math.min(life * 3,60) / 2,playerY + 14,Math.min(life * 3,60),4);
    ctx2.fillStyle = "#ff8800aa";
    ctx2.fillRect(playerX - Math.min((coin * 3) ** 0.8,60) / 2,playerY + 22,Math.min((coin * 3) ** 0.8,60),4);
    refreshEnemyMove();
    var i = 0
    while (i < maxEnemy) {
        if (enemyX[i] != undefined) {
            enemyX[i] += enemyMoveX[i] / 105
            enemyY[i] += enemyMoveY[i] / 105
            enemyArmor[i] += 5
            if (enemyArmor[i] > 100) {
                enemyArmor[i] = 100
            }
            if (enemyLife[i] <= 100) {
                ctx2.fillStyle = "#a16b00";
            }
            else if (enemyLife[i] <= 200) {
                ctx2.fillStyle = "#8a5c00";
            }
            else if (enemyLife[i] <= 300)  {
                ctx2.fillStyle = "#704b00";
            }
            else {
                ctx2.fillStyle = "#573a00";
            }
            ctx2.fillRect(enemyX[i] - 10,enemyY[i] - 10,20,20);
            ctx2.fillStyle = "#ff000088";
            ctx2.fillRect(enemyX[i] - Math.min(enemyLife[i] / 8,100) / 2,enemyY[i] + 14,Math.min(enemyLife[i] / 8,100),4);
            if (enemyArmor[i] < 100 && isDebug >= 1) {
                //ctx2.fillStyle = "#ffffff88";
                //ctx2.fillRect(enemyX[i] - Math.min(enemyArmor[i] / 2,60) / 2,enemyY[i] + 22,Math.min(enemyArmor[i] / 2,60),4);
            }
            if (enemyLife[i] <= 100) {
                ctx2.fillStyle = "#bd7e00";
            }
            else if (enemyLife[i] <= 200) {
                ctx2.fillStyle = "#a16b00";
            }
            else if (enemyLife[i] <= 300) {
                ctx2.fillStyle = "#8a5c00";
            }
            else {
                ctx2.fillStyle = "#704b00";
            }
            ctx2.fillRect(enemyX[i] - 6,enemyY[i] - 6,12,12);
            if ((enemyX[i] > playerX - 18 && enemyX[i] < playerX + 18) && (enemyY[i] > playerY - 18 && enemyY[i] < playerY + 18)) {
                enemyLife[i] = 0
                life -= 1
                refreshEnemy();
            }
            var j = 0
            while (j < maxBullet) {
                if (bulletX[j] != undefined) {
                    if (bulletClass[j] == 1) {
                        if ((enemyX[i] > bulletX[j] - 15 && enemyX[i] < bulletX[j] + 15) && (enemyY[i] > bulletY[j] - 15 && enemyY[i] < bulletY[j] + 15)) {
                            if (enemyArmor[i] > 0) {
                                enemyLife[i] -= 5
                                enemyArmor[i] -= 20
                            }
                            else {
                                enemyLife[i] -= 25
                            }
                            refreshEnemy();
                            break;
                        }
                    }
                    else {
                        if ((enemyX[i] > bulletX[j] - 15 && enemyX[i] < bulletX[j] + 15) && (enemyY[i] > bulletY[j] - 15 && enemyY[i] < bulletY[j] + 15)) {
                            bulletX[j] = undefined
                            bulletY[j] = undefined
                            bulletMoveX[j] = undefined
                            bulletMoveY[j] = undefined
                            enemyLife[i] -= 100
                            refreshEnemy();
                            break;
                        }
                    }
                }
                j++
            }
            if (enemyLife[i] <= 0) {
                score += 1
                if (enemyFullLife[i] > 100) {
                    score += 1
                }
                if (enemyFullLife[i] > 200) {
                    score += 1
                }
                if (enemyFullLife[i] > 300) {
                    score += 1
                }
                coin += randomNum(1,2);
                if (enemyFullLife[i] > 100) {
                    coin += randomNum(1,2);
                }
                if (enemyFullLife[i] > 200) {
                    coin += randomNum(1,2);
                }
                if (enemyFullLife[i] > 300) {
                    coin += randomNum(1,2);
                }
                enemyX[i] = undefined
                enemyY[i] = undefined
                enemyMoveX[i] = undefined
                enemyMoveY[i] = undefined
                enemyLife[i] = undefined
                enemyFullLife[i] = undefined
                enemyArmor[i] = undefined
            }
            if (enemyX[i] < -10 || enemyX[i] > canvas2.width + 10 || enemyY[i] < -10 || enemyY[i] > canvas2.height + 10) {
                enemyX[i] = undefined
                enemyY[i] = undefined
                enemyMoveX[i] = undefined
                enemyMoveY[i] = undefined
                enemyLife[i] = undefined
                enemyFullLife[i] = undefined
                enemyArmor[i] = undefined
            }
        }
        i++
    }
    var i = 0
    var k = 0
    while (i < maxBullet) {
        if (bulletX[i] != undefined) {
            bulletX[i] += bulletMoveX[i] / 10
            bulletY[i] += bulletMoveY[i] / 10
            ctx2.beginPath();
            if (bulletClass[i] == 0) {
                if (bulletLife[i] >= 2100) {
                    ctx2.fillStyle = "#00b1e7";
                }
                else if (bulletLife[i] >= 1400) {
                    ctx2.fillStyle = "#00b1e7aa";
                }
                else if (bulletLife[i] >= 700){
                    ctx2.fillStyle = "#00b1e788";
                }
                else {
                    ctx2.fillStyle = "#00b1e766";
                }
                ctx2.fillRect(bulletX[i] - 6,bulletY[i] - 6,12,12);
                if (bulletLife[i] >= 2100) {
                    ctx2.fillStyle = "#5fd1f4";
                }
                else if (bulletLife[i] >= 1400) {
                    ctx2.fillStyle = "#5fd1f4aa";
                }
                else if (bulletLife[i] >= 700){
                    ctx2.fillStyle = "#5fd1f488";
                }
                else {
                    ctx2.fillStyle = "#5fd1f466";
                }
                ctx2.fillRect(bulletX[i] - 2,bulletY[i] - 2,4,4);
                if (bulletLife[i] <= 0) {
                    bulletX[i] = undefined
                }
                else {
                    bulletLife[i] -= 100
                }
            }
            else {
                if (bulletLife[i] <= 0) {
                    bulletX[i] = undefined
                }
                else {
                    bulletLife[i] -= 100
                }
                if (k <= 1) {
                    var nX = (mouseX - playerX) * 1250 / ((mouseX - playerX) ** 2 + (mouseY - playerY) ** 2) ** 0.5
                    var nY = (mouseY - playerY) * 1250 / ((mouseX - playerX) ** 2 + (mouseY - playerY) ** 2) ** 0.5
                    ctx2.strokeStyle = "#00b1e7";
                    ctx2.lineWidth = 12;
                    ctx2.moveTo(playerX,playerY);
                    ctx2.lineTo(nX + playerX,nY + playerY);
                    ctx2.stroke();
                    ctx2.beginPath();
                    ctx2.strokeStyle = "#5fd1f4";
                    ctx2.lineWidth = 4;
                    ctx2.moveTo(playerX,playerY);
                    ctx2.lineTo(nX + playerX,nY + playerY);
                    ctx2.stroke();
                    ctx2.lineWidth = 1;
                    k++
                }
            }
        }
        i++
    }
    document.getElementById("score").innerText = score;
    document.getElementById("life").innerText = life;
    document.getElementById("coin").innerText = Math.floor(coin);
    document.getElementById("text1").innerText = mouseX;
    document.getElementById("text2").innerText = mouseY;
    document.getElementById("text3").innerText = dX;
    document.getElementById("text4").innerText = dY;
    if (noHelp == 0 && !(mouseX == playerX && mouseY == playerY)) {
        ctx2.fillStyle = "#f00000aa";
        ctx2.beginPath();
        ctx2.fillRect(mouseX - 14,mouseY - 2,28,4);
        ctx2.fillRect(mouseX - 2,mouseY - 14,4,28);
        ctx2.stroke();
    }
    if (life <= 0) {
        exitLevel();
    }
}

function exitLevel() {
    score = 0
    life = 10
    coin = 5
    bulletX = []
    bulletY = []
    bulletMoveX = []
    bulletMoveY = []
    enemyX = []
    enemyY = []
    enemyMoveX = []
    enemyMoveY = []
    enemyLife = []
    enemyFullLife = []
    enemyArmor = []
    gun = 1
    skillCooldown2 = 0
    enterLevel(-1);
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
    ctx4.clearRect(0,0,canvas2.width,canvas2.height);
    clearInterval(keepAttack);
    clearInterval(keepLeft);
    clearInterval(keepRight);
    clearInterval(keepUp);
    clearInterval(keepDown);
    draw0();
}

function makeEnemy() {
    var i = 0
    var direction = 0
    while (i < maxEnemy) {
        if (enemyX[i] == undefined) {
            enemyFullLife[i] = randomNum(enemyMinLife / 100,enemyMaxLife / 100) * 100;
            enemyLife[i] = enemyFullLife[i]
            enemyArmor[i] = 100
            direction = randomNum(1,4);
            if (direction == 1) {
                enemyX[i] = randomNum(0,canvas2.width);
                enemyY[i] = 0;
            }
            else if (direction == 2) {
                enemyX[i] = canvas2.width;
                enemyY[i] = randomNum(0,canvas2.height);
            }
            else if (direction == 3) {
                enemyX[i] = randomNum(0,canvas2.width);
                enemyY[i] = canvas2.height;
            }
            else if (direction == 4) {
                enemyX[i] = 0;
                enemyY[i] = randomNum(0,canvas2.height);
            }
            break;
        }
        i++
    }
}

function refreshEnemyMove() {
    var i = 0
    while (i < maxEnemy) {
        if (enemyX[i] != undefined) {
            enemyMoveX[i] = playerX - enemyX[i]
            enemyMoveY[i] = playerY - enemyY[i]
            s = (enemyMoveX[i] ** 2 + enemyMoveY[i] ** 2) ** 0.5
            enemyMoveX[i] = enemyMoveX[i] * 70 / s
            enemyMoveY[i] = enemyMoveY[i] * 70 / s
        }
        i++
    }
}

function attack() {
    if (gun == 1) {
        if (coin >= 1) {
            var i = 0
            while (i < maxBullet) {
                if (bulletX[i] == undefined && !(mouseX == playerX && mouseY == playerY)) {
                    bulletX[i] = playerX
                    bulletY[i] = playerY
                    bulletClass[i] = 0
                    bulletMoveX[i] = bulletNewX
                    bulletMoveY[i] = bulletNewY
                    bulletLife[i] = 10000
                    coin -= 1
                    break;
                }
                i++
            }
        }
    }
    if (gun == 2) {
        if (coin >= 3) {
            var i = 0
            while (i < maxBullet) {
                if (bulletX[i] == undefined && !(mouseX == playerX && mouseY == playerY)) {
                    bulletX[i] = playerX
                    bulletY[i] = playerY
                    bulletClass[i] = 0
                    bulletMoveX[i] = bulletNewX
                    bulletMoveY[i] = bulletNewY
                    bulletLife[i] = 6000
                    coin -= 1
                    break;
                }
                i++
            }
            var i = 0
            while (i < maxBullet) {
                if (bulletX[i] == undefined && !(mouseX == playerX && mouseY == playerY)) {
                    bulletX[i] = playerX
                    bulletY[i] = playerY
                    bulletClass[i] = 0
                    bulletLife[i] = 6000
                    var a = Math.atan(bulletNewY / bulletNewX) + 0.1
                    var x = (bulletNewX ** 2 + bulletNewY ** 2) ** 0.5
                    if (dX >= 0) {
                        bulletMoveX[i] = x * Math.cos(a)
                        bulletMoveY[i] = x * Math.sin(a)
                    }
                    else {
                        bulletMoveX[i] = -1 * x * Math.cos(a)
                        bulletMoveY[i] = -1 * x * Math.sin(a)
                    }
                    coin -= 1
                    break;
                }
                i++
            }
            var i = 0
            while (i < maxBullet) {
                if (bulletX[i] == undefined && !(mouseX == playerX && mouseY == playerY)) {
                    bulletX[i] = playerX
                    bulletY[i] = playerY
                    bulletClass[i] = 0
                    bulletLife[i] = 6000
                    var a = Math.atan(bulletNewY / bulletNewX) + 0.2
                    var x = (bulletNewX ** 2 + bulletNewY ** 2) ** 0.5
                    if (dX >= 0) {
                        bulletMoveX[i] = x * Math.cos(a)
                        bulletMoveY[i] = x * Math.sin(a)
                    }
                    else {
                        bulletMoveX[i] = -1 * x * Math.cos(a)
                        bulletMoveY[i] = -1 * x * Math.sin(a)
                    }
                    coin -= 1
                    break;
                }
                i++
            }
            var i = 0
            while (i < maxBullet) {
                if (bulletX[i] == undefined && !(mouseX == playerX && mouseY == playerY)) {
                    bulletX[i] = playerX
                    bulletY[i] = playerY
                    bulletClass[i] = 0
                    bulletLife[i] = 6000
                    var a = Math.atan(bulletNewY / bulletNewX) - 0.1
                    var x = (bulletNewX ** 2 + bulletNewY ** 2) ** 0.5
                    if (dX >= 0) {
                        bulletMoveX[i] = x * Math.cos(a)
                        bulletMoveY[i] = x * Math.sin(a)
                    }
                    else {
                        bulletMoveX[i] = -1 * x * Math.cos(a)
                        bulletMoveY[i] = -1 * x * Math.sin(a)
                    }
                    break;
                }
                i++
            }
            var i = 0
            while (i < maxBullet) {
                if (bulletX[i] == undefined && !(mouseX == playerX && mouseY == playerY)) {
                    bulletX[i] = playerX
                    bulletY[i] = playerY
                    bulletClass[i] = 0
                    bulletLife[i] = 6000
                    var a = Math.atan(bulletNewY / bulletNewX) - 0.2
                    var x = (bulletNewX ** 2 + bulletNewY ** 2) ** 0.5
                    if (dX >= 0) {
                        bulletMoveX[i] = x * Math.cos(a)
                        bulletMoveY[i] = x * Math.sin(a)
                    }
                    else {
                        bulletMoveX[i] = -1 * x * Math.cos(a)
                        bulletMoveY[i] = -1 * x * Math.sin(a)
                    }
                    break;
                }
                i++
            }
        }
    }
    if (gun == 3) {
        if (coin >= 0.05) {
            var i = 0
            while (i < maxBullet) {
                if (bulletX[i] == undefined && !(mouseX == playerX && mouseY == playerY)) {
                    bulletX[i] = playerX
                    bulletY[i] = playerY
                    bulletClass[i] = 1
                    bulletMoveX[i] = bulletNewX * 5
                    bulletMoveY[i] = bulletNewY * 5
                    bulletLife[i] = 1000
                    coin -= 0.05
                    break;
                }
                i++
            }
            var i = 0
            while (i < maxBullet) {
                if (bulletX[i] == undefined && !(mouseX == playerX && mouseY == playerY)) {
                    bulletX[i] = playerX
                    bulletY[i] = playerY
                    bulletClass[i] = 1
                    bulletMoveX[i] = bulletNewX * 5
                    bulletMoveY[i] = bulletNewY * 5
                    bulletX[i] += bulletMoveX[i] * 1
                    bulletY[i] += bulletMoveY[i] * 1
                    bulletLife[i] = 1000
                    break;
                }
                i++
            }
            var i = 0
            while (i < maxBullet) {
                if (bulletX[i] == undefined && !(mouseX == playerX && mouseY == playerY)) {
                    bulletX[i] = playerX
                    bulletY[i] = playerY
                    bulletClass[i] = 1
                    bulletMoveX[i] = bulletNewX * 5
                    bulletMoveY[i] = bulletNewY * 5
                    bulletX[i] += bulletMoveX[i] * 2
                    bulletY[i] += bulletMoveY[i] * 2
                    bulletLife[i] = 1000
                    break;
                }
                i++
            }
        }
    }
    if (gun == 4) {
        if (coin >= 1) {
            var i = 0
            while (i < maxBullet) {
                if (bulletX[i] == undefined && !(mouseX == playerX && mouseY == playerY)) {
                    bulletX[i] = playerX
                    bulletY[i] = playerY
                    bulletClass[i] = 0
                    bulletLife[i] = 6000
                    var a = Math.atan(bulletNewY / bulletNewX) + randomNum(-20,20) / 100
                    var x = (bulletNewX ** 2 + bulletNewY ** 2) ** 0.5
                    if (dX >= 0) {
                        bulletMoveX[i] = x * Math.cos(a)
                        bulletMoveY[i] = x * Math.sin(a)
                    }
                    else {
                        bulletMoveX[i] = -1 * x * Math.cos(a)
                        bulletMoveY[i] = -1 * x * Math.sin(a)
                    }
                    coin -= 1
                    break;
                }
                i++
            }
        }
    }
}

function show() {
    if (gun == 1) {
        document.getElementById("gun1").style.fontWeight = "bold";
        document.getElementById("gun1").style.color = "#0000ff";
        document.getElementById("gun1_3").style.color = "#ff8800";
    }
    else {
        document.getElementById("gun1").style.fontWeight = "normal";
        document.getElementById("gun1").style.color = "#000000";
        document.getElementById("gun1_3").style.color = "#555555";
    }
    if (gun == 2 && ((score >= 100 && level < 20000) || (maxScore1[1] >= 100 && level >= 20000))) {
        document.getElementById("gun2").style.fontWeight = "bold";
        document.getElementById("gun2").style.color = "#0000ff";
        document.getElementById("gun2_3").style.color = "#ff8800";
    }
    else {
        document.getElementById("gun2").style.fontWeight = "normal";
        document.getElementById("gun2").style.color = "#000000";
        document.getElementById("gun2_3").style.color = "#555555";
    }
    if (gun == 3 && ((score >= 300 && level < 20000) || (maxScore1[3] >= 200 && level >= 20000))) {
        document.getElementById("gun3").style.fontWeight = "bold";
        document.getElementById("gun3").style.color = "#0000ff";
        document.getElementById("gun3_3").style.color = "#ff8800";
    }
    else {
        document.getElementById("gun3").style.fontWeight = "normal";
        document.getElementById("gun3").style.color = "#000000";
        document.getElementById("gun3_3").style.color = "#555555";
    }
    if (gun == 4 && ((score >= 400 && level >= 10021 && level < 20000) || (maxScore1[8] >= 450 && level >= 20000))) {
        document.getElementById("gun4").style.fontWeight = "bold";
        document.getElementById("gun4").style.color = "#0000ff";
        document.getElementById("gun4_3").style.color = "#ff8800";
    }
    else {
        document.getElementById("gun4").style.fontWeight = "normal";
        document.getElementById("gun4").style.color = "#000000";
        document.getElementById("gun4_3").style.color = "#555555";
    }
    if ((score >= 100 && level < 20000) || (maxScore1[1] >= 100 && level >= 20000)) {
        if (gun != 2) {
            document.getElementById("gun2").style.color = "#000000";
        }
        document.getElementById("gun2_1").style.display = "none";
        document.getElementById("gun2_3").style.display = "inline";
    }
    else {
        document.getElementById("gun2").style.color = "#888888";
        document.getElementById("gun2_1").style.display = "inline";
        document.getElementById("gun2_3").style.display = "none";
    }
    if ((score >= 300 && level < 20000) || (maxScore1[3] >= 200 && level >= 20000)) {
        if (gun != 3) {
            document.getElementById("gun3").style.color = "#000000";
        }
        document.getElementById("gun3_1").style.display = "none";
        document.getElementById("gun3_3").style.display = "inline";
    }
    else {
        document.getElementById("gun3").style.color = "#888888";
        document.getElementById("gun3_1").style.display = "inline";
        document.getElementById("gun3_3").style.display = "none";
    }
    if ((score >= 400 && level >= 10021 && level < 20000) || (maxScore1[8] >= 450 && level >= 20000)) {
        if (gun != 4) {
            document.getElementById("gun4").style.color = "#000000";
        }
        document.getElementById("gun4_1").style.display = "none";
        document.getElementById("gun4_3").style.display = "inline";
    }
    else {
        document.getElementById("gun4").style.color = "#888888";
        document.getElementById("gun4_1").style.display = "inline";
        document.getElementById("gun4_3").style.display = "none";
    }
    if (((score >= 500 && level >= 10021 && level < 20000) || (maxScore1[5] >= 300 && level >= 20000)) && skillCooldown2 <= 0) {
        document.getElementById("skill2").style.color = "#000000";
        document.getElementById("skill2_1").style.display = "none";
        document.getElementById("skill2_2").style.display = "none";
        document.getElementById("skill2_3").style.display = "inline";
        document.getElementById("skill2_3").style.color = "#555555";
    }
    else if (((score >= 500 && level >= 10021 && level < 20000) || (maxScore1[5] >= 300 && level >= 20000)) && skillCooldown2 >= 950) {
        document.getElementById("skill2").style.fontWeight = "bold";
        document.getElementById("skill2").style.color = "#0000ff";
        document.getElementById("skill2_1").style.display = "none";
        document.getElementById("skill2_2").style.display = "none";
        document.getElementById("skill2_3").style.display = "inline";
        document.getElementById("skill2_3").style.color = "#ff8800";
    }
    else if ((score >= 500 && level >= 10021 && level < 20000) || (maxScore1[5] >= 300 && level >= 20000)) {
        document.getElementById("skill2").style.fontWeight = "normal";
        document.getElementById("skill2").style.color = "#888888";
        document.getElementById("skill2_1").style.display = "none";
        document.getElementById("skill2_2_1").innerText = (skillCooldown2 / 100).toFixed(1);
        document.getElementById("skill2_2").style.display = "inline";
        document.getElementById("skill2_3").style.display = "none";
        document.getElementById("skill2_3").style.color = "#ff8800";
    }
    else {
        document.getElementById("skill2").style.color = "#888888";
        document.getElementById("skill2_1").style.display = "inline";
        document.getElementById("skill2_2").style.display = "none";
        document.getElementById("skill2_3").style.display = "none";
    }
    if (isDebug >= 1) {
        document.getElementById("debugText").style.display = "block";
    }
    else {
        document.getElementById("debugText").style.display = "none";
    }
    if (maxScore1[4] >= 250) {
        document.getElementById("button10010").style.display = "inline"
        document.getElementById("button20020").style.display = "inline"
    }
    else {
        document.getElementById("button10010").style.display = "none"
        document.getElementById("button20020").style.display = "none"
    }
    if (maxScore1[9] >= 500) {
        document.getElementById("button10020").style.display = "inline"
    }
    else {
        document.getElementById("button10020").style.display = "none"
    }
    if (maxScore1[1] >= 100) {
        document.getElementById("button20012").style.color = "#00ff00"
    }
    else {
        document.getElementById("button20012").style.color = "#ff0000"
    }
    if (maxScore1[3] >= 200) {
        document.getElementById("button20014").style.color = "#00ff00"
    }
    else {
        document.getElementById("button20014").style.color = "#ff0000"
    }
    if (maxScore1[5] >= 300) {
        document.getElementById("button20021").style.color = "#00ff00"
    }
    else {
        document.getElementById("button20021").style.color = "#ff0000"
    }
    if (maxScore1[8] >= 450) {
        document.getElementById("button20024").style.color = "#00ff00"
    }
    else {
        document.getElementById("button20024").style.color = "#ff0000"
    }
}

function refreshEnemy() {
    clearInterval(enemy);
    enemy = setInterval(function() {
        if (level >= 1) {
            makeEnemy();
        }
    },defaultSpeed / (score + 1) ** increaseSpeed);
}

function test() {
    score += 1000
    life += 1000
    coin += 1000
    isDebug += 1
    refreshEnemy();
}

function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random() * minNum + 1,10); 
        break; 
        case 2: 
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 