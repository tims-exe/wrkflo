import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity("users")
export class User {
    @ObjectIdColumn()
    id: ObjectId

    @Column()
    email: string

    @Column()
    password: string
}