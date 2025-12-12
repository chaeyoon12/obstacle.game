const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 500;

let player = {
    x: 180,
    y: 440,
    width: 40,
    height: 40,
    speed: 5
};

let obstacles = [];
let score = 0;

// 장애물 생성
function createObstacle() {
    let size = Math.random() * 40 + 20;
    let x = Math.random() * (canvas.width - size);
    obstacles.push({ x: x, y: -size, width: size, height: size, speed: 3 });
}

// 키 입력
let keys = {};

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// 게임 업데이트
function update() {
    // 플레이어 이동
    if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
    if (keys["ArrowRight"] && player.x + player.width < canvas.width) player.x += player.speed;

    // 장애물 이동
    for (let obs of obstacles) {
        obs.y += obs.speed;
    }

    // 충돌 체크
    for (let obs of obstacles) {
        if (
            player.x < obs.x + obs.width &&
            player.x + player.width > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.height > obs.y
        ) {
            alert("게임 오버! 점수: " + score);
            document.location.reload();
        }
    }

    // 점수 증가
    score++;
    document.getElementById("score").textContent = score;
}

// 화면 그리기
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 플레이어 그리기
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // 장애물 그리기
    ctx.fillStyle = "red";
    for (let obs of obstacles) {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    }
}

// 루프
setInterval(() => {
    update();
    draw();
}, 20);

// 1초마다 장애물 생성
setInterval(createObstacle, 1000);
