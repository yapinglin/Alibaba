var canvas, context;
var turn, win;
var width_canvas = 480, width_cell = width_canvas / 16, count_cell = 16 * 16, count_draw;// 棋盘
var radius_piece = 12;
var piecesData = new Array(15);

function restartGame() {
	canvas = document.getElementById("canvas");
	if (!context) {
		context = canvas.getContext("2d");
	}
	context.clearRect(0, 0, width_canvas, width_canvas);
	count = 0;
	turn = "black", win = false, count_draw = 0;
	for ( var i = 0; i < 16; i++) {
		piecesData[i] = new Array(16);
		for ( var j = 0; j < piecesData[i].length; j++) {
			piecesData[i][j] = "";
		}
	}
	addChessboard();
	showTurn();
}

function addChessboard() {
	context.strokeStyle = "#676464";
	context.lineWidth = 1;
	for ( var i = 0; i <= width_canvas; i += width_cell) {
		drawChessboard(i, i);
	}
}

function addPiece(e) {
	if (win) {
		var restart = confirm("比赛已结束，是否重新开始？");
		if (restart) {
			restartGame();
			return;
		} else {
			return;
		}
	}
	var x = Math.round(e.offsetX / width_cell), y = Math.round(e.offsetY
			/ width_cell);
	if (!piecesData[x][y]) {
		if (0 <= x && x < 16 && 0 <= y && y < 16) {
			drawPiece(x * width_cell, y * width_cell);
			piecesData[x][y] = turn;
			if (!judgeWin(x, y)) {
				if ((++count_draw) == count_cell) {
					var restart = confirm("比赛平局，是否重新开始？");
					if (restart) {
						restartGame();
					}
				}
				switch (turn) {
				case "white":
					turn = "black";
					break;
				case "black":
					turn = "white";
					break;
				default:
					break;
				}
				showTurn();
			}
		}
	}
}

function judgeWin(x, y) {
	var count = 0, winner = turn == "white" ? "白子" : "黑子", blank = false;
	var judge = function(a) {
		count++;
		if (count >= 5) {
			win = true;
			var ret = confirm("比赛结束，" + winner + "胜利！是否重新开始比赛？");
			if (ret) {
				restartGame();
				return true;
			}
		} else {
			return false;
		}
	}
	// 0°
	for ( var i = (x - 4); i < (x + 5); i++) {
		if (0 <= i && i < 16 && piecesData[i][y] == turn) {
			if (judge("a")) {
				return true;
			}
		} else {
			count = 0;
		}
	}

	// 90°
	count = 0;
	for ( var i = (y - 4); i < (y + 5); i++) {
		if (0 <= i && i < 16 && piecesData[x][i] == turn) {
			if (judge("b")) {
				return true;
			}
		} else {
			count = 0;
		}
	}
	// 45°
	count = 0;
	for ( var i = (x - 4), j = (y + 4); i < (x + 5) && j > (y - 5); i++, j--) {
		if (0 <= i && i < 16 && 0 <= j && j < 16 && piecesData[i][j] == turn) {
			if (judge("c")) {
				return true;
			}
		} else {
			count = 0;
		}
	}
	// 135°
	count = 0;
	for ( var i = (x - 4), j = (y - 4); i < (x + 5) && j < (y + 5); i++, j++) {

		if (0 <= i && i < 16 && 0 <= j && j < 16 && piecesData[i][j] == turn) {
			if (judge("d")) {
				return true;
			}
		} else {
			count = 0;
		}
	}

}

function showTurn() {
	document.getElementById("toolbar").getElementsByClassName(turn)[0].classList
			.add("turn");
	siblings(document.getElementById("toolbar").getElementsByClassName(turn)[0])[0].classList
			.remove("turn");
}

function drawChessboard(x, y) {
	context.beginPath();
	context.moveTo(0, y);
	context.lineTo(width_canvas, y);
	context.closePath();
	context.stroke();

	context.beginPath();
	context.moveTo(x, 0);
	context.lineTo(x, width_canvas);
	context.closePath();
	context.stroke();
}

function drawPiece(x, y) {
	context.beginPath();
	context.arc(x, y, radius_piece, 0, 2 * Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(x, y, 13, x + 2, y - 2, 0);
	switch (turn) {
	case "black":
		gradient.addColorStop(0, "#0a0a0a");
		gradient.addColorStop(1, "#636363");
		break;
	case "white":
		gradient.addColorStop(0, "#e1e1e1");
		gradient.addColorStop(1, "#f1f1f1");
		break;
	}
	context.fillStyle = gradient;
	context.fill();

}

function siblings(o) {
	var a = [];
	var p = o.previousSibling;
	while (p) {
		if (p.nodeType === 1) {
			a.push(p);
		}
		p = p.previousSibling

	}
	a.reverse()

	var n = o.nextSibling;
	while (n) {
		if (n.nodeType === 1) {
			a.push(n);
		}
		n = n.nextSibling;
	}
	return a

}