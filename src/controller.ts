import {JsonController, Get, Post, Body, HttpCode, Put, Param, NotFoundError} from 'routing-controllers'
import Game from './entity'

const colors = ['red', 'blue', 'green', 'yellow', 'magenta']

const moves = (board1, board2) => 
board1
  .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
  .reduce((a, b) => a.concat(b))
  .length


  
@JsonController()
export default class MainController {

  @Get('/games')
    async allGames() {
    const games = await Game.find()
    return { games }
    }

  @Post('/games')
    @HttpCode(201)
    async createGame(
    @Body() game: Game
    ) {
    game.color = await game.setColor()
    game.board = await game.setBoard()
    return game.save()
  }

    @Put('/games/:id')
      async updateGame(
      @Param('id') id: number,
      @Body() update: Partial<Game>
      ) {
          const game = await Game.findOne(id)
          if (!game) throw new NotFoundError('Cannot find game')

          if (update.color) {
            if (game.checkColor(colors, [update.color]) === true) return 'pick a right color' }
      
          if (update.id) return 'You cant change the ID'

          if (update.board) {
            if (moves(game.board, update.board) > 1) return 'One move per game, you cheater!'
          } 

          return Game.merge(game, update).save()
        }
    }
