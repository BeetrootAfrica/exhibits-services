/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Question, Questionnaire, QuestionnaireSection } from "./questionaire.entity";

@Entity()
export class Exhibit {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    updatedDate: Date;
    @DeleteDateColumn()
    deletedDate: Date;
    @Column({ nullable: true })
    clientID: string;
    @Column({ nullable: true })
    editorID: string;
    @ManyToOne(() => Questionnaire, (questionnaire: Questionnaire) => questionnaire.exhibits)
    questionnaire: Questionnaire;
    @OneToMany(() => QuestionnaireSection, (questionnaireSections) => questionnaireSections.exhibits)
    questionnaireSections: QuestionnaireSection[];
    @OneToMany(() => Question, (question) => question.exhibits)
    questions: Question[];
}

@Entity()
export class Dialogue {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    updatedDate: Date;
    @DeleteDateColumn()
    deletedDate: Date;
    @Column({ nullable: true })
    category: string;
    @Column({ nullable: true })
    searchTerms: string;
    @Column({ nullable: true })
    question: string;
    @Column({ nullable: true })
    answer: string;
    @Column({ nullable: true })
    meta: string;
    @Column({ nullable: true })
    responderID: string;
    @ManyToMany(() => Exhibit, (exhibit) => exhibit.questions)
    @JoinTable()
    exhibits: Exhibit[];

}




@Entity()
export class QuestionAnswer {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    updatedDate: Date;
    @DeleteDateColumn()
    deletedDate: Date;
    @Column({ nullable: true })
    userId: string;
    @Column({ nullable: true })
    question: string;
    @OneToMany(() => Responses, (response) => response.question)
    responses: Responses[];
}

@Entity()
export class Responses {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    updatedDate: Date;
    @DeleteDateColumn()
    deletedDate: Date;
    @Column({ nullable: true })
    comment: string;
    @Column({ nullable: true })
    commenterID: string;
    @ManyToOne(() => QuestionAnswer, (question) => question.responses)
    @JoinTable()
    question: QuestionAnswer[];
}
