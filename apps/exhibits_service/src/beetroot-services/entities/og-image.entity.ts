import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { YoastHeadJson } from './yoast-head-json.entity'; // Update the path accordingly

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
