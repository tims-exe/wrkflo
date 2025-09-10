import { Column } from "typeorm";

export class ConnectionEntity {
  @Column()
  source: string;

  @Column()
  target: string;

  @Column()
  sourceHandle: string;

  @Column()
  targetHandle: string;
}
