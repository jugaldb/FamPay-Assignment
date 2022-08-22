import { Table, Column, Model } from "sequelize-typescript";

export interface VideosInterface {
  video_id: string;
  name: string;
  published_at: string;
  thumbnail_url: string;
  channel_id: string;
  description: string;
  channel_name: string;
  created_date: Date;
}

export interface IngredientOuput extends Required<VideosInterface> {}

@Table
export class Videos extends Model<VideosInterface> implements VideosInterface {
  @Column({ primaryKey: true })
  video_id!: string;

  @Column
  name!: string;

  @Column
  published_at!: string;

  @Column
  thumbnail_url!: string;

  @Column
  channel_id!: string;

  @Column
  description!: string;

  @Column
  channel_name!: string;

  @Column
  created_date!: Date;
}
