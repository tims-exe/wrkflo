import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Webhook {
    @ObjectIdColumn()
    _id: string

    @Column()
    webhookId: string

    @Column()
    workflowId: string 

    @Column()
    method: string 
}