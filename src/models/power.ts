import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import {User} from "../models/user"

@Table({
  timestamps: false,
  tableName: "powerTable",
})
export class Powers extends Model {
    @Column({type: DataType.DATE,allowNull: false,})
    fromTime!:Date

    @Column({type: DataType.DATE,allowNull: false,})
    toTime!: Date;

    @Column({type: DataType.STRING,allowNull: false,})
    applianceType!: string;

  @Column({ type: DataType.INTEGER,allowNull: false,})
  unitConsumed!: number;

  @Column({type: DataType.STRING})
    duration!: string;

    
    // @ForeignKey(() => User)
    // @Column({ type: DataType.INTEGER})
    // creatorId!: number;
    // @BelongsTo(() => User)
    // user!:User;
}


