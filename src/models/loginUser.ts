import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "loginuser",
})
export class LoginUser extends Model {
  @Column({ type: DataType.STRING,
    get() {
      return this.getDataValue('username');
    },
    set(value) {
      this.setDataValue('username', value);
    }
  })
  username!: string;


  @Column({ type: DataType.STRING,
    set(value) {
      this.setDataValue('password', value);
    }})
  password!: string;

  @Column({ type: DataType.STRING})
  email!: string;

  @Column({type: DataType.STRING})
  mobileNum!: number;
}