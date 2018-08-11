import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'

const colors = ['red', 'blue', 'green', 'yellow', 'magenta']

@Entity()
export default class Game extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', {nullable:true})
    @IsString()
    name: string

    @Column('text', {nullable:true})
    @IsString()
    color: 'red' | 'blue' | 'green' | 'yellow' |'magenta'

    @Column('simple-json', {nullable:true})
    board: string



    setColor() {
        return colors[Math.floor(Math.random()*colors.length)]
    }

    setBoard() {
        const defaultBoard = JSON.stringify([
            ['o', 'o', 'o'],
            ['o', 'o', 'o'],
            ['o', 'o', 'o']
        ])
        return defaultBoard
    }

}