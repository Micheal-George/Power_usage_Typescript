import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";



export class Days extends Model {
    
   fromTime!:Date

    
     toTime!: Date;

     unitconsumed!:number;

     duration!:number;

}

    

