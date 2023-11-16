import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './post.entity'; // Update the path accordingly
import { OGImage } from './og-image.entity'; // Update the path accordingly

@Entity()
export class YoastHeadJson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  robots_index: string;

  @Column()
  robots_follow: string;

  @Column()
  robots_maxSnippet: string;

  @Column()
  robots_maxImagePreview: string;

  @Column()
  robots_maxVideoPreview: string;

  @Column()
  canonical: string;

  @Column()
  ogLocale: string;

  @Column()
  ogType: string;

  @Column()
  ogTitle: string;

  @Column()
  ogDescription: string;

  @Column()
  ogUrl: string;

  @Column()
  ogSiteName: string;

  @Column()
  articlePublishedTime: string;

  @Column()
  articleModifiedTime: string;

  @OneToMany(() => Post, post => post.yoastHeadJson)
  posts: Post[];

  @OneToMany(() => OGImage, ogImage => ogImage.yoastHeadJson)
  ogImage: OGImage[];

  static fromJson(json: Record<string, any>): YoastHeadJson {
    const yoastHeadJson = new YoastHeadJson();
    yoastHeadJson.title = json['title'];
    yoastHeadJson.robots_index = json['robots']['index'];
    yoastHeadJson.robots_follow = json['robots']['follow'];
    yoastHeadJson.robots_maxSnippet = json['robots']['max-snippet'];
    yoastHeadJson.robots_maxImagePreview = json['robots']['max-image-preview'];
    yoastHeadJson.robots_maxVideoPreview = json['robots']['max-video-preview'];
    yoastHeadJson.canonical = json['canonical'];
    yoastHeadJson.ogLocale = json['og_locale'];
    yoastHeadJson.ogType = json['og_type'];
    yoastHeadJson.ogTitle = json['og_title'];
    yoastHeadJson.ogDescription = json['og_description'];
    yoastHeadJson.ogUrl = json['og_url'];
    yoastHeadJson.ogSiteName = json['og_site_name'];
    yoastHeadJson.articlePublishedTime = json['article_published_time'];
    yoastHeadJson.articleModifiedTime = json['article_modified_time'];
    return yoastHeadJson;
  }

  toJson(): Record<string, any> {
    return {
      title: this.title,
      robots: {
        index: this.robots_index,
        follow: this.robots_follow,
        'max-snippet': this.robots_maxSnippet,
        'max-image-preview': this.robots_maxImagePreview,
        'max-video-preview': this.robots_maxVideoPreview,
      },
      canonical: this.canonical,
      og_locale: this.ogLocale,
      og_type: this.ogType,
      og_title: this.ogTitle,
      og_description: this.ogDescription,
      og_url: this.ogUrl,
      og_site_name: this.ogSiteName,
      article_published_time: this.articlePublishedTime,
      article_modified_time: this.articleModifiedTime,
    };
  }
}
