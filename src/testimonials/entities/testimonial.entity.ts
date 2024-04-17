import { BaseEntity } from "src/entities/base.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";

@Entity()
export class Testimonial extends BaseEntity {
    @Column()
    name: string;

    @Column({ default: 0 })
    rating: number;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    message: string;

    @BeforeInsert()
    @BeforeUpdate()
    checkRating() {
        if (this.rating > 5) {
            this.rating = 5;
        }
        if (this.rating < 0) {
            this.rating = 0;
        }
    }
}
