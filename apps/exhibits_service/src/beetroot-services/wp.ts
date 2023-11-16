import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Post } from './entities/post.entity'; // Update the path accordingly
import { YoastHeadJson } from './entities/yoast-head-json.entity'; // Update the path accordingly
import { OGImage } from './entities/og-image.entity'; // Update the path accordingly

@Injectable()
export class WPService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(YoastHeadJson)
    private readonly yoastHeadJsonRepository: Repository<YoastHeadJson>,
    @InjectRepository(OGImage)
    private readonly ogImageRepository: Repository<OGImage>,
  ) { }

  async fetchPosts() {
    try {
      return this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.yoastHeadJson', 'yoastHeadJson')
        .leftJoinAndSelect('yoastHeadJson.ogImage', 'ogImage')
        // Add more relations as needed, for example:
        // .leftJoinAndSelect('post.author', 'author')
        // .leftJoinAndSelect('post.twitterMisc', 'twitterMisc')
        // .leftJoinAndSelect('post.schema', 'schema')
        .getMany();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async fetchDataAndStore() {
    try {
      // Fetch data from the API
      const response = await axios.get('https://beetroot.today/wp-json/wp/v2/posts');
      const posts = response.data;
      console.log('posts', posts[0])
      // Insert posts into PostgreSQL
      for (const post of posts) {
        const pgPost = new Post();
        pgPost.id = post.id;
        pgPost.title = post.title.rendered;
        pgPost.content = post.content.rendered;
        pgPost.date = post.date != null ? post.date.replace('T', ' ') : null;
        pgPost.image =
          post['_links']['wp:featuredmedia'] != null
            ? post['_links']['wp:featuredmedia'][0]['href']
            : null;
        pgPost.excerpt = post.excerpt.rendered;

        // Fetch or create YoastHeadJson entity
        const yoastHeadJson = await this.yoastHeadJsonRepository.save(
          YoastHeadJson.fromJson(post.yoast_head_json),
        );

        pgPost.yoastHeadJson = yoastHeadJson;

        await this.postRepository.save(pgPost);

        // Fetch or create OGImage entities
        if (post.yoast_head_json && post.yoast_head_json.og_image) {
          for (const image of post.yoast_head_json.og_image) {
            const ogImage = await this.ogImageRepository.save(
              OGImage.fromJson(image),
            );

            // Associate OGImage with YoastHeadJson
            yoastHeadJson.ogImage = [ogImage];
            await this.yoastHeadJsonRepository.save(yoastHeadJson);
          }
        }
      }

      console.log('Data stored in PostgreSQL successfully!');
      return this.postRepository.find();
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error to handle it at a higher level, if needed
    }
  }
}
