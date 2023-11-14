/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, Column } from "typeorm";
import { Exhibit } from "./exhibit.entity";
import { Questionnaire } from "./questionaire.entity";

export class BeetrootService {}

@Entity()
export class Editor {
  @PrimaryGeneratedColumn('uuid')
  employeeID: string;
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedDate: Date;
  @Column({ nullable: true })
  userId: string
  @OneToMany(() => Exhibit, (exhibit: Exhibit) => exhibit.editorID)
  exhibits: Exhibit[];
  @OneToMany(() => Questionnaire, (questionnaire: Questionnaire) => questionnaire.editorID)
  questionnaire: Questionnaire[];
}
