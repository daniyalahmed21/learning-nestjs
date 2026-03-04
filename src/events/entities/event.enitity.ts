import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    name: string;

    @Column('json')
    payload: Record<string, any>;

    @Column()
    type: string;

}
