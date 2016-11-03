/**
 * Configuración de los niveles y sus rondas.
 * 
 * Estructura:
 * 
 * Nivel 1
 *   Ronda 1
 *     Enemigos
 *       EnemigosA: X
 *       EnemigosB: y
 *       EnemigosC: Z
 *     Asteroides
 *   Ronda 2
 *     ...
 * Nivel 2
 *   Ronda 1
 *   Ronda 2
 *   Ronda 3
 * ...
 */

var config = {
    "levels": [
        // Level 1
        [
            // Ronda 1
            {
                "enemies": {
                    "enemyFollower": 1,
                    "enemyParabolic": 1,
                    "enemyWave": 1,
                    "enemyLaser": 1,

                    "enemyBoss": 0
                },
                "asteroids": 1
            },
            // Ronda 2
            {
                "enemies": {
                    "enemyFollower": 2,
                    "enemyParabolic": 1,
                    "enemyWave": 2,
                    "enemyLaser": 1,

                    "enemyBoss": 0
                },
                "asteroids": 1
            },
            // Ronda 3
            {
                "enemies": {
                    "enemyFollower": 3,
                    "enemyParabolic": 2,
                    "enemyWave": 3,
                    "enemyLaser": 1,

                    "enemyBoss": 0
                },
                "asteroids": 2
            },
            {
                "enemies": {
                    "enemyFollower": 0,
                    "enemyParabolic": 0,
                    "enemyWave": 0,
                    "enemyLaser": 1,

                    "enemyBoss": 1
                },
                "asteroids": 3
            },
            // Ronda 4
            {
                "enemies": {
                    "enemyBoss": 1
                },
                "asteroids": 1
            }
        ]
    ]
};