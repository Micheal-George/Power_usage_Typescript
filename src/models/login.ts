import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "usersession",
})
export class Login extends Model {
  @Column({ type: DataType.STRING,
   
    set(value) {
        this.setDataValue('username', value);
      }
  })
  username!: string;

 

  @Column({ type: DataType.STRING,
    set(value) {
        this.setDataValue('token', value);
      } }
    )
  token!: string;

  @Column({type: DataType.INTEGER,
    set(value) {
        this.setDataValue('userId', value);
      } })
  userId!: number;

  @Column({ type: DataType.DATE,
    }
    )
  date!: Date;
}