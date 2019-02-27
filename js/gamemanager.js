let GameManager = {
    setGameStart: function(classType) {
      this.resetPlayer(classType);
      this.setPreFight();
    },
    resetPlayer: function(classType) {
    //Aixó fa que al triar un dels personatjes li doni les seves estadistiques
        switch (classType) {
            case "Warrior":
                player = new Player(classType, 200, 0, 200, 100, 50);
                break;
            case "Rogue":
                player = new Player(classType, 100, 0, 100, 150, 200);
                break;
            case "Mage":
                player = new Player(classType, 80, 0, 50, 200, 50);
                break;
            case "Hunter":
                player = new Player(classType, 200, 0, 50, 200, 100);
                break;
        }
        //Aixó ens agafa el primer interface que troba dintre del codi ho fa a partir del querySelector
        let getInterface = document.querySelector(".interface");
        //Aquesta linia ens serveix per escriure els stats a la pagina, realment és HTML que hem ficat amb el innerHTML
        getInterface.innerHTML ='<div class="Characterv2">'
            +'<img src="img\\' + classType.toLowerCase() + '.jpg" alt="'+classType+'" class="imgCharacterv2">'
            +'<div class="textCharacterv2">'
                +'<h3 class="titolCharacterv2">'+classType+'</h3>'
                +'<div class="attrCharacterv2">'
                    +'<p>Health: ' + player.health + '</p>'
                    +'<p>Mana: ' + player.mana + '</p>'
                    +'<p>Strength: ' + player.strength + '</p>'
                    +'<p>Agility: ' + player.agility + '</p>'
                    +'<p>Speed: ' + player.speed + '</p>'
                +'</div>'
            +'</div>'
        +'</div>';
    },
    setPreFight: function() {
      //Aqui creem 3 variables per després canviar el header, les actions i la arena , que són div's que hem creat dintre del HTML
      let getHeader = document.querySelector(".header");
      let getActions = document.querySelector(".actions");
      let getArena = document.querySelector(".arena");
      //Aqui canviem el text del header
      getHeader.innerHTML = '<h2 class="taskHeader">TASK: KILL THE BOSS!</h2>';
      //Aqui creem un boto dintre del div actions, aquest boto servirá per començar el joc.
      getActions.innerHTML = '<a class="btn-prefight" onclick="GameManager.setFight()">Enter the dungeon</a>';
      getArena.style.visibility = "visible";
    },
    setFight: function() {
      let getHeader = document.querySelector(".header");
      let getActions = document.querySelector(".actions");
      let getEnemy = document.querySelector(".enemy");
      // Crea un enemic aleatori
      let enemy00 = new Enemy("orc", 100, 0, 50, 100, 100);
      let enemy01 = new Enemy("Orc", 200, 0, 120, 50, 80);
      var chooseRandomEnemy = (Math.floor(Math.random() * (2 - 0)) + 0);
      console.log(chooseRandomEnemy);
        switch(chooseRandomEnemy) {
            case 0:
                enemy = enemy00;
                break;
            case 1:
                enemy = enemy01;
                break;
        }
        document.getElementById('enemic').innerHTML = '<img src="img/' + enemy.enemyType.toLowerCase() + '.jpg" class="imgEnemy" alt="' + enemy.enemyType + '"class="img-avatar"><div><h3 class="titolEnemy">' + enemy.enemyType + '</h3><div class="textEnemy"<p class="health-enemy">Health: ' + enemy.health +'</p><p>Mana: ' + enemy.mana + '</p><p>Strength: ' + enemy.strength + '</p><p>Agility: ' + enemy.agility + '</p><p>Speed: ' + enemy.speed + '</p></div>';
        getHeader.innerHTML = 'WHAT YOU WANNA DO?';
        getActions.innerHTML = '<a class="btn-fight" onclick="PlayerMoves.calcAttack()">ATTACK!</a>';
        
    }
}
