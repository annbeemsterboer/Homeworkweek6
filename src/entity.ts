import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Validator} from 'class-validator'

const validator = new Validator();
const colors = ['red', 'blue', 'green', 'yellow', 'magenta']

@Entity()
export default class Game extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', {nullable:true})
    @IsString()
    name: string

    @Column('text', {nullable:true})
    color: string

    @Column('simple-json', {nullable:true})
    board: string[][]

    setColor() {
        return colors[Math.floor(Math.random()*colors.length)]
    }

    checkColor(array, values) {
        return validator.arrayNotContains(array, values)
    }

    setBoard() {
        const defaultBoard = [
            ['o', 'o', 'o'], 
            ['o', 'o', 'o'], 
            ['o', 'o', 'o']
        ]
        return defaultBoard
    }


    
}
