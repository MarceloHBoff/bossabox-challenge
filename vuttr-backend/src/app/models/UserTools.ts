import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import Tool from './Tool';
import User from './User';

@Entity('user_tools')
export default class UserTools {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user_id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  tool_id: number;

  @OneToOne(() => Tool)
  @JoinColumn({ name: 'tool_id' })
  tool: Tool;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
