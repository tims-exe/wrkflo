import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from "typeorm";
import { NodeEntity } from "./Node";
import { ConnectionEntity } from "./Connection";

@Entity("workflows")
export class Workflow {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column({ default: false })
  enabled: boolean;

  @Column()
  nodes: NodeEntity[];

  @Column()
  connections: ConnectionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
