/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, Column } from "typeorm";
import { UpdateDateColumn } from "typeorm/decorator/columns/UpdateDateColumn";

@Entity()
export class ConnectedUser {
  @PrimaryGeneratedColumn('uuid')
  connectionID: string;
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedDate: Date;
  @Column({ nullable: true })
  userId?: string;
  @Column({ nullable: true })
  socketID?: string;
  @Column({ nullable: true })
  currentConnectionStatus: string;
  @Column({ default: false })
  isOnline: boolean;
}