import { Column } from "typeorm";

export class ConnectionEntity {
  @Column()
  source: string;

  @Column()
  target: string;
}
