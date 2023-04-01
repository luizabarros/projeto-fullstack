import { hashSync } from "bcryptjs"
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, CreateDateColumn, 
    DeleteDateColumn, Entity,
    OneToMany, PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm"
import Contacts from "./contacts.entity"

@Entity("clients")
class Clients {
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column()
    fullName: string

    @Column({ unique: true })
    email: string

    @Column()
    phone: string

    @Column({ default: true })
    isActive: boolean
   
    @Column({ select: false })
    password: string

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10)
    }

    @BeforeRemove()
    isActiveChanged() {
        this.isActive = false
    }

    @CreateDateColumn({ type: "date" })
    createdOn: Date

    @UpdateDateColumn({ type: "date" })
    updatedAt: Date

    @DeleteDateColumn({ type: "date" })
    deletedAt: Date

    @OneToMany(() => Contacts, contacts => contacts.client)
    contacts: Contacts[]
}

export default Clients