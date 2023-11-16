import {PrimaryColumn, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { YoastHeadJson } from './yoast-head-json.entity'; // Update the path accordingly
import { JoinColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  date: string; // Assuming you are storing date as a string, update the type if needed

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  excerpt: string;

  @ManyToOne(() => YoastHeadJson, yoastHeadJson => yoastHeadJson.posts, { nullable: true })
  @JoinColumn({ name: 'yoast_head_json_id' }) // Add this line to specify the foreign key column name
  yoastHeadJson: YoastHeadJson;

  @Column({ nullable: true })
  author: string;

  @Column({ default: false })
  isSaved: boolean;
}



@Entity()
export class Robots {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  index: string;

  @Column()
  follow: string;

  @Column()
  maxSnippet: string;

  @Column()
  maxImagePreview: string;

  @Column()
  maxVideoPreview: string;

  static fromJson(json: Record<string, any>): Robots {
    const robots = new Robots();
    robots.index = json['index'];
    robots.follow = json['follow'];
    robots.maxSnippet = json['maxSnippet'];
    robots.maxImagePreview = json['maxImagePreview'];
    robots.maxVideoPreview = json['maxVideoPreview'];
    return robots;
  }

  toJson(): Record<string, any> {
    return {
      index: this.index,
      follow: this.follow,
      maxSnippet: this.maxSnippet,
      maxImagePreview: this.maxImagePreview,
      maxVideoPreview: this.maxVideoPreview,
    };
  }
}


@Entity()
export class OGImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  url: string;

  @Column()
  type: string;

  @ManyToOne(() => YoastHeadJson, yoastHeadJson => yoastHeadJson.ogImage)
  @JoinColumn({ name: 'yoast_head_json_id' }) // Add this line to specify the foreign key column name
  yoastHeadJson: YoastHeadJson;

  static fromJson(json: Record<string, any>): OGImage {
    const ogImage = new OGImage();
    ogImage.width = json['width'];
    ogImage.height = json['height'];
    ogImage.url = json['url'];
    ogImage.type = json['type'];
    return ogImage;
  }

  toJson(): Record<string, any> {
    return {
      width: this.width,
      height: this.height,
      url: this.url,
      type: this.type,
    };
  }
}
