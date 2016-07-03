var ConnectFour = {
	player1: 'player-1',
	player2: 'player-2',
	currentPlayer: "",
	canvas: $('#connect-four-canvas'),

	start: function() {
		this.setCurrentPlayer(this.player1);
		$('#paylers-info').show();
		$('#player-moves').show();
		$('#startBtn').hide();
		$('#endBtn').show();
		$('#drop-area-help').show();
	},

	reset: function() {
		this.canvas.find('td').removeAttr('class');
		this.start();
		$('#startBtn').hide();
		$('#endBtn').show();
	},

	playerMove: function(colIndex) {
		var rows = this.canvas.find('tr'), rowIndex;
		var rowsLength = rows.length - 1, tdElem;
		for(var i = rowsLength; i >= 0; i--) {
			tdElem = $(rows[i]).find('td').eq(colIndex);
			if(!tdElem.prop('class')) {
				rowIndex = i;
				tdElem.addClass(this.currentPlayer);
				break;
			}
		}

		winner = this.checkWinningPlayer(colIndex, rowIndex);
		if(!winner) {
			var isNoMoreMove = this.canvas.find('td:not([class])').length == 0;
			if(!isNoMoreMove)
				this.switchPlayer();
			else this.showDraw();

		} else this.showWinner(winner)
	},

	checkWinningPlayer: function(colIndex, rowIndex) {
		console.log("currColIndex: ", colIndex);
		console.log("currRowIndex: ", rowIndex);
		var cell, player1Match = 0, player2Match = 0;

		// Check Horizontal Combination Winner
		var rowCells = this.canvas.find('tr:nth(' + rowIndex + ') td');
		//console.log("rowCells: ", rowCells);
		for(var i = 0; i < rowCells.length; i++) {
			cell = $(rowCells[i]);
			if(cell.prop('class') == this.player1) {
				player1Match++;
				if(player1Match == 4) return this.player1;
			} 
			else player1Match = 0;

			if(cell.prop('class') == this.player2) {
				player2Match++;
				if(player2Match == 4) return this.player2;

			} else player2Match = 0;
		}

		// Check Vertical Combination Winner
		player1Match = 0, player2Match = 0;
		var columnCells = this.canvas.find('tr td[class^="player-"]:nth-child('+ (colIndex + 1) +')');
		for(i = 0; i < columnCells.length; i++) {
			cell = $(columnCells[i]);
			if(cell.prop('class') == this.player1) {
				player1Match++;
				if(player1Match == 4) return this.player1;
			} 
			else player1Match = 0;

			if(cell.prop('class') == this.player2) {
				player2Match++;
				if(player2Match == 4) return this.player2;

			} else player2Match = 0;
		}

		// Check Diagonal Combination Winner
		var rows = this.canvas.find('tr');
		var forwardStartIndex = colIndex + ((rowIndex + 1) - 6);
		var backwardStartIndex =  colIndex + (6 - (rowIndex + 1));		
		var player1bMatch = 0, player2bMatch = 0, forwardCell, backwardCell;

		player1Match = 0, player2Match = 0;
		for(i = 5; i >= 0; i--) {

			// Check Up-forward Diagonal
			if(forwardStartIndex >= 0) {
				forwardCell = $(rows[i]).find('td').eq(forwardStartIndex);
				if(forwardCell.prop('class') == this.player1) {
					player1Match++;
					if(player1Match == 4) return this.player1;
				} else player1Match = 0;

				if(forwardCell.prop('class') == this.player2) {
					player2Match++;
					if(player2Match == 4) return this.player2;
				} else player2Match = 0;				
			}

			// Check Up-backward Diagonal
			if(backwardStartIndex <= 6) {
				backwardCell = $(rows[i]).find('td').eq(backwardStartIndex);
				if(backwardCell.prop('class') == this.player1) {
					player1bMatch++;
					if(player1bMatch == 4) return this.player1;
				} else player1bMatch = 0;

				if(backwardCell.prop('class') == this.player2) {
					player2bMatch++;
					if(player2bMatch == 4) return this.player2;
				} else player2bMatch = 0;
			}

			forwardStartIndex++;
			backwardStartIndex--;
		}
	},

	showWinner: function(player) {
		var playerLabel = $.trim($('#'+player).text());
		alert("Congrats " + playerLabel + "! You've won the game!");
		this.endGame();
	},

	showDraw: function(player) {
		alert("The game is draw! No more move left.");
		this.endGame();
	},

	endGame: function() {
		$('#player-moves').hide();
		$('#drop-area-help').hide();
		$('#paylers-info').hide()
	},

	switchPlayer: function() {
		var nextPlayer = this.currentPlayer == this.player1 ? this.player2 : this.player1;
		this.setCurrentPlayer(nextPlayer);
		
	},

	setCurrentPlayer: function(player) {
		this.currentPlayer = player;
		$('#current-player').prop('class', this.currentPlayer);
		$('#player-moves th').prop('class', this.currentPlayer);
	}
};