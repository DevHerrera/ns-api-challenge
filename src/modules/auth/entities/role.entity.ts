import { OneToMany, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from './user.entity';
@Entity('Roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => User, (user) => user.roleId)
  users: User[];
}
