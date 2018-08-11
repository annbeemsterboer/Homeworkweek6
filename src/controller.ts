import {JsonController, Get, Post, Body, HttpCode} from 'routing-controllers'
import Game from './entity'


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

}