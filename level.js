function enterLevel(x) {
    playerX = canvas2.width / 2;
    playerY = canvas2.height / 2;
    level = x
    mouseX = playerX;
    mouseY = playerY;
    switch (x) {
        case 10011:
            document.getElementById("level").innerText = "挑战1E";
            life = 20
            coin = 100
            defaultSpeed = 1500
            increaseSpeed = 0.2
            enemyMinLife = 100
            enemyMaxLife = 100
            noHelp = 0
            break;
        case 10012:
            document.getElementById("level").innerText = "挑战1N";
            life = 10
            coin = 50
            defaultSpeed = 1000
            increaseSpeed = 0.2
            enemyMinLife = 100
            enemyMaxLife = 200
            noHelp = 0
            break;
        case 10013:
            document.getElementById("level").innerText = "挑战1H";
            life = 3
            coin = 15
            defaultSpeed = 750
            increaseSpeed = 0.2
            enemyMinLife = 100
            enemyMaxLife = 300
            noHelp = 0
            break;
        case 10014:
            document.getElementById("level").innerText = "挑战1L";
            life = 1
            coin = 5
            defaultSpeed = 500
            increaseSpeed = 0.2
            enemyMinLife = 100
            enemyMaxLife = 300
            noHelp = 1
            break;
        case 10021:
            document.getElementById("level").innerText = "挑战2E";
            life = 20
            coin = 100
            defaultSpeed = 1500
            increaseSpeed = 0.2
            enemyMinLife = 200
            enemyMaxLife = 200
            noHelp = 0
            break;
        case 10022:
            document.getElementById("level").innerText = "挑战2N";
            life = 10
            coin = 50
            defaultSpeed = 1000
            increaseSpeed = 0.2
            enemyMinLife = 200
            enemyMaxLife = 300
            noHelp = 0
            break;
        case 10023:
            document.getElementById("level").innerText = "挑战2H";
            life = 3
            coin = 15
            defaultSpeed = 750
            increaseSpeed = 0.2
            enemyMinLife = 200
            enemyMaxLife = 400
            noHelp = 0
            break;
        case 10024:
            document.getElementById("level").innerText = "挑战2L";
            life = 1
            coin = 5
            defaultSpeed = 500
            increaseSpeed = 0.2
            enemyMinLife = 200
            enemyMaxLife = 400
            noHelp = 1
            break;
        case 20011:
            document.getElementById("level").innerText = "主线1-1";
            life = 10
            coin = 20
            defaultSpeed = 1500
            increaseSpeed = 0.2
            enemyMinLife = 100
            enemyMaxLife = 200
            noHelp = 0
            break;
        case 20012:
            document.getElementById("level").innerText = "主线1-2";
            life = 10
            coin = 20
            defaultSpeed = 1300
            increaseSpeed = 0.2
            enemyMinLife = 100
            enemyMaxLife = 200
            noHelp = 0
            break;
        case 20013:
            document.getElementById("level").innerText = "主线1-3";
            life = 10
            coin = 20
            defaultSpeed = 1100
            increaseSpeed = 0.2
            enemyMinLife = 100
            enemyMaxLife = 200
            noHelp = 0
            break;
        case 20014:
            document.getElementById("level").innerText = "主线1-4";
            life = 10
            coin = 20
            defaultSpeed = 900
            increaseSpeed = 0.2
            enemyMinLife = 100
            enemyMaxLife = 300
            noHelp = 0
            break;
        case 20015:
            document.getElementById("level").innerText = "主线1-5";
            life = 10
            coin = 20
            defaultSpeed = 700
            increaseSpeed = 0.2
            enemyMinLife = 100
            enemyMaxLife = 300
            noHelp = 0
            break;
        case 20021:
            document.getElementById("level").innerText = "主线2-1";
            life = 5
            coin = 10
            defaultSpeed = 1400
            increaseSpeed = 0.2
            enemyMinLife = 200
            enemyMaxLife = 300
            noHelp = 0
            break;
        case 20022:
            document.getElementById("level").innerText = "主线2-2";
            life = 5
            coin = 10
            defaultSpeed = 1200
            increaseSpeed = 0.2
            enemyMinLife = 200
            enemyMaxLife = 300
            noHelp = 0
            break;
        case 20023:
            document.getElementById("level").innerText = "主线2-3";
            life = 5
            coin = 10
            defaultSpeed = 1000
            increaseSpeed = 0.2
            enemyMinLife = 200
            enemyMaxLife = 300
            noHelp = 0
            break;
        case 20024:
            document.getElementById("level").innerText = "主线2-4";
            life = 5
            coin = 10
            defaultSpeed = 800
            increaseSpeed = 0.2
            enemyMinLife = 300
            enemyMaxLife = 400
            noHelp = 0
            break;
        case 20025:
            document.getElementById("level").innerText = "主线2-5";
            life = 5
            coin = 10
            defaultSpeed = 600
            increaseSpeed = 0.2
            enemyMinLife = 300
            enemyMaxLife = 400
            noHelp = 0
            break;
    }
    if (x >= 1) {
        draw1();
        refreshEnemy();
        document.getElementById("button10000").style.display = "none"
        document.getElementById("button20000").style.display = "none"
        document.getElementById("info1").style.display = "block"
        document.getElementById("info2").style.display = "none"
    }
    else {
        document.getElementById("button10000").style.display = "block"
        document.getElementById("button20000").style.display = "block"
        document.getElementById("info1").style.display = "none"
        document.getElementById("info2").style.display = "block"
    }
    if (x >= 10021) {
        document.getElementById("gun4").style.display = "inline"
        document.getElementById("skill2").style.display = "inline"
    }
    else {
        document.getElementById("gun4").style.display = "none"
        document.getElementById("skill2").style.display = "none"
    }
    if (x >= 10000 && x < 20000) {
        document.getElementById("gun2").style.display = "inline"
        document.getElementById("gun3").style.display = "inline"
    }
    if (x >= 20000) {
        document.getElementById("info1_2").innerText = "进度"
        document.getElementById("maxScore").style.color = "#0073ff";
    }
    else {
        document.getElementById("info1_2").innerText = "分数"
        document.getElementById("maxScore").style.color = "#9900ff";
    }
    if (x >= 20000 && maxScore1[1] >= 100) {
        document.getElementById("gun2").style.display = "inline"
    }
    else if (x >= 20000) {
        document.getElementById("gun2").style.display = "none"
    }
    if (x >= 20000 && maxScore1[3] >= 200) {
        document.getElementById("gun3").style.display = "inline"
    }
    else if (x >= 20000) {
        document.getElementById("gun3").style.display = "none"
    }
    if (x >= 20000 && maxScore1[5] >= 300) {
        document.getElementById("skill2").style.display = "inline"
    }
    else if (x >= 20000) {
        document.getElementById("skill2").style.display = "none"
    }
    if (x >= 20000 && maxScore1[8] >= 450) {
        document.getElementById("gun4").style.display = "inline"
    }
    else if (x >= 20000) {
        document.getElementById("gun4").style.display = "none"
    }
}

function show2(x) {
    switch(x) {
        case 10011:
            if (score > maxScore2[0]) {
                maxScore2[0] = score
            }
            document.getElementById("maxScore10011").innerText = maxScore2[0];
            document.getElementById("maxScore").innerText = maxScore2[0];
            break;
        case 10012:
            if (score > maxScore2[1]) {
                maxScore2[1] = score
            }
            document.getElementById("maxScore10012").innerText = maxScore2[1];
            document.getElementById("maxScore").innerText = maxScore2[1];
            break;
        case 10013:
            if (score > maxScore2[2]) {
                maxScore2[2] = score
            }
            document.getElementById("maxScore10013").innerText = maxScore2[2];
            document.getElementById("maxScore").innerText = maxScore2[2];
            break;
        case 10014:
            if (score > maxScore2[3]) {
                maxScore2[3] = score
            }
            document.getElementById("maxScore10014").innerText = maxScore2[3];
            document.getElementById("maxScore").innerText = maxScore2[3];
            break;
        case 10021:
            if (score > maxScore2[4]) {
                maxScore2[4] = score
            }
            document.getElementById("maxScore10021").innerText = maxScore2[4];
            document.getElementById("maxScore").innerText = maxScore2[4];
            break;
        case 10022:
            if (score > maxScore2[5]) {
                maxScore2[5] = score
            }
            document.getElementById("maxScore10022").innerText = maxScore2[5];
            document.getElementById("maxScore").innerText = maxScore2[5];
            break;
        case 10023:
            if (score > maxScore2[6]) {
                maxScore2[6] = score
            }
            document.getElementById("maxScore10023").innerText = maxScore2[6];
            document.getElementById("maxScore").innerText = maxScore2[6];
            break;
        case 10024:
            if (score > maxScore2[7]) {
                maxScore2[7] = score
            }
            document.getElementById("maxScore10024").innerText = maxScore2[7];
            document.getElementById("maxScore").innerText = maxScore2[7];
            break;
        case 20011:
            if (score > maxScore1[0]) {
                maxScore1[0] = score
            }
            if (score >= 50) {
                exitLevel();
            }
            if (maxScore1[0] > 50) {
                maxScore1[0] = 50
            }
            document.getElementById("maxScore20011").innerText = (maxScore1[0] / 0.5).toFixed(0);
            document.getElementById("maxScore").innerText = "50";
            break;
        case 20012:
            if (score > maxScore1[1]) {
                maxScore1[1] = score
            }
            if (score >= 100) {
                exitLevel();
            }
            if (maxScore1[1] > 100) {
                maxScore1[1] = 100
            }
            document.getElementById("maxScore20012").innerText = (maxScore1[1] / 1).toFixed(0);
            document.getElementById("maxScore").innerText = "100";
            break;
        case 20013:
            if (score > maxScore1[2]) {
                maxScore1[2] = score
            }
            if (score >= 150) {
                exitLevel();
            }
            if (maxScore1[2] > 150) {
                maxScore1[2] = 150
            }
            document.getElementById("maxScore20013").innerText = (maxScore1[2] / 1.5).toFixed(0);
            document.getElementById("maxScore").innerText = "150";
            break;
        case 20014:
            if (score > maxScore1[3]) {
                maxScore1[3] = score
            }
            if (score >= 200) {
                exitLevel();
            }
            if (maxScore1[3] > 200) {
                maxScore1[3] = 200
            }
            document.getElementById("maxScore20014").innerText = (maxScore1[3] / 2).toFixed(0);
            document.getElementById("maxScore").innerText = "200";
            break;
        case 20015:
            if (score > maxScore1[4]) {
                maxScore1[4] = score
            }
            if (score >= 250) {
                exitLevel();
            }
            if (maxScore1[4] > 250) {
                maxScore1[4] = 250
            }
            document.getElementById("maxScore20015").innerText = (maxScore1[4] / 2.5).toFixed(0);
            document.getElementById("maxScore").innerText = "250";
            break;
        case 20021:
            if (score > maxScore1[5]) {
                maxScore1[5] = score
            }
            if (score >= 300) {
                exitLevel();
            }
            if (maxScore1[5] > 300) {
                maxScore1[5] = 300
            }
            document.getElementById("maxScore20021").innerText = (maxScore1[5] / 3).toFixed(0);
            document.getElementById("maxScore").innerText = "300";
            break;
        case 20022:
            if (score > maxScore1[6]) {
                maxScore1[6] = score
            }
            if (score >= 350) {
                exitLevel();
            }
            if (maxScore1[6] > 350) {
                maxScore1[6] = 350
            }
            document.getElementById("maxScore20022").innerText = (maxScore1[6] / 3.5).toFixed(0);
            document.getElementById("maxScore").innerText = "350";
            break;
        case 20023:
            if (score > maxScore1[7]) {
                maxScore1[7] = score
            }
            if (score >= 400) {
                exitLevel();
            }
            if (maxScore1[7] > 400) {
                maxScore1[7] = 400
            }
            document.getElementById("maxScore20023").innerText = (maxScore1[7] / 4).toFixed(0);
            document.getElementById("maxScore").innerText = "400";
            break;
        case 20024:
            if (score > maxScore1[8]) {
                maxScore1[8] = score
            }
            if (score >= 450) {
                exitLevel();
            }
            if (maxScore1[8] > 450) {
                maxScore1[8] = 450
            }
            document.getElementById("maxScore20024").innerText = (maxScore1[8] / 4.5).toFixed(0);
            document.getElementById("maxScore").innerText = "450";
            break;
        case 20025:
            if (score > maxScore1[9]) {
                maxScore1[9] = score
            }
            if (score >= 500) {
                exitLevel();
            }
            if (maxScore1[9] > 500) {
                maxScore1[9] = 500
            }
            document.getElementById("maxScore20025").innerText = (maxScore1[9] / 5).toFixed(0);
            document.getElementById("maxScore").innerText = "500";
            break;
    }
}