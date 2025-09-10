import { Column } from "typeorm";

export class NodeEntity {
  @Column()
  id: string;

  @Column()
  type: string;

  @Column()
  label: string;

  @Column("simple-json")
  data: Record<string, any>;

  @Column({ nullable: true })
  credentials?: string;

  @Column("simple-json")
  position: { x: number; y: number };

  @Column("simple-json", { nullable: true })
  style?: Record<string, any>;

  @Column({ default: false })
  selected: boolean;

  @Column({ default: false })
  dragging: boolean;

  @Column("simple-json", { nullable: true })
  measured?: { width: number; height: number };
}
