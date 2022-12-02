import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Powers } from "./power";

@Table({
  timestamps: false,
  tableName: "user",
})
export class User extends Model {
  @Column({ type: DataType.STRING,allowNull: false,unique: true,
    get() {
      return this.getDataValue('username');
    },
    set(value) {
      this.setDataValue('username', value);
    }
  })
  username!: string;

  @Column({ type: DataType.STRING,allowNull: false,
    set(value) {
      this.setDataValue('displayName', value);
    }})
  displayName!: string;

  @Column({ type: DataType.STRING,allowNull: false,
    set(value) {
      this.setDataValue('password', value);
    }})
  password!: string;

  @Column({ type: DataType.STRING,allowNull: false,unique: true})
  email!: string;

  @Column({type: DataType.STRING,allowNull: false,unique: true})
  mobileNum!: number;

  // @HasMany(() => Powers)
  //  powers!: Powers[];

}