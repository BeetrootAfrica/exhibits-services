/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exhibit } from "./exhibit.entity";

@Entity()
export class Questionnaire {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ nullable: true })
    isExhibit: boolean;
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    updatedDate: Date;
    @DeleteDateColumn()
    deletedDate: Date;
    @Column({ nullable: true })
    responderID: string;
    @Column({ nullable: true })
    category: string;
    @Column({ nullable: true })
    searchTerms: string;
    @Column({ nullable: true })
    title: string;
    @Column({ nullable: true })
    body: string;
    @Column({ nullable: true })
    editorID: string;
    @OneToMany(() => Exhibit, (exhibit) => exhibit.questionnaire)
    @JoinTable()
    exhibits: Exhibit[];
    @ManyToMany(() => QuestionnaireSection, (questionnaireSection) => questionnaireSection.questionnaires)
    @JoinTable()
    questionnaireSections: QuestionnaireSection[];
    @OneToMany(() => ExhibitImage, (images: ExhibitImage) => images.questionnaire)
    images: ExhibitImage[];
}
@Entity()
export class ExhibitImage {
  @PrimaryGeneratedColumn('uuid')
  imageID :  string;
  @Column()
  filename: string;
  @Column()
  path: string;
  @Column()
  mimetype: string;
  @ManyToOne(() => Questionnaire, (service: Questionnaire) => service.images)
  public questionnaire: Questionnaire;
}

@Entity()
export class QuestionnaireSection {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    updatedDate: Date;
    @DeleteDateColumn()
    deletedDate: Date;
    @Column({ nullable: true })
    questionnaireID: string
    @Column({ nullable: true })
    title: string;
    @ManyToMany(() => Questionnaire, (questionnaire) => questionnaire.questionnaireSections)
    @JoinTable()
    questionnaires: Questionnaire[];
    @ManyToOne(() => Exhibit, (exhibit) => exhibit.questions)
    @JoinTable()
    exhibits: Exhibit[];
    @Column({ nullable: true })
    meta: string;
    @ManyToMany(() => Question, (question) => question.questionnaireSections)
    @JoinTable()
    questions: Question[];

}

@Entity()
export class Question {
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
    responderID: string;
    @Column({ nullable: true })
    publisherID: string;
    @ManyToMany(() => QuestionnaireSection, (questionnairesection) => questionnairesection.questions)
    @JoinTable()
    questionnaireSections: QuestionnaireSection[];
    @ManyToOne(() => Exhibit, (exhibit) => exhibit.questions)
    @JoinTable()
    exhibits: Exhibit[];
    @Column({ nullable: true })
    meta: string;

}




