import { BaseEntity } from "../../entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class PricingOffer extends BaseEntity {
    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'longtext' })
    description: string;
}