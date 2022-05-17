import { User } from '../../auth/entities/user.entity';
import { VideoLikedByUser } from './videoLikedByUser.entity';
import {
  ManyToOne,
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('Videos')
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'source_url', nullable: false })
  sourceUrl: string;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @Column({ name: 'is_published', nullable: false, default: 0 })
  isPublished: boolean;

  @Column({ nullable: false, name: 'user_owner_id' })
  userOwnerId: number;
  @ManyToOne(() => User, (user) => user.videos, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'user_owner_id' })
  owner: User;

  @OneToMany(() => VideoLikedByUser, (videoLiked) => videoLiked.video)
  likedByUsers: VideoLikedByUser[];
}
