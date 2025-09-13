import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class Credential {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    userId: string;

    @Column()
    app: string;

    @Column()
    name: string;

    @Column()
    key: string
}